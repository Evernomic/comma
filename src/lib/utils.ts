import { siteConfig } from "@/config/site";
import { userPageConfig } from "@/config/user-page";
import type {
  BookmarkWithCollection,
  CustomNavItem,
  UserPageSection,
} from "@/types";
import type { Article, Project, User, WorkExperience } from "@prisma/client";
import clsx, { type ClassValue } from "clsx";
import { formatDate as format } from "date-fns";
import type { Metadata } from "next";
import type { NextRequest } from "next/server";
import slug from "slugify";
import { twMerge } from "tailwind-merge";
import type { PropertyProps } from "./analytics";
import { URLRegex, analyticsEndpoint } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(input: string): string {
  const splitted = input.split(" ");
  const [first, last] =
    splitted?.length > 1
      ? [splitted[0].charAt(0), splitted[1].charAt(0)]
      : [input[0], input.at(-1)];
  return `${first + last}`.toLocaleUpperCase();
}

interface SWRError extends Error {
  status: number;
}

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  const res = await fetch(input, init);

  if (!res.ok) {
    const error = await res.text();
    const err = new Error(error) as SWRError;
    err.status = res.status;
    throw err;
  }

  return res.json();
}

export function getDomainFromURL(url: string) {
  if (!URLRegex.test(url)) {
    return url;
  }
  const u = new URL(url);

  return u.host;
}

