import type { Social, UserPageConfig } from "@/types";
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

export const getLinks = (user: Pick<User, "links">) => {
  if ((user.links as Social[])?.length > 0) {
    return user.links as Social[];
  }
  return null;
};
