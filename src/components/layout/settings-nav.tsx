"use client";

import { appConfig } from "@/config/app";
import { usePathname } from "next/navigation";
import AppHeader from "./header";
import NavButton from "./nav-button";
import MobileSettingsNav from "./settings-mobile-nav";

export default function SettingsNav() {
  const path = usePathname();
  const current = appConfig.settingsNav.find((item) => item.href === path);
  return (
    <AppHeader title={current?.title || "Settings"}>
      <nav className="flex gap-2 max-md:hidden">
        {appConfig.settingsNav
          .filter((p) => p.isVisible !== false)
          .map((link) => (
            <NavButton
              href={link.href}
              key={link.title}
              size="sm"
              buttonClassname={
                link.href === path ? "bg-gray-2! text-secondary!" : ""
              }
              buttonVariant="ghost"
            >
              {link.title}
            </NavButton>
          ))}
      </nav>
      <MobileSettingsNav links={appConfig.settingsNav} currentPath={path} />
    </AppHeader>
  );
}
