import type { UserPageConfig } from "@/types";
import type { User } from "@prisma/client";

export const userPageConfig: UserPageConfig = {
  pages: [
    {
      title: "Home",
      href: "/",
      icon: "home",
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
  ],
  sections: [
    {
      title: "Intro",
      position: 7,
      isTitleEditable: false,
    },
    {
      title: "Navigation",
      position: 8,
      isTitleEditable: false,
    },
    {
      title: "Newsletter",
      position: 0,
    },
    {
      title: "About",
      position: 1,
    },
    {
      title: "Work experience",
      position: 2,
    },
    {
      title: "Articles",
      position: 3,
    },
    {
      title: "Projects",
      position: 4,
    },
    {
      title: "Bookmarks",
      position: 5,
    },
    {
      title: "Connect",
      position: 6,
    },
  ],
} as const;

export const getLinks = (
  user: Pick<
    User,
    "github" | "twitter" | "dribbble" | "linkedin" | "contactEmail"
  >,
) => {
  return [
    {
      platform: "Twitter",
      username: user.twitter,
      url: "https://x.com/",
      icon: "twitter",
    },
    {
      platform: "Linkedin",
      username: user.linkedin,
      url: "https://linkedin.com/",
      icon: "linkedin",
    },
    {
      platform: "Dribbble",
      username: user.dribbble,
      url: "https://dribbble.com/",
      icon: "dribbble",
    },
    {
      platform: "Github",
      username: user.github,
      url: "https://github.com/",
      icon: "github",
    },
    {
      platform: "Email",
      username: user.contactEmail,
      url: "mailto:",
      icon: "mail",
    },
  ].filter((l) => l.username);
};
