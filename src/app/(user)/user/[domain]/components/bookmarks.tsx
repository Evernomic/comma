import Bookmark from "@/components/bookmarks/bookmark";
import { Icons } from "@/components/shared/icons";
import type { BookmarkWithCollection } from "@/types";
import { Collection } from "@prisma/client";
import Link from "next/link";

export default function Bookmarks({
  bookmarks,
}: {
  bookmarks: BookmarkWithCollection[];
}) {
  if (!bookmarks.length) {
    return null;
  }
  return (
    <dl className="section-container">
      <Link href="/bookmarks" aria-label="View All Bookmarks">
        <dt className="section-title link group">
          <h3>Bookmarks</h3>
          <Icons.arrowRight
            size={16}
            className="text-gray-4 group-hover:text-secondary"
          />
        </dt>
      </Link>
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
