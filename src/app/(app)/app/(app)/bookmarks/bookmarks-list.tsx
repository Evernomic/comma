"use client";

import Bookmark from "@/components/bookmarks/bookmark";
import NoBookmarksPlaceholder from "@/components/bookmarks/no-bookmarks-placeholder";
import { sortBookmarks } from "@/lib/utils";
import type { BookmarkWithCollection } from "@/types";
import type { Collection } from "@prisma/client";
import { useQueryState } from "nuqs";

export default function BookmarksList({
  bookmarks,
  collections,
}: {
  bookmarks: BookmarkWithCollection[];
  collections: Collection[];
}) {
  const [collection] = useQueryState("collection", { history: "push" });

  const sortedBookmarks = sortBookmarks(bookmarks, collection);

  return (
    <div>
      {sortedBookmarks.map((bookmark) => (
        <Bookmark
          bookmark={bookmark}
          collection={bookmark?.collection as Collection}
          collections={collections}
          key={bookmark.id}
          admin
        />
      ))}
      {!sortedBookmarks.length && <NoBookmarksPlaceholder description />}
    </div>
  );
}
