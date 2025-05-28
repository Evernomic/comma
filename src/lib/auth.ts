import { siteConfig } from "@/config/site";
import type { Plan, UserSubscriptionPlan } from "@/types";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { User } from "@prisma/client";
import type { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import type * as z from "zod";
import MagicLinkEmail from "../../emails/magic-link";
import { isAdmin } from "./actions/admin";
import { db } from "./db";
import { getUser } from "./fetchers/users";
import log from "./log";
import { addContact, resend } from "./resend";
import { getUserSubscription } from "./subscription";
import { getSearchParams } from "./utils";
const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  providers: [
    EmailProvider({
      from: `Comma <verify@${siteConfig.mailDomain}>`,
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        if (process.env.NODE_ENV === "development") {
          console.log(url);
          return;
        }
        await resend.emails.send({
          from: provider.from as string,
          to: identifier as string,
          subject: "Welcome to Comma",
          reply_to: siteConfig.supportEmail,
          react: MagicLinkEmail({ url }),
        });
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  cookies: {
    sessionToken: {
      name: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        domain: VERCEL_DEPLOYMENT
          ? `.${process.env.NEXT_PUBLIC_APP_DOMAIN}`
          : undefined,
        secure: VERCEL_DEPLOYMENT,
      },
    },
  },
  pages: {
    signIn: "/login",
    verifyRequest: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await db.user.findFirst({
          where: {
            email: user.email!,
          },
        });

        if (!dbUser) {
          if (user) {
            token.id = user?.id;
          }
          return token;
        }

        return {
          id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email,
          picture: dbUser.image,
        };
      }

      return token;
    },
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
  },
  events: {
    async signIn(message) {
      const { user } = message;
      if (message.isNewUser) {
        await Promise.allSettled([
          addContact(user.email!, user.name ?? undefined),
          log(
            "New user logged in",
            `${user.email} new user logged in`,
            user.id,
          ),
        ]);
      } else {
        await log(
          "User logged in",
          `${message.user.email} user logged in`,
          message.user.id,
        );
      }
    },
  },
};

export default authOptions;

export const guard = <
  TBody extends z.ZodType,
  TContext extends z.ZodType,
  TParams extends z.ZodType,
>(
  next: ({
    req,
    user,
    plan,
    body,
    ctx,
  }: {
    req: Request;
    user: User;
    plan: UserSubscriptionPlan;
    body: z.infer<TBody>;
    ctx: z.infer<TContext>;
    searchParams: z.infer<TParams>;
  }) => Promise<Response | any>,
  {
    requiredPlan,
    schemas = {},
    admin = false,
  }: {
    requiredPlan?: Plan["title"];
    schemas?: {
      bodySchema?: TBody;
      contextSchema?: TContext;
      searchParamsSchema?: TParams;
    };
    admin?: boolean;
  } = {},
) => {
  return async (req: Request, context: any) => {
    const user = await getUser();
    if (!user) {
      return new Response(null, { status: 401 });
    }

    if (admin) {
      const admin = await isAdmin();
      if (!admin) {
        return new Response("Forbidden", { status: 403 });
      }
    }

    const plan = await getUserSubscription(user.id);

    if (requiredPlan && requiredPlan === "Pro" && !plan.isPro) {
      return new Response("Upgrade plan to Pro", { status: 401 });
    }
    const { bodySchema, contextSchema, searchParamsSchema } = schemas;

    const validatedData: {
      bodyData?: any;
      contextData?: any;
      searchParams?: any;
    } = {};

    if (bodySchema) {
      const body = await req.json();
      const parse = bodySchema.safeParse(body);
      if (!parse.success) {
        return new Response(parse.error.issues[0].message, {
          status: 422,
        });
      }
      validatedData.bodyData = parse.data;
    }

    if (contextSchema) {
      const resolvedContext = {
        ...context,
        params: await Promise.resolve(context.params),
      };
      const parse = contextSchema.safeParse(resolvedContext);
      if (!parse.success) {
        return new Response(parse.error.issues[0].message, {
          status: 422,
        });
      }
      validatedData.contextData = parse.data;
    }

    if (searchParamsSchema) {
      const parse = searchParamsSchema.safeParse(getSearchParams(req.url));
      if (!parse.success) {
        return new Response(parse.error.issues[0].message, {
          status: 422,
        });
      }
      validatedData.searchParams = parse.data;
    }

    return next({
      req,
      user,
      plan,
      body: validatedData.bodyData,
      ctx: validatedData.contextData,
      searchParams: validatedData.searchParams,
    });
  };
};
