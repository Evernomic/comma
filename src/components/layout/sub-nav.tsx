"use client";

import { cn } from "@/lib/utils";
import type { MainNavItem } from "@/types";
import { usePathname } from "next/navigation";
import MobileNav from "./mobile-nav";
import NavButton from "./nav-button";

interface Props {
  links: MainNavItem[];
}

export default function SubNav({ links }: Props) {
  const pathname = usePathname();

  if (!links.some((l) => l.href === pathname)) {
    return null;
  }

  return (
    <div>
      <nav className="flex gap-2 justify-left  max-[600px]:hidden -ml-1.5">
        {links.map((link) => (
          <NavButton
            href={link.href}
            key={link.title}
            variant="text"
            size="sm"
            className={cn(
              "rounded-md cursor-pointer  w-max  h-[25px] hover:bg-gray-2 border border-transparent  flex items-center justify-center px-1.5 text-xs text-gray-4",
              link.href === pathname
                ? "bg-gray-3 border-gray-2 text-secondary"
                : "",
            )}
            buttonVariant="ghost"
          >
            {link.title}
          </NavButton>
        ))}
      </nav>

      <MobileNav align="start" links={links} currentPath={pathname} />
    </div>
  );
}
