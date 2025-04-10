"use server";

import { db } from "@/lib/db";
import { rateLimit } from "@/lib/ratelimit";
import { headers } from "next/headers";

export async function unlockPage(prev: any, data: FormData) {
  const pageId = data.get("pageId") as string;
  const pw = data.get("password") as string;
  const page = await db.page.findUnique({
    where: {
      id: pageId,
    },
    select: {
      id: true,
      password: true,
    },
  });

  if (!page) {
    return {
      error: "Page not found",
    };
  }

  if (process.env.VERCEL === "1") {
    const ip = (await headers()).get("x-forwarded-for");

    const { success } = await rateLimit.protection.limit(
      `page:${page.id}:${ip}`,
    );

    if (!success) {
      return {
        error: "Try again later",
      };
    }
  }

  if (page?.password === pw) {
    return {
      unlocked: true,
    };
  }
  return {
    error: "Incorrect Password",
  };
}
