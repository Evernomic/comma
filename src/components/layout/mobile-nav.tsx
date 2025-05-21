"use client";

import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";
import type { PopoverContentProps } from "@radix-ui/react-popover";
import { Icons } from "../shared//icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import NavButton from "./nav-button";
interface Props {
  links: NavItem[];
  currentPath: string;
  align?: PopoverContentProps["align"];
}

export default function MobileNav({
  links,
  currentPath,
  align = "end",
}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="hidden h-4.5  w-4.5 items-center justify-center rounded-md outline-0 transition-colors hover:bg-gray-2 data-[state=open]:bg-gray-2 max-[600px]:flex"
        aria-label="Open Mobile Menu"
      >
        <Icons.menu size={15} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
        {links.map((link) => (
          <NavButton
            href={link.href}
            key={link.title}
            size="sm"
            className="w-full"
            buttonClassname={cn(
              "w-full justify-start",
              currentPath.endsWith(link.href) ? "bg-gray-2 text-secondary" : "",
            )}
            buttonVariant="ghost"
          >
            {link.title}
          </NavButton>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
