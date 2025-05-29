import type { AdminConfig } from "@/types";

export const adminConfig: AdminConfig = {
  nav: [
    {
      title: "Dashboard",
      href: "/admin",
      icon: "dashboard",
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: "users",
    },
    {
      title: "Changelog",
      href: "/admin/changelog",
      icon: "book",
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: "settings",
    },
  ],
} as const;
