"use server";
import { ExportResponse } from "@/types";
import { json2csv } from "json-2-csv";
import { db } from "../db";
import getCurrentUser from "../session";
import { formatVerboseDate } from "../utils";

export async function getBookmarkByAuthor(
  bookmarkId: string,
  authorId: string,
) {
  return await db.bookmark.findUnique({
    where: {
      id: bookmarkId,
      authorId,
    },
  });
}

export async function getBookmarksByAuthor(author: string, limit?: number) {
  return await db.bookmark.findMany({
    where: {
      authorId: author,
    },
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      collection: {
        select: {
          id: true,
          name: true,
          authorId: true,
        },
      },
    },
  });
}

export async function getBookmarks(limit?: number) {
  const user = await getCurrentUser();
  return await db.bookmark.findMany({
    where: {
      authorId: user?.id,
    },
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      collection: true,
    },
  });
}

export async function getBookmarksByCollection(collectionName: string) {
  const user = await getCurrentUser();
  return await db.bookmark.findMany({
    where: {
      authorId: user?.id,
      collection: {
        name: collectionName === "all" ? undefined : collectionName,
      },
    },
    select: {
      id: true,
      title: true,
      url: true,
      clicks: true,
      collection: true,
    },
  });
}

export async function getBookmarkById(bookmarkId: string) {
  const session = await getCurrentUser();
  return await db.bookmark.findUnique({
    where: {
      id: bookmarkId,
      authorId: session?.id,
    },
  });
}

export async function getBookmarksExport(
  authorId: string,
): Promise<ExportResponse> {
  const bookmarks = await db.bookmark.findMany({
    where: {
      authorId,
    },
    include: {
      collection: {
        select: {
          name: true,
        },
      },
    },
    omit: {
      id: true,
      authorId: true,
      collectionId: true,
    },
  });

  const filename = `comma_bookmarks_export.csv`;

  const content = json2csv(
    bookmarks.map(({ collection, createdAt, updatedAt, ...bookmark }) => {
      return {
        ...bookmark,
        createdAt: formatVerboseDate(createdAt),
        updatedAt: formatVerboseDate(updatedAt),
        collectionName: collection?.name ?? null,
      };
    }),
  );

  return { filename, content };
}
