"use server";

import { ExportResponse } from "@/types";
import { PageVisibility } from "@prisma/client";
import { verifyPageAccess } from "../actions/pages";
import { db } from "../db";
import getCurrentUser from "../session";
import { formatVerboseDate, jsonToFrontmatter } from "../utils";

export async function getPage({
  authorId,
  slug,
  published,
}: {
  authorId: string;
  slug: string;
  published?: boolean;
}) {
  const page = await db.page.findUnique({
    where: {
      authorId_slug: {
        slug,
        authorId,
      },
      published,
    },
  });

  if (!page) {
    return null;
  }

  const { password, ...rest } = page;

  const isProtected = !!password;

  return {
    ...rest,
    isProtected,
  };
}

export async function getPages({
  limit,
  published,
  visibility,
}: {
  limit?: number;
  published?: boolean;
  visibility?: PageVisibility;
} = {}) {
  const user = await getCurrentUser();
  return await db.page.findMany({
    where: {
      authorId: user?.id,
      published,
      visibility,
    },
    take: limit,
    orderBy: {
      updatedAt: "desc",
    },
  });
}

export async function getPageById(pageId: string) {
  const session = await getCurrentUser();
  return await db.page.findUnique({
    where: {
      id: pageId,
      authorId: session?.id,
    },
  });
}

export async function getPagesByAuthor(
  authorId: string,
  limit?: number,
  published = true,
) {
  return await db.page.findMany({
    where: {
      authorId,
      published,
      visibility: "visible",
    },
    take: limit,
  });
}

export async function getPageExport(
  pageId: string,
  authorId: string,
): Promise<ExportResponse> {
  const page = await db.page.findFirst({
    where: {
      id: pageId,
      authorId,
    },
    omit: {
      authorId: true,
    },
  });

  if (!page) {
    throw new Error("Page not found");
  }

  if (!(await verifyPageAccess(page.id, authorId))) {
    throw new Error("Permission denied");
  }

  const filename = `comma_export_page_${page.slug}.md`;
  const { content: pageContent, createdAt, updatedAt, ...props } = page;
  const frontmatter = jsonToFrontmatter({
    ...props,
    createdAt: formatVerboseDate(createdAt),
    updatedAt: formatVerboseDate(updatedAt),
  });
  const content = frontmatter + pageContent!;

  return { content, filename };
}

export async function getPagesExport(authorId: string) {
  const pages = await db.page.findMany({
    where: {
      authorId,
    },
  });

  const data = await Promise.all(
    pages.map((page) => getPageExport(page.id, page.authorId)),
  );

  return data;
}
