import NewSubscriber from "@/emails/new-subscriber";
import { createSubscriber, isSubscriberExist } from "@/lib/actions/subscribers";
import { getUserById } from "@/lib/fetchers/users";
import { rateLimit } from "@/lib/ratelimit";
import { resend } from "@/lib/resend";
import { getUserSubscription } from "@/lib/subscription";
import { nanoid } from "nanoid";
import type { NextRequest } from "next/server";
import * as z from "zod";

const subscribeNewsletterPatchSchema = z.object({
  name: z.string().min(1),
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

    const user = await getUserById({ username });

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

    await Promise.all([
      createSubscriber(user.id, body.data),
      resend.emails.send({
        from: "Comma Notify <notify@mail.comma.to>",
        to: user.email,
        subject: "New Subscriber",
        react: NewSubscriber({
          name: `${body.data.name} ( ${body.data.email} )`,
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
