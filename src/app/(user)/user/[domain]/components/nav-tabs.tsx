"use client";
import ClientOnly from "@/components/shared/client-only";
import { Icons } from "@/components/shared/icons";
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
  const links = sortUserNavItems(pages, user.navLinks as NavItem[])?.filter(
    (l) => (l.isVisible !== undefined ? l.isVisible : true),
  );
  return (
    <ClientOnly>
      <nav
        className="user-nav-tabs flex gap-4 mb-6 not-prose max-w-full h-[30px] overflow-x-auto scrollbar-hide"
      >
        {links.map((page) => (
          <Link
            href={page.href}
            key={page.href}
            target={page.isExternal ? "_blank" : undefined}
            className={cn(
              "text-sm min-w-max flex gap-1 transition-colors text-gray-4! custom-underline decoration-transparent! underline-offset-8!  hover:text-secondary!",
              pathname === page.href && "text-secondary! decoration-secondary!",
            )}
          >
            {page.title}
            {page.isExternal && page.href.startsWith("http") && (
              <Icons.arrowUpRight size={14} />
            )}
          </Link>
        ))}
      </nav>
    </ClientOnly>
  );
}
