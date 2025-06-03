import MobileNav from "@/components/layout/mobile-nav";
import NavButton from "@/components/layout/nav-button";
import ThemeToggle from "@/components/layout/theme-toggle";
import { Icons } from "@/components/shared/icons";
import { siteConfig } from "@/config/site";
import type { NavItem } from "@/types";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-[700px] max-[700px]:w-full  sticky top-4 mx-auto h-[75px] p-4  backdrop-blur-3xl bg-gray-3 rounded-md z-[100] flex justify-between items-center ">
      <div className="flex-1">
        <Link href="/home">
          <div className="font-medium text-lg flex items-center gap-2">
            <Icons.logo size={28} />
            Comma
          </div>
        </Link>
      </div>
      <div className="flex gap-2 flex-1 justify-end">
        <ThemeToggle compact iconSize={15} />
        <NavButton
          href={siteConfig.links.login}
          size="sm"
          buttonVariant="ghost"
          direction="ltr"
          buttonClassname="gap-2"
          aria-label="Log in to Comma"
        >
          Log in
        </NavButton>
                <NavButton
          href={siteConfig.links.signup}
          size="sm"
          buttonVariant="primary"
          direction="ltr"
          buttonClassname="gap-2"
          aria-label="Sign up to Comma"
        >
         Sign up
        </NavButton>
      </div>
    </header>
  );
}
