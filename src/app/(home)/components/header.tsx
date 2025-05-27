import NavButton from "@/components/layout/nav-button";
import ThemeToggle from "@/components/layout/theme-toggle";
import { Icons } from "@/components/shared/icons";
import { siteConfig } from "@/config/site";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full  sticky top-4 mx-auto h-12 px-3 backdrop-blur-2xl bg-gray-3 rounded-md z-[100] flex justify-between items-center ">
      <Link href={siteConfig.links.home}>
        <div className="font-semibold text-lg flex items-center gap-2">
          <Icons.logo size={24} />
          Comma
        </div>
      </Link>
      <div className="flex gap-2">
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
          className="max-md:hidden"
        >
          Sign up
        </NavButton>
      </div>
    </header>
  );
}
