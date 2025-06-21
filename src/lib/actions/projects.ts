"use server";
import type * as z from "zod";
import { db } from "../db";
import { slugify } from "../utils";
import type {
  projectCreateSchema,
  projectPatchSchema,
} from "../validations/project";

type ProjectCreateSchema = z.infer<typeof projectCreateSchema>;
type ProjectPatchSchema = z.infer<typeof projectPatchSchema>;

export async function createProject(
  authorId: string,
  data: ProjectCreateSchema,
) {
  return await db.project.create({
    data: {
      ...data,
      authorId,
    },
  });
}

export async function updateProject(
  projectId: string,
  authorId: string,
  data: ProjectPatchSchema,
) {
  const { slug, ...rest } = data;
  return await db.project.update({
    where: {
      id: projectId,
      authorId,
    },
    data: {
      ...rest,
      slug: data.title || slug ? (slug ?? slugify(data.title)) : undefined,
    },
  });
}

export async function deleteProject(projectId: string, authorId: string) {
  const project = await db.project.delete({
    where: {
      id: projectId,
      authorId,
    },
  });

  return project.id;
}

export async function verifyProjectAccess(projectId: string, authorId: string) {
  const isExist = await db.project.count({
    where: {
      id: projectId,
      authorId,
    },
  });

  return isExist > 0;
}
