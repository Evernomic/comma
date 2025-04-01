"use client";
import Bookmark from "@/components/bookmarks/bookmark";
import NoBookmarksPlaceholder from "@/components/bookmarks/no-bookmarks-placeholder";
import { sortBookmarks } from "@/lib/utils";
import type { BookmarkWithCollection } from "@/types";
import type { Collection } from "@prisma/client";
import { useQueryState } from "nuqs";

export default function BookmarksList({
  bookmarks,
}: {
  bookmarks: BookmarkWithCollection[];
}) {
  const [collection] = useQueryState("collection", { history: "push" });

  const sortedBookmarks = sortBookmarks(bookmarks, collection);

  return (
    <div className="w-full flex flex-col">
      {sortedBookmarks.map((bookmark) => (
        <Bookmark
          bookmark={bookmark}
          collection={bookmark?.collection as Collection}
          key={bookmark.id}
        />
      ))}
      {!sortedBookmarks.length && <NoBookmarksPlaceholder />}
    </div>
  );
}
