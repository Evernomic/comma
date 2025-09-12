import { siteConfig } from "@/config/site";
import WelcomeEmailPaid from "@/emails/welcome-email-paid";
import { db } from "@/lib/db";
import { removeDomain } from "@/lib/domains";
import log from "@/lib/log";
import { resend } from "@/lib/resend";
import { squeezy } from "@/lib/squeezy";
import { getSubscription } from "@lemonsqueezy/lemonsqueezy.js";
import crypto from "node:crypto";

const relevantEvents = new Set([
  "subscription_created",
  "subscription_updated",
  "subscription_expired",
]);

export async function POST(req: Request) {
  const rawBody = await req.text();
  const secret = process.env.SQUEEZY_WEBHOOK_SECRET as string;

  const hmac = crypto.createHmac("sha256", secret);
  const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
  const signature = Buffer.from(req.headers.get("X-Signature") ?? "", "utf8");

  if (!crypto.timingSafeEqual(digest, signature)) {
    return new Response("Invalid signature", { status: 400 });
  }

  const data = JSON.parse(rawBody);

  if (!data) {
    return new Response("No data", { status: 500 });
  }

  const body = data.data;
  const eventName = data.meta.event_name;
  const userId = data.meta.custom_data.user_id;
  squeezy();
  if (relevantEvents.has(eventName)) {
    try {
      if (eventName === "subscription_created") {
        const { data: subscription } = await getSubscription(body.id as string);
        if (!subscription) {
          throw new Error("Subscription not found");
        }
        const user = await db.user.update({
          where: {
            id: userId,
          },
          data: {
            lsId: subscription.data.id,
            lsVariantId: subscription.data.attributes.variant_id.toString(),
            lsCurrentPeriodEnd: subscription.data.attributes.renews_at,
          },
          select: {
            email: true,
            name: true,
            username: true,
          },
        });

        await resend.emails.send({
          from: `Comma <system@mail.comma.to>`,
          to: user.email,
          reply_to: siteConfig.supportEmail,
          subject: "Welcome to Comma Pro 🎉",
          react: WelcomeEmailPaid({
            name: user.name ?? user.username
          }),
        });
      }
      if (eventName === "subscription_updated") {
        const { data: subscription } = await getSubscription(body.id as string);
        if (!subscription) {
          throw new Error("Subscription not found");
        }
        await db.user.update({
          where: {
            lsId: subscription.data.id,
          },
          data: {
            lsVariantId: subscription.data.attributes.variant_id.toString(),
            lsCurrentPeriodEnd: subscription.data.attributes.renews_at,
          },
        });
      }
      if (eventName === "subscription_expired") {
        const user = await db.user.findUnique({
          where: {
            lsId: body.id,
          },
          select: {
            id: true,
            domain: true,
            email: true,
            name: true,
          },
        });
        if (!user) {
          return new Response("User not found", { status: 404 });
        }
        await Promise.allSettled([
          removeDomain(user?.domain as string),
          db.user.update({
            where: {
              id: user.id,
            },
            data: {
              lsId: null,
              lsVariantId: null,
              lsCurrentPeriodEnd: null,
              newsletter: false,
              domain: null,
            },
          }),
          log("Subscription expired", `${user.email} / ${user.name}`, user.id),
        ]);
      }
    } catch (err) {
      return new Response("Webhook error", { status: 500 });
    }
  } else {
    return new Response(`Unsupported event type: ${eventName}`, {
      status: 400,
    });
  }

  return new Response(null, { status: 200 });
}
