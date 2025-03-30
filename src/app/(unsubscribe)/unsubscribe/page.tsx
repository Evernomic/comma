import NavButton from "@/components/layout/nav-button";
import { db } from "@/lib/db";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { unsubscribe } from "./action";
import { getUserPageURL } from "@/lib/utils";

interface Props {
  searchParams: Promise<{
    subId: string;
  }>;
}

export const metadata: Metadata = {
  title: "Unsubscribe",
};

export default async function Unsubscribe({ searchParams }: Props) {
  const { subId } = await searchParams;
  if (subId) {
    return notFound();
  }

  const subscriber = await db.subscriber.findUnique({
    where: {
      id: subId,
    },
    select: {
      user: {
        select: {
          username: true,
          domain: true,
          id: true,
        },
      },
    },
  });

  if (!subscriber) {
    return notFound();
  }

  const data: { error?: string; success?: string } = await unsubscribe(
    subId,
    subscriber.user.id,
  );

  return (
    <div className="mx-auto px-2 w-[450px] max-[450px]:w-full min-h-screen flex items-center justify-center">
      <div className="w-full bg-gray-3 border border-gray-2 rounded-md p-5 flex flex-col items-center gap-3 justify-center">
        {data.success ? (
          <p className="text-gray-4 text-center">
            You&apos;ve successfully been unsubscribed from{" "}
            <b>
              {subscriber?.user.username}
              &apos;s newsletter.
            </b>
          </p>
        ) : (
          <b className="text-danger text-sm">{data.error}</b>
        )}

        <NavButton
          icon="arrowUpRight"
          buttonClassname="w-max px-2"
          href={getUserPageURL(subscriber.user)}
        >
          Resubscribe
        </NavButton>
      </div>
    </div>
  );
}
