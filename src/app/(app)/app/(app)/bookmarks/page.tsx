import AddBookmarkOrCollection from "@/components/bookmarks/add-bookmark-or-collection";
import CollectionBar from "@/components/bookmarks/collections/collections-bar";
import Collections from "@/components/bookmarks/collections/collections-modal";
import AppShell from "@/components/layout/app-shell";
import AppHeader from "@/components/layout/header";
import { getBookmarks } from "@/lib/fetchers/bookmarks";
import { getCollections } from "@/lib/fetchers/collections";
import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next";
import BookmarksList from "./bookmarks-list";

export const metadata: Metadata = {
  title: "Bookmarks",
};

export default async function Bookmarks() {
  const [bookmarks, collections] = await Promise.all([
    getBookmarks(),
    getCollections(),
  ]);

  return (
    <AppShell>
      <AppHeader title="Bookmarks">
        <div className="flex items-center gap-1">
          <Collections collections={collections} />
          <AddBookmarkOrCollection collections={collections} />
        </div>
      </AppHeader>
      <NuqsAdapter>
        <CollectionBar collections={collections} />
        <BookmarksList bookmarks={bookmarks} collections={collections} />
      </NuqsAdapter>
    </AppShell>
  );
}
