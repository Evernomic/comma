"use server";
import type { User } from "@prisma/client";
import * as z from "zod";
import { db } from "../db";
import { getUser } from "../fetchers/users";
import { slugify } from "../utils";
import {
  changelogCreateSchema,
  changelogPatchSchema,
} from "../validations/changelog";

export async function isAdmin(currentUser?: User) {
  const user = !currentUser ? await getUser() : currentUser;
  const adminIDs = process.env.ADMINS
    ? (JSON.parse(process.env.ADMINS) as string[])
    : null;

  if (!adminIDs || !user) {
    return false;
  }

  if (adminIDs.some((id) => id === user.id)) {
    return user;
  }

  return false;
}

type LogCreateSchema = z.infer<typeof changelogCreateSchema>;
type LogPatchSchema = z.infer<typeof changelogPatchSchema>;

export async function createLog(data: LogCreateSchema) {
  return await db.changelog.create({
    data,
  });
}

export async function updateLog(id: string, data: LogPatchSchema) {
  const { slug, publishedAt, ...rest } = data;

  return await db.changelog.update({
    where: {
      id,
    },
    data: {
      ...rest,
      slug: slug || slugify(data.title),
      publishedAt: publishedAt ? new Date(publishedAt) : undefined,
    },
  });
}

export async function deleteLog(id: string) {
  const changelog = await db.changelog.delete({
    where: {
      id,
    },
  });

  return changelog.id;
}

export async function deleteUser(id: string) {
  const user = await db.user.update({
    where: {
      id,
    },
    data: {
      accounts: {
        deleteMany: {
          userId: id,
        },
      },
      sessions: {
        deleteMany: {
          userId: id,
        },
      },
      articles: {
        deleteMany: {
          authorId: id,
        },
      },
      projects: {
        deleteMany: {
          authorId: id,
        },
      },
      bookmarks: {
        deleteMany: {
          authorId: id,
        },
      },
      pages: {
        deleteMany: {
          authorId: id,
        },
      },
      subscribers: {
        deleteMany: {
          userId: id,
        },
      },
      collections: {
        deleteMany: {
          authorId: id,
        },
      },
      workExperiences: {
        deleteMany: {
          userId: id,
        },
      },
      callouts: {
        deleteMany: {
          userId: id,
        },
      },
    },
  });

  return await db.user.delete({
    where: {
      id: user.id,
    },
  });
}
