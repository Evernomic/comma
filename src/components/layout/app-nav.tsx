"use client";

import { cn } from "@/lib/utils";
import type { MainNavItem } from "@/types";
import type { User } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "../shared/icons";
import MobileNav from "./mobile-nav";
import NavButton from "./nav-button";
import ThemeToggle from "./theme-toggle";
import UserNav from "./user-nav";

interface Props {
  links: MainNavItem[];
  user: Pick<
    User,
    "name" | "email" | "image" | "username" | "domain" | "lsId"
  > | null;
}

const postPaths = [
  "/pages",
  "/articles",
  "/projects",
  "/bookmarks",
  "/work",
] as const;
export default function AppNav({ links, user }: Props) {
  const pathname = usePathname();
  return (
    <div className="flex w-full items-center justify-between  ">
      <Link href="/pages" className="text-secondary" aria-label="Go to pages">
        <Icons.logo size={30} />
      </Link>

      <div className="flex gap-2">
        <nav className="flex gap-2 max-md:hidden">
          {links.map((link) => {
            const Icon = Icons[link.icon];
            return (
              <NavButton
                href={link.href}
                key={link.title}
                size="sm"
                buttonClassname={cn("font-medium gap-2", {
                  "bg-gray-2 text-secondary ":
                    (link.href === "/pages" &&
                      postPaths.some((p) => p === pathname)) ||
                    pathname === link.href,
                })}
                buttonVariant="ghost"
              >
                <Icon size={15} /> {link.title}
              </NavButton>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <MobileNav links={links} currentPath={pathname} />
          <ThemeToggle compact />
          <UserNav user={user} />
        </div>
      </div>
    </div>
  );
}
