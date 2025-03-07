"use server";

import { db } from "@/lib/db";
import { rateLimit } from "@/lib/ratelimit";
import { cookies, headers } from "next/headers";

export async function unlockSite(_: any, formData: FormData) {
  const password = formData.get("password")!;
  const [headersList, cookie] = await Promise.all([headers(), cookies()]);
  const domain = headersList.get("X-Domain")!;

  if (!domain) {
    return null;
  }

  if (process.env.VERCEL === "1") {
    const ip = headersList.get("x-forwarded-for");

    const { success } = await rateLimit.protection.limit(
      `site:${domain}:${ip}`,
    );

    if (!success) {
      return {
        error: "Try again later",
      };
    }
  }

  const user = await db.user.findFirst({
      where: {
        OR: [
          {
            domain,
          },
          {
            username: domain,
          },
        ]
      },
      select: {
        password: true
      }
  })

  if(!user || !user?.password) {
    return {
      error: "Something went wrong"
    }
  }

  if (user.password === password) {
    cookie.set(`${domain}`, password, {
      secure: true,
      httpOnly: true,
    });
    return {
      status: "ok",
    };
  }

  return {
    error: "Invalid password",
  };
}
