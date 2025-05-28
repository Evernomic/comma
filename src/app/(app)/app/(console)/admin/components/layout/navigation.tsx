"use client";
import NavButton from "@/components/layout/nav-button";
import ThemeToggle from "@/components/layout/theme-toggle";
import BlurEffect from "@/components/shared/blur-effect";
import { adminConfig } from "@/config/admin";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();
  return (
    <footer className="w-full fixed bottom-0 left-0 pb-5 flex justify-center items-center ">
      <BlurEffect />
      <nav className="bg-gray-3   z-50 border border-gray-2 flex items-center gap-3  px-3 py-2 rounded-full">
        <NavButton
          href="/"
          buttonVariant="ghost"
          size="icon"
          buttonClassname="rounded-full text-secondary"
          icon="logo"
          aria-label="Back to Comma"
        />

        <span className="bg-gray-2 h-4 w-px"></span>

        <div className="flex gap-2 items-center">
          {adminConfig.nav.map((link) => (
            <NavButton
              href={link.href}
              buttonVariant="ghost"
              size="icon"
              icon={link.icon}
              aria-label={link.title}
              key={link.href}
              buttonClassname={cn("rounded-full", {
                "bg-gray-2 text-secondary": pathname === link.href,
              })}
            />
          ))}
        </div>
        <span className="bg-gray-2 h-4 w-px"></span>
        <ThemeToggle iconSize={15} className="rounded-full" compact />
      </nav>
    </footer>
  );
}
