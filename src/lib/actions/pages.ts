"use server";

import type { PageVisibility, User } from "@prisma/client";
import * as z from "zod";
import { db } from "../db";
import { slugify } from "../utils";
import { pageCreateSchema, pagePatchSchema } from "../validations/page";

type PageCreateSchema = z.infer<typeof pageCreateSchema>;
type PagePatchSchema = z.infer<typeof pagePatchSchema>;

export async function createPage(authorId: string, data: PageCreateSchema) {
  return await db.page.create({
    data: {
      ...data,
      authorId,
    },
  });
}

export async function updatePage(
  pageId: string,
  user: User,
  data: PagePatchSchema,
) {
  const { slug, visibility, ...rest } = data;

  return await db.page.update({
    where: {
      id: pageId,
      authorId: user.id,
    },
    data: {
      ...rest,
      slug: slug || slugify(data.title),
      visibility: visibility as PageVisibility,
      updatedAt: new Date(),
    },
  });
}

export async function deletePage(pageId: string, authorId: string) {
  return await db.page.delete({
    where: {
      id: pageId,
      authorId,
    },
  });
}

export async function verifyPageAccess(pageId: string, authorId: string) {
  const isExist = await db.page.count({
    where: {
      id: pageId,
      authorId,
    },
  });

  return isExist > 0;
}
