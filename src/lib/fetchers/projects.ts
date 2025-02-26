"use server";
import { ExportResponse } from "@/types";
import { verifyProjectAccess } from "../actions/projects";
import { db } from "../db";
import getCurrentUser from "../session";
import { formatVerboseDate, jsonToFrontmatter } from "../utils";

export async function getProject({
  authorId,
  slug,
  published,
}: {
  authorId: string;
  slug: string;
  published?: boolean;
}) {
  const project = await db.project.findUnique({
    where: {
      authorId_slug: {
        slug,
        authorId,
      },
      published,
    },
  });

  if (!project) {
    return null;
  }

  const { password, ...rest } = project;

  const isProtected = !!password;

  return {
    ...rest,
    isProtected,
  };
}

export async function getProjectById(projectId: string) {
  const session = await getCurrentUser();
  return await db.project.findUnique({
    where: {
      id: projectId,
      authorId: session?.id,
    },
  });
}

export async function getProjects({
  limit,
  published,
}: {
  limit?: number;
  published?: boolean;
} = {}) {
  const user = await getCurrentUser();
  return await db.project.findMany({
    where: {
      authorId: user?.id,
      published,
    },
    take: limit,
    orderBy: {
      year: "desc",
    },
  });
}

export async function getProjectByAuthor(projectId: string, authorId: string) {
  return await db.project.findUnique({
    where: {
      id: projectId,
      authorId,
    },
  });
}

export async function getProjectsByAuthor(
  authorId: string,
  limit?: number,
  published = true,
) {
  const projects = await db.project.findMany({
    where: {
      authorId,
      published,
    },
    take: limit,
    orderBy: {
      year: "desc",
    },
  });

  const filteredProjects = projects.map((project) => {
    const { password, ...rest } = project;
    const isProtected = !!password;

    return {
      ...rest,
      isProtected,
    };
  });

  return filteredProjects;
}

export async function getProjectExport(
  projectId: string,
  authorId: string,
): Promise<ExportResponse> {
  const project = await db.project.findFirst({
    where: {
      id: projectId,
      authorId,
    },
    omit: {
      authorId: true,
    },
  });

  if (!project) {
    throw new Error("Project not found");
  }

  if (!(await verifyProjectAccess(project.id, authorId))) {
    throw new Error("Permission denied");
  }

  const filename = `comma_export_project_${project.slug}.md`;
  const { content: projectContent, createdAt, updatedAt, ...props } = project;
  const frontmatter = jsonToFrontmatter({
    ...props,
    createdAt: formatVerboseDate(createdAt),
    updatedAt: formatVerboseDate(updatedAt),
  });
  const content = frontmatter + projectContent!;

  return {
    content,
    filename,
  };
}

export async function getProjectsExport(authorId: string) {
  const projects = await db.project.findMany({
    where: {
      authorId,
    },
  });

  const data = await Promise.all(
    projects.map((project) => getProjectExport(project.id, project.authorId)),
  );

  return data;
}
