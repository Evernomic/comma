import { guard } from "@/lib/auth";
import { squeezy } from "@/lib/squeezy";
import { absoluteUrl } from "@/lib/utils";
import {
  createCheckout,
  getSubscription,
  listVariants,
} from "@lemonsqueezy/lemonsqueezy.js";
import { z } from "zod";

const billingUrl = absoluteUrl("/settings/billing?payment=success");

const bodySchema = z.object({
  plan: z.enum(["pro"]),
  period: z.enum(["monthly", "yearly"]),
});

export const POST = guard(
  async ({ user, plan: currentSubscription, body }) => {
    try {
      const { plan, period } = body;
      squeezy();

      const { data: variants } = await listVariants({
        filter: {
          productId: process.env.NUCELO_PRO_ID,
          status: "published",
        },
      });
      const variant = variants?.data.find((v) =>
        v.attributes.description
          .toLowerCase()
          .split(" ")
          .slice(0, -1)
          .join("_")
          .includes(`${plan}_${period}`),
      );
      if (!variant) {
        return new Response("Plan not found", { status: 404 });
      }

      const subscription = user.lsId ? await getSubscription(user.lsId) : null;

      if (user.lsId && subscription?.data?.data && currentSubscription.isPro) {
        return new Response(
          JSON.stringify({
            url: subscription.data?.data.attributes.urls.customer_portal,
          }),
        );
      }

      const { data } = await createCheckout(
        process.env.SQUEEZY_STORE_ID as string,
        variant.id,
        {
          checkoutData: {
            email: user.email ?? undefined,
            custom: {
              user_id: user.id,
            },
          },
          productOptions: {
            redirectUrl: billingUrl,
            receiptButtonText: "Back to Comma",
          },
        },
      );
      return new Response(JSON.stringify({ url: data?.data.attributes.url }));
    } catch (err) {
      return new Response(JSON.stringify(err), { status: 500 });
    }
  },
  {
    schemas: {
      bodySchema,
    },
  },
);
