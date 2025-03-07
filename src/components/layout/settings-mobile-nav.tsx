"use client";

import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";
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
}

export default function MobileSettingsNav({ links, currentPath }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="hidden h-4.5  w-4.5 items-center justify-center rounded-md outline-0 transition-colors hover:bg-gray-2 data-[state=open]:bg-gray-2 max-md:flex"
        aria-label="Settings menu"
      >
        <Icons.menu size={15} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
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
