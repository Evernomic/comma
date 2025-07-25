import NavButton from "@/components/layout/nav-button";
import ThemeToggle from "@/components/layout/theme-toggle";
import { Icons } from "@/components/shared/icons";
import { siteConfig } from "@/config/site";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full sticky top-4 mx-auto h-[75px] p-4  backdrop-blur-3xl bg-gray-3 rounded-md z-[100] flex justify-between items-center ">
      <div className="flex-1">
        <Link href="/home">
          <div className="font-medium text-lg flex items-center gap-2">
            <Icons.logo size={28} />
            Comma
          </div>
        </Link>
      </div>
      <div className="flex gap-2 flex-1 justify-end">
        <ThemeToggle className="max-sm:hidden" compact iconSize={18} size={5} />
        <NavButton
          href={siteConfig.links.login}
          buttonVariant="ghost"
          size="wide"
          direction="ltr"
          buttonClassname="gap-2"
          className="max-smd:hidden"
          aria-label="Log in to Comma"
        >
          Log in
        </NavButton>
        <NavButton
          href={siteConfig.links.signup}
          buttonVariant="primary"
          size="wide"
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
