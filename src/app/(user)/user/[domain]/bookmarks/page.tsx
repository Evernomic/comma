import CollectionBar from "@/components/bookmarks/collections/collections-bar";
import AppShell from "@/components/layout/app-shell";
import { getBookmarksByAuthor } from "@/lib/fetchers/bookmarks";
import { getCollectionsByAuthor } from "@/lib/fetchers/collections";
import { getUserByDomain } from "@/lib/fetchers/users";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BookmarksList from "./bookmarks-list";

export const metadata: Metadata = {
  title: "Bookmarks",
};

interface BookmarksPageProps {
  params: Promise<{
    domain: string;
  }>;
}
export const dynamic = "force-dynamic"

export default async function Bookmarks({ params }: BookmarksPageProps) {
  const { domain: userDomain } = await params;

  const domain = decodeURIComponent(userDomain);
  const user = await getUserByDomain(domain);
  if (!user) {
    return notFound();
  }
  const [collections, bookmarks] = await Promise.all([
    getCollectionsByAuthor(user.id),
    getBookmarksByAuthor(user.id),
  ]);

  return (
    <AppShell>
      <CollectionBar collections={collections} />
      <BookmarksList bookmarks={bookmarks} />
    </AppShell>
  );
}
