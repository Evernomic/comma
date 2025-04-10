import type { AppConfig } from "@/types";

export const appConfig: AppConfig = {
  mainNav: [
    {
      title: "Pages",
      href: "/pages",
      icon: "layers",
    },
    {
      title: "Articles",
      href: "/articles",
      icon: "edit",
    },
    {
      title: "Projects",
      href: "/projects",
      icon: "layers",
    },
    {
      title: "Bookmarks",
      href: "/bookmarks",
      icon: "bookmark",
    },
    {
      title: "Work",
      href: "/work",
      icon: "bookmark",
    },
  ],
  settingsNav: [
    {
      title: "General",
      href: "/settings",
    },
    {
      title: "Customize",
      href: "/settings/customize",
    },
    {
      title: "Customize home",
      href: "/settings/customize/home",
      isVisible: false,
    },
    {
      title: "Links",
      href: "/settings/links",
    },
    {
      title: "SEO",
      href: "/settings/seo",
    },
    {
      title: "Subscribers",
      href: "/settings/subscribers",
    },
    {
      title: "Beehiiv",
      href: "/settings/subscribers/beehiiv",
      isVisible: false,
    },
    {
      title: "Billing",
      href: "/settings/billing",
    },
  ],
  filters: {
    postsFilter: [
      {
        title: "All",
        href: "/",
        value: undefined,
      },
      {
        title: "Public",
        href: "?published=true",
        value: "true",
      },
      {
        title: "Draft",
        href: "?published=false",
        value: "false",
      },
    ],
  },
} as const;
