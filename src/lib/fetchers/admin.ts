"use server";

import { listSubscriptions } from "@lemonsqueezy/lemonsqueezy.js";
import { db } from "../db";
import { squeezy } from "../squeezy";

export async function getActiveSubscriptionsCount() {
  squeezy();
  const subs = await listSubscriptions({
    filter: {
      status: "active",
    },
  });

  return subs.data?.data.length;
}

export async function getTotalUsersCount() {
  return await db.user.count();
}

export async function getLogById(id: string) {
  return await db.changelog.findUnique({
    where: {
      id,
    },
  });
}

export async function getChangelog({
  limit,
  published,
}: {
  limit?: number;
  published?: boolean;
} = {}) {
  return await db.changelog.findMany({
    where: {
      published,
    },
    take: limit,
    orderBy: {
      publishedAt: "desc",
    },
  });
}
