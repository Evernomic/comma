"use server";

import { listSubscriptions } from "@lemonsqueezy/lemonsqueezy.js";
import { Prisma } from "@prisma/client";
import { db } from "../db";
import { redis } from "../redis";
import { squeezy } from "../squeezy";
import type { AdminConfig } from "../validations/admin";

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

export async function getAdminConfig(): Promise<AdminConfig | null> {
  return await redis.json.get<AdminConfig>("config");
}

export async function getUserTimeseries() {
  return (await db.$queryRaw(Prisma.sql`
WITH months AS (
  SELECT generate_series(
    DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '11 months',
    DATE_TRUNC('month', CURRENT_DATE),
    INTERVAL '1 month'
  ) AS start
)
SELECT
  months.start,
  COALESCE(COUNT(u.created_at)::int, 0) AS value
FROM months
LEFT JOIN users u
  ON DATE_TRUNC('month', u.created_at) = months.start
WHERE u.created_at >= months.start OR u.created_at IS NULL
GROUP BY months.start
ORDER BY months.start;
  `)) as Array<{ start: Date; value: number }>;
}
