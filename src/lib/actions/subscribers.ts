"use server";
import type * as z from "zod";
import { db } from "../db";
import type { subscribeSchema } from "../validations/subscribe";

type SubscriberSchema = z.infer<typeof subscribeSchema>;

export async function createSubscriber(userId: string, data: SubscriberSchema) {
  return await db.subscriber.create({
    data: { email: data.email, userId },
  });
}

export async function deleteSubscriber(subscriberId: string, userId: string) {
  const subscriber = await db.subscriber.delete({
    where: {
      id: subscriberId,
      userId,
    },
  });

  return subscriber.id;
}

export async function isSubscriberExist(email: string, userId: string) {
  const isExist = await db.subscriber.count({
    where: {
      userId,
      email,
    },
  });

  return isExist > 0;
}

export async function verifySubscriberAccess(id: string, userId: string) {
  const isExist = await db.subscriber.count({
    where: {
      id: id,
      userId,
    },
  });
  return isExist > 0;
}
