"use server";

import { db } from "@/lib/db";
import { rateLimit } from "@/lib/ratelimit";
import { headers } from "next/headers";

export async function unlockProject(prev: any, data: FormData) {
  const projectId = data.get("projectId") as string;
  const pw = data.get("password") as string;
  const project = await db.project.findUnique({
    where: {
      id: projectId,
    },
    select: {
      id: true,
      password: true,
    },
  });

  if (!project) {
    return {
      error: "Project not found",
    };
  }

  if (process.env.VERCEL === "1") {
    const ip = (await headers()).get("x-forwarded-for");

    const { success } = await rateLimit.protection.limit(
      `project:${project.id}:${ip}`,
    );

    if (!success) {
      return {
        error: "Try again later",
      };
    }
  }

  if (project?.password === pw) {
    return {
      unlocked: true,
    };
  }
  return {
    error: "Incorrect Password",
  };
}
