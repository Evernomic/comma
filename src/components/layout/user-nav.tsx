"use client";

import { siteConfig } from "@/config/site";
import useAppCommand from "@/hooks/use-app-command";
import { cn, getInitials, getUserPageURL } from "@/lib/utils";
import type { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import { Icons } from "../shared/icons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface Props {
  user: Pick<
    User,
    "name" | "email" | "image" | "username" | "domain" | "lsId"
  > | null;
}

export default function UserNav({ user }: Props) {
  const setOpen = useAppCommand(useShallow((state) => state.setOpen));
  const pathname = usePathname();

  if (!user) {
    return null;
  }

  const { name, image } = user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="size-4.5 rounded-lg border-2 border-transparent bg-gray-2   outline-hidden data-[state=open]:border-gray-2"
        aria-label={name!}
      >
        <Avatar>
          <AvatarImage src={image!} alt={`${name!} Profile Picture`} />
          <AvatarFallback>{name && getInitials(name)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[180px]">
        {!user?.lsId && (
          <>
            <DropdownMenuItem asChild>
              <Link href="/settings/billing">
                <Icons.circleArrowUp size={15} /> Upgrade to Pro
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem asChild>
          <Link href={getUserPageURL(user)} target="_blank">
            <Icons.arrowUpRight size={15} /> Your page
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/analytics"
            className={cn(
              pathname === "/analytics" && "bg-gray-2 text-secondary",
            )}
          >
            <Icons.areaChart size={15} /> Analytics
          </Link>
        </DropdownMenuItem>
        {user?.lsId && (
          <DropdownMenuItem asChild>
            <Link
              href="/settings/subscribers"
              className={cn(
                pathname === "/settings/subscribers" &&
                  "bg-gray-2 text-secondary",
              )}
            >
              <Icons.mail size={15} /> Subscribers
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => setOpen(true)}>
          <Icons.command size={15} /> Command menu
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/settings"
            className={
              pathname === "/settings" ? "bg-gray-2 text-secondary" : ""
            }
          >
            <Icons.settings size={15} /> Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={siteConfig.links.home}>
            <Icons.logo size={15} /> Home page
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-danger"
          onClick={() =>
            signOut({
              callbackUrl: "/login",
            })
          }
        >
          <Icons.logout size={15} />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
