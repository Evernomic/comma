"use client";

import type { MainNavItem } from "@/types";
import type { User } from "@prisma/client";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { Icons } from "../shared/icons";
import MobileNav from "./mobile-nav";
import NavButton from "./nav-button";
import UserNav from "./user-nav";

interface Props {
  links: MainNavItem[];
  user: Pick<
    User,
    "name" | "email" | "image" | "username" | "domain" | "lsId"
  > | null;
}

export default function AppNav({ links, user }: Props) {
  const segment = useSelectedLayoutSegment();
  return (
    <div className="flex w-full items-center justify-between  ">
      <Link href="/articles" className="text-secondary" aria-label="Go to home">
        <Icons.logo size={30} />
      </Link>

      <div className="flex gap-2">
        <nav className="flex gap-2 max-md:hidden">
          {links.map((link) => (
            <NavButton
              href={link.href}
              key={link.title}
              size="sm"
              buttonClassname={
                link.href.endsWith(segment === null ? "/" : segment)
                  ? "bg-gray-2 text-secondary"
                  : ""
              }
              buttonVariant="ghost"
            >
              {link.title}
            </NavButton>
          ))}
        </nav>
        <div className="flex gap-2 items-center">
          <MobileNav
            links={links}
            currentPath={segment === null ? "/" : `/${segment}`}
          />
          <UserNav user={user} />
        </div>
      </div>
    </div>
  );
}
