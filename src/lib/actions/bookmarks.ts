"use server";
import type * as z from "zod";
import { db } from "../db";
import type { bookmarkSchema } from "../validations/bookmark";

type BookmarkSchema = z.infer<typeof bookmarkSchema>;

export async function createBookmark(authorId: string, data: BookmarkSchema) {
  return await db.bookmark.create({
    data: {
      title: data.title,
      url: data.url,
      collectionId: data.collection,
      authorId,
    },
  });
}

export async function updateBookmark(
  bookmarkId: string,
  authorId: string,
  data: BookmarkSchema,
) {
  return await db.bookmark.update({
    where: {
      id: bookmarkId,
      authorId,
    },
    data: {
      title: data.title,
      url: data.url,
      collectionId: data.collection,
      isPinned: data.isPinned
    },
  });
}

export async function deleteBookmark(bookmarkId: string, authorId: string) {
  const bookmark = await db.bookmark.delete({
    where: {
      id: bookmarkId,
      authorId,
    },
  });

  return bookmark.id;
}

export async function verifyBookmarkAccess(
  bookmarkId: string,
  authorId: string,
) {
  const isExist = await db.bookmark.count({
    where: {
      id: bookmarkId,
      authorId,
    },
  });

  return isExist > 0;
}
