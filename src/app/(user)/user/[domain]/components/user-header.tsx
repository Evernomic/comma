"use client";
import NavButton from "@/components/layout/nav-button";
import ClientOnly from "@/components/shared/client-only";
import { userPageConfig } from "@/config/user-page";
import { User } from "@/types";
import { usePathname } from "next/navigation";
import Intro from "./intro";
import NavTabs from "./nav-tabs";

export default function UserHeader({ user }: { user: User }) {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  if (
    !userPageConfig.pages
      .filter((p) => p.href !== "/")
      .some((p) => p.href === pathname)
  ) {
    return (
      <ClientOnly>
        <NavButton
          variant="text"
          href="/"
          className="text-sm mb-3"
          icon="arrowLeft"
          direction="ltr"
        >
          Back to home
        </NavButton>
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <div className="flex flex-col gap-16">
        <Intro user={user} />
        <NavTabs user={user} pages={userPageConfig.pages} />
      </div>
    </ClientOnly>
  );
}