export function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatVerboseDate(date: Date) {
  return format(date, "PPPPpppp");
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function detectBot(req: NextRequest) {
  const url = req.nextUrl;
  if (url.searchParams.get("bot")) return true;
  const ua = req.headers.get("User-Agent");
  if (ua) {
    return /bot|chatgpt|facebookexternalhit|WhatsApp|google|baidu|bing|msn|duckduckbot|teoma|slurp|yandex|MetaInspector/i.test(
      ua,
    );
  }
  return false;
}

export function getSearchParams(url: string) {
  const params = Object.fromEntries(new URL(url).searchParams.entries());
  return params;
}

export function getSubdomain(name: string, apex: string) {
  if (name === apex) return null;

  return name.split(`.${apex}`)[0];
}

export function sortArticles(articles: Article[], published?: string) {
  return articles
    .filter((a) => (published ? a.published.toString() === published : a))
    .sort((a, b) => Number(b.published) - Number(a.published));
}

export function sortProjects(projects: Project[], published?: string) {
  return projects
    .filter((p) => (published ? p.published.toString() === published : p))
    .sort((a, b) => Number(b.published) - Number(a.published));
}

export function sortBookmarks(
  bookmarks: BookmarkWithCollection[],
  collection?: string | null,
) {
  return bookmarks.filter((b) =>
    collection ? collection === b.collection?.name : b,
  );
}

export function sortWorkExperiences(experiences: WorkExperience[]) {
  return experiences.sort(
    (a, b) => b.from - (a.to === "present" ? 1 : Number(a.to)),
  );
}

export function getEndpoint(
  property: PropertyProps,
  source: keyof typeof analyticsEndpoint,
) {
  if (property === "timeseries" || property === "total") {
    return analyticsEndpoint[source][property];
  }

  return analyticsEndpoint[source].primary;
}

export function slugify(title?: string) {
  if (title) {
    return slug(title, {
      strict: true,
      lower: true,
    });
  }

  return undefined;
}

export function generateSEO({
  title = siteConfig.name,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  siteName = siteConfig.name,
  seoTitle = siteConfig.name,
  icons = {
    shortcut: [
      {
        media: "(prefers-color-scheme: light)",
        rel: "icon",
        type: "image/x-icon",
        url: "/favicon-light.svg",
        href: "/favicon-light.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        rel: "icon",
        type: "image/x-icon",
        url: "/favicon.svg",
        href: "/favicon.svg",
      },
    ],
    icon: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon-16x16.png",
      },
    ],
    apple: [
      {
        rel: "apple-touch-icon",
        sizes: "32x32",
        url: "/apple-touch-icon.png",
      },
    ],
  },
  url = siteConfig.url,
  template,
  noIndex = false,
  canonicalURL,
  feeds,
}: {
  title?: string;
  template?: string | null;
  description?: string;
  seoTitle?: string;
  image?: string;
  siteName?: string;
  icons?: Metadata["icons"];
  url?: string;
  noIndex?: boolean;
  canonicalURL?: string;
  feeds?: {
    rss: string;
    atom: string;
  };
} = {}): Metadata {
  return {
    ...(template
      ? {
          title: {
            default: title,
            template: template ? `%s / ${template}` : "",
          },
        }
      : {
          title,
        }),
    description,
    openGraph: {
      type: "website",
      locale: "en_US",
      title: seoTitle || title,
      description,
      images: [
        {
          url: image,
        },
      ],
      siteName,
      url,
    },
    twitter: {
      title: seoTitle || title,
      description,
      card: "summary_large_image",
      images: [
        {
          url: image,
        },
      ],
    },
    icons,
    keywords: [
      "blog",
      "write",
      "writing",
      "blogging",
      "publishing",
      "journalling",
      "minimal blog",
      "microblogging",
      "blogging sites",
      "simple blogging",
      "what is blogging",
      "minimal blogging",
      "blogging platform",
      "blogging platforms",
      "minimalist blogging",
      "free blogging sites",
      "how to start a blog",
      "how to start blogging",
      "best blogging platform",
      "blogging for beginners",
      "free blogging platforms",
      "best free blogging platform",
    ],
    metadataBase: url
      ? new URL(url)
      : new URL(`https://${process.env.NEXT_PUBLIC_APP_DOMAIN as string}`),
    alternates: {
      canonical: canonicalURL || url,
      ...(feeds && {
        types: {
          "application/rss+xml": [
            {
              title: "RSS Feed",
              url: feeds.rss,
            },
          ],
          "application/atom+xml": [
            {
              title: "Atom Feed",
              url: feeds.atom,
            },
          ],
        },
      }),
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

export function jsonToFrontmatter(jsonData: object) {
  const frontmatter = Object.entries(jsonData)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}:\n  - ${value.join("\n  - ")}`;
      }
      return `${key}: ${value}`;
    })
    .join("\n");

  return `---\n${frontmatter}\n---\n\n`;
}

export function generateYearsInRange(from: number = 1990, to?: number) {
  const targetYear = to ?? new Date().getFullYear();
  return Array.from({ length: targetYear - from }).map(
    (_, i) => targetYear - i,
  );
}

export function getUserPageURL(user: Pick<User, "username" | "domain">) {
  return `https://${!user.domain ? `${user.username}.${process.env.NEXT_PUBLIC_USER_DOMAIN}` : user.domain}`;
}

export function getPostPageURL(
  type: "articles" | "projects",
  slug: string,
  user: Pick<User, "username" | "domain">,
) {
  return `${getUserPageURL(user)}/${type}/${slug}`;
}

export function getUserOgImage(
  user: Pick<User, "ogImage" | "username" | "name">,
) {
  return `${process.env.NEXT_PUBLIC_URL}/api/og/user?username=${user.name ?? user.username}`;
}

export function getArticleOgImage(
  article: Pick<Project, "ogImage" | "title">,
  user: Pick<User, "username" | "domain" | "name">,
) {
  return `${process.env.NEXT_PUBLIC_URL}/api/og/post?title=${article.title}&username=${user.name ?? user.username}`;
}

export function getProjectOgImage(
  project: Pick<Project, "ogImage" | "title"> & { isProtected?: boolean },
  user: Pick<User, "username" | "domain" | "name">,
) {
  return `${process.env.NEXT_PUBLIC_URL}/api/og/post?title=${project.title}&username=${user.name ?? user.username}${project.isProtected ? "&locked=true" : ""}`;
}

export function getUserFavicon(user: Pick<User, "username">) {
  return `${process.env.NEXT_PUBLIC_URL}/api/og/favicon?username=${user.username}`;
}

export function sortUserPageSections(
  defaultOrder: UserPageSection[],
  sections?: UserPageSection[] | null,
) {
  if (sections) {
    return defaultOrder
      .sort(
        (a, b) =>
          sections.findIndex((o) => o.position === a.position) -
          sections.findIndex((o) => o.position === b.position),
      )
      .map((s) => {
        return {
          ...s,
          title:
            sections.find((o) => o.position === s.position)?.title ?? s.title,
        };
      });
  }

  return defaultOrder;
}

export function sortUserNavItems(
  defaultOrder: CustomNavItem[],
  links?: CustomNavItem[] | null,
) {
  if (links) {
    return [
      ...defaultOrder,
      ...links.filter((l) => !defaultOrder.find((dl) => dl.href === l.href)),
    ]
      .sort(
        (a, b) =>
          links.findIndex((o) => o.href === a.href) -
          links.findIndex((o) => o.href === b.href),
      )
      .map((l) => {
        return {
          ...l,
          isVisible: links.find((o) => o.href === l.href)?.isVisible ?? true,
          title: links.find((o) => o.href === l.href)?.title ?? l.title,
        };
      });
  }

  return defaultOrder;
}

export function getSectionTitle(position: number, sections: UserPageSection[]) {
  if (sections) {
    return sortUserPageSections(userPageConfig.sections, sections)?.find((s) => s.position === position)?.title ?? "";
  }
  return (
    userPageConfig.sections.find((s) => s.position === position)?.title ?? ""
  );
}
