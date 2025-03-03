import Track from "@/components/analytics/track";
import Command from "@/components/layout/user-page-command";
import { getUserByDomain } from "@/lib/fetchers/users";
import {
  generateSEO,
  getUserFavicon,
  getUserOgImage,
  getUserPageURL,
} from "@/lib/utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type React from "react";
import Watermark from "./components/watermark";

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
    <div className="mx-auto flex min-h-screen w-[640px] flex-col  max-md:w-full py-20 max-md:pt-10 max-md:px-4 ">
      <main className="w-full flex-1">{children}</main>
      <Command user={user} />
      <Track />
      <Watermark user={user} />
    </div>
  );
}
