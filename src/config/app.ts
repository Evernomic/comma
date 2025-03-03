import type { AppConfig } from "@/types";

export const appConfig: AppConfig = {
  mainNav: [
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
