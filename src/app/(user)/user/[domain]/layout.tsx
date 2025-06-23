import Track from "@/components/analytics/track";
import ThemeProvider from "@/components/providers/theme-provider";
import { getUserByDomain } from "@/lib/fetchers/users";
import {
  cn,
  generateSEO,
  getUserFavicon,
  getUserOgImage,
  getUserPageURL,
} from "@/lib/utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NuqsAdapter } from "nuqs/adapters/next";
import type React from "react";
import BottomNav from "./components/bottom-nav";
import UserHeader from "./components/user-header";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{
    domain: string;
  }>;
}

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata | null> {
  const domain = decodeURIComponent((await params).domain);
  const user = await getUserByDomain(domain);
  if (!user) {
    return notFound();
  }
  const title = user.name || user.username;
  const [url, image, favicon] = [
    getUserPageURL(user),
    getUserOgImage(user),
    getUserFavicon(user),
  ];
  return generateSEO({
    title,
    template: title,
    seoTitle: user.seoTitle!,
    description: user.seoDescription!,
    image,
    icons: [favicon],
    url,
    feeds: {
      rss: `${url}/feed`,
      atom: `${url}/feed?type=atom`,
    },
  });
}

export default async function UserLayout({ children, params }: LayoutProps) {
  const domain = decodeURIComponent((await params).domain);
  const user = await getUserByDomain(domain);
  if (!user) {
    return notFound();
  }
  return (
    <div
      className={cn(
        "mx-auto flex min-h-screen w-[640px] flex-col  max-md:w-full pt-28 pb-48 max-md:pt-20 max-md:px-4 ",
        {
          "w-full px-20 pt-10 pb-100": user.theme === "linkInBio",
        },
      )}
    >
      <ThemeProvider defaultTheme={user.userDefaultTheme ?? "dark"}>
        <UserHeader user={user} />
        <main className="w-full flex-1">
          <NuqsAdapter>{children}</NuqsAdapter>
        </main>
        <Track />
        {user.showBottomNav ? <BottomNav user={user} /> : null}
      </ThemeProvider>
    </div>
  );
}
