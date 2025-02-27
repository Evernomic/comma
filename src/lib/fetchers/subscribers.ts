"use server";
import { ExportResponse } from "@/types";
import { json2csv } from "json-2-csv";
import { db } from "../db";
import { formatVerboseDate } from "../utils";

export async function getSubscribersByUserId(userId: string) {
  return await db.subscriber.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getSubscibersExport(
  userId: string,
): Promise<ExportResponse> {
  const subscribers = await db.subscriber.findMany({
    where: {
      userId,
    },
    select: {
      email: true,
      createdAt: true,
    },
  });

  const filename = `comma_subscribers_export.csv`;

  const content = json2csv(
    subscribers.map(({ createdAt, ...subscriber }) => {
      return { ...subscriber, subscribedAt: formatVerboseDate(createdAt) };
    }),
  );

  return { filename, content };
}
