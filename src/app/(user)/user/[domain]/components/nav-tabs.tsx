"use client";
import { cn, sortUserNavItems } from "@/lib/utils";
import type { CustomNavItem, NavItem, User } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavTabs({
  user,
  pages,
}: {
  user: User;
  pages: CustomNavItem[];
}) {
  const pathname = usePathname();
  const links = sortUserNavItems(
    pages,
    user.externalLinks as NavItem[],
  )?.filter((l) => (l.isVisible !== undefined ? l.isVisible : true));
  if (!links.length) {
    return null;
  }
  return (
    <nav className="flex gap-4 mb-6">
      {links.map((page) => (
        <Link
          href={page.href}
          key={page.href}
          className={cn(
            "text-sm relative transition-colors text-gray-4 before:multi-[content-[''];h-[1.5px];w-full;bg-transparent;absolute;-bottom-[4.5px];transition-colors] hover:text-secondary",
            pathname === page.href && "text-secondary before:bg-secondary",
          )}
        >
          {page.title}
        </Link>
      ))}
    </nav>
  );
}
