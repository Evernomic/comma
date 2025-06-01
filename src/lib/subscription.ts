import { freePlan, proPlan } from "@/config/subscriptions";
import type { Period, UserSubscriptionPlan } from "@/types";
import { getSubscription } from "@lemonsqueezy/lemonsqueezy.js";
import { getServerSession } from "next-auth";
import authOptions from "./auth";
import { db } from "./db";
import { squeezy } from "./squeezy";

export async function getUserSubscription(
  userId?: string,
): Promise<UserSubscriptionPlan> {
  const session = await getServerSession(authOptions);

  const user = await db.user.findFirst({
    where: {
      id: userId || session?.user.id,
    },
    select: {
      lsId: true,
      lsCurrentPeriodEnd: true,
      lsVariantId: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (!user.lsId || !user.lsCurrentPeriodEnd || !user.lsVariantId) {
    return {
      ...freePlan,
      ...user,
      lsCurrentPeriodEnd: null,
      isPro: false,
    };
  }

  squeezy();

  const subscription = user.lsId
    ? await getSubscription(user.lsId as string)
    : null;

  if (!subscription?.data) {
    return {
      ...freePlan,
      ...user,
      lsCurrentPeriodEnd: null,
      isPro: false,
    };
  }

  const {
    data: {
      data: {
        attributes: { status, product_id, variant_name },
      },
    },
  } = subscription;

  const period = variant_name.endsWith("Yearly")
    ? "yearly"
    : ("monthly" as Period);

  const currentProductId = Number(process.env.NUCELO_PRO_ID!);

  const isPro =
    !!user.lsId &&
    user.lsCurrentPeriodEnd &&
    new Date(user.lsCurrentPeriodEnd).getTime() + 86_400_000 > Date.now() &&
    status !== "expired" &&
    status !== "past_due" &&
    status !== "unpaid" &&
    status !== "paused";

  const plan = isPro
    ? {
        ...proPlan,
        period,
        ...(product_id !== currentProductId && {
          price: { monthly: 4, yearly: 40 },
        }),
      }
    : freePlan;
  return {
    ...plan,
    ...user,
    lsCurrentPeriodEnd: user.lsCurrentPeriodEnd.getTime(),
    isPro,
    status,
  };
}
