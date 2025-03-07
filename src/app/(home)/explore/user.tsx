import { Icons } from "@/components/shared/icons";
import { countries } from "@/lib/constants/countries";
import { getUserPageURL } from "@/lib/utils";
import type { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default function User({
  user,
}: {
  user: Pick<
    User,
    "name" | "title" | "username" | "domain" | "image" | "category" | "location"
  >;
}) {
  return (
    <Link
      href={getUserPageURL(user)}
      className="group"
      aria-label={`${user.username}'s blog`}
      target="_blank"
    >
      <div className="flex gap-4 items-center -mx-4 transition-colors  hover:bg-gray-3 rounded-md p-4 cursor-pointer">
        {user.image ? (
          <Image
            src={user.image}
            width={0}
            height={0}
            sizes="100vw"
            className="rounded-full size-5"
            alt={`${user.username}'s avatar`}
          />
        ) : (
          <span className="size-[36px]  bg-gray-2 rounded-full text-gray-4 flex items-center justify-center">
            <Icons.user size={18} />
          </span>
        )}
        <div className="grow">
          <h3>{user.name}</h3>
          <p className="text-gray-4 text-sm">
            {user.category || user.title || user.username}{" "}
            {user.location ? `· ${countries[user.location!]}` : null}
          </p>
        </div>
        <Icons.arrowUpRight
          size={20}
          className="text-gray-4 opacity-0 transition-opacity group-hover:opacity-100"
        />
      </div>
    </Link>
  );
}
