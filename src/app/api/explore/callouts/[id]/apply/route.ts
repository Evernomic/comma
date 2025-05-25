import { siteConfig } from "@/config/site";
import CalloutEmail from "@/emails/callout-email";
import { db } from "@/lib/db";
import { getUser } from "@/lib/fetchers/users";
import { resend } from "@/lib/resend";
import { getUserPageURL } from "@/lib/utils";
import { nanoid } from "nanoid";
import * as z from "zod";

const contextSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});

export async function POST(req: Request, context: any) {
  try {
    const resolvedContext = {
      ...context,
      params: await Promise.resolve(context.params),
    };

    const parsed = contextSchema.safeParse(resolvedContext);
    if (!parsed.success) {
      return new Response(parsed.error.issues[0].message, {
        status: 422,
      });
    }

    const user = await getUser();

    if (!user) {
      return new Response(null, { status: 401 });
    }

    const callout = await db.callout.findUnique({
      where: {
        id: parsed.data.params.id,
      },
      select: {
        title: true,
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    if (!callout) {
      return new Response(null, { status: 404 });
    }

    await resend.emails.send({
      from: `Comma Notify <notify@${siteConfig.mailDomain}>`,
      reply_to: user.email,
      to: callout.user.email,
      subject: "New Application for Your Callout",
      react: CalloutEmail({
        name: user.username,
        email: user.email,
        profileURL: getUserPageURL(user),
        calloutTitle: callout.title,
      }),
      headers: {
        "X-Entity-Ref-ID": nanoid(),
      },
    });

    return new Response(null, { status: 200 });
  } catch (err) {
    return new Response(null, { status: 500 });
  }
}
