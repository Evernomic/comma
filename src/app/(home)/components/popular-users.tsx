"use client";
import { Icons } from "@/components/shared/icons";
import { getUserPageURL } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Marquee, { type MarqueeProps } from "react-fast-marquee";
import Balancer from "react-wrap-balancer";
import type { ExplorePageUser } from "../explore/client";

export default function PopularUsers({
  users,
}: {
  users: Array<ExplorePageUser> | null;
}) {
  if (!users?.length) {
    return null;
  }

  const options: MarqueeProps = {
    pauseOnHover: true,
    speed: 75,
  };

  return (
    <section id="features" className="section-container">
      <div className="section-content  gap-4 marquee overflow-hidden">
        <Marquee {...options} speed={60}>
          {users.slice(0, 10).map((u) => {
            return <Item user={u} key={u.username} />;
          })}
        </Marquee>
        <Marquee {...options}>
          {users.slice(10, 20).map((u) => {
            return <Item user={u} key={u.username} />;
          })}
        </Marquee>
      </div>
    </section>
  );
}

function Item({ user }: { user: ExplorePageUser }) {
  return (
    <Link
      href={getUserPageURL(user)}
      target="_blank"
      className="text-gray-4 w-[300px] mx-2 aspect-video  bg-gray-3 group hover:bg-gray-2 transition-colors   flex relative  flex-col  border overflow-hidden   p-5 justify-center items-center  gap-5  text-sm rounded-md "
    >
      <div className="flex flex-col text-center">
        <div className="flex flex-col items-center gap-3">
          {user.image ? (
            <Image
              src={user.image}
              width={0}
              height={0}
              sizes="100vw"
              className="rounded-full size-6"
              alt={`${user.username}'s avatar`}
            />
          ) : (
            <span className="size-[36px]  bg-gray-2 rounded-full text-gray-4 flex items-center justify-center">
              <Icons.user size={18} />
            </span>
          )}
          <div className="text-secondary font-medium text-base">
            <Balancer>{user.name ?? user.username}</Balancer>
          </div>
        </div>
        <p className="max-w-96 max-md:text-sm text-sm font-medium ">
          <Balancer>
            {user.title ?? user.category ?? user.location ?? user.username}
          </Balancer>
        </p>
      </div>
      <span className="absolute  text-gray-1 transition-colors group-hover:text-secondary right-4 top-4">
        <ArrowUpRight size={20} />
      </span>
    </Link>
  );
}
