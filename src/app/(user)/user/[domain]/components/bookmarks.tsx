import Bookmark from "@/components/bookmarks/bookmark";
import { Icons } from "@/components/shared/icons";
import type { BookmarkWithCollection } from "@/types";
import { Collection } from "@prisma/client";
import Link from "next/link";

export default function Bookmarks({
  title,
  bookmarks,
}: {
  title: string;
  bookmarks: BookmarkWithCollection[];
}) {
  if (!bookmarks.length) {
    return null;
  }
  return (
    <dl className="section-container">
      <dt className="section-title link group">
        <Link
          href="/bookmarks"
          className="absolute w-full h-full "
          aria-label="View All Bookmarks"
        />
        <h3>{title}</h3>
        <Icons.arrowRight
          size={16}
          className="text-gray-4 group-hover:text-secondary"
        />
      </dt>
      <dd className="section-content">
        {bookmarks.map((bookmark) => (
          <Bookmark
            bookmark={bookmark}
            collection={bookmark?.collection as Collection}
            key={bookmark.id}
          />
        ))}
      </dd>
    </dl>
  );
}
