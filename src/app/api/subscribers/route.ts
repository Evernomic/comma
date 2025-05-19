import { siteConfig } from "@/config/site";
import NewSubscriber from "@/emails/new-subscriber";
import { createSubscriber, isSubscriberExist } from "@/lib/actions/subscribers";
import { decrypt } from "@/lib/encryption";
import { getUserById } from "@/lib/fetchers/users";
import { rateLimit } from "@/lib/ratelimit";
import { resend } from "@/lib/resend";
import { getUserSubscription } from "@/lib/subscription";
import { getUserPageURL } from "@/lib/utils";
import { BeehiivClient } from "@beehiiv/sdk";
import { nanoid } from "nanoid";
import type { NextRequest } from "next/server";
import * as z from "zod";

const subscribeNewsletterPatchSchema = z.object({
  email: z.string().email(),
  username: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const body = subscribeNewsletterPatchSchema.safeParse(data);
    if (!body.success) {
      return new Response(body.error.issues[0].message, {
        status: 422,
      });
    }

    const { username, email } = body.data;

    const ip = req.headers.get("x-forwarded-for") || "0.0.0.0";

    if (process.env.VERCEL === "1") {
      const { success } = await rateLimit.subscribe.limit(
        `subscribe:${username}:${ip}`,
      );

      if (!success) {
        return new Response("Try again after 5 hours.", { status: 429 });
      }
    }

    const subRedirects = JSON.parse(process.env.SUB_REDIRECTS!);
    const redirects = subRedirects
      ? Array.isArray(subRedirects)
        ? (subRedirects as Array<{ from: string; to: string }>)
        : null
      : null;
    const realUsername = redirects
      ? (redirects.find((r) => r.from === username)?.to ?? username)
      : username;

    const user = await getUserById({ username: realUsername });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    const { isPro } = await getUserSubscription(user.id);

    if (!isPro || !user.newsletter) {
      return new Response("This user's newsletter function is not active", {
        status: 401,
      });
    }

    const isExist = await isSubscriberExist(email, user.id);

    if (isExist) {
      return new Response("This email already subscribed", {
        status: 401,
      });
    }

    if (user.beehiivKey && user.beehiivPublicationId) {
      const [token, publicationId] = [
        decrypt(user.beehiivKey),
        decrypt(user.beehiivPublicationId),
      ];

      const client = new BeehiivClient({ token });

      try {
        await client.subscriptions.create(publicationId, {
          email,
          sendWelcomeEmail: true,
          utmSource: "Comma",
          utmMedium: "organic",
          referringSite: getUserPageURL(user),
        });
      } catch (err) {
        console.log("Beehiiv subscription failed:", err);
      }
    }

    await Promise.all([
      createSubscriber(user.id, body.data),
      resend.emails.send({
        from: `Comma Notify <notify@${siteConfig.mailDomain}>`,
        reply_to: siteConfig.supportEmail,
        to: user.email,
        subject: "New Subscriber",
        react: NewSubscriber({
          email: body.data.email,
        }),
        headers: {
          "X-Entity-Ref-ID": nanoid(),
        },
      }),
    ]);

    return new Response(null, { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify(err), { status: 500 });
  }
}
