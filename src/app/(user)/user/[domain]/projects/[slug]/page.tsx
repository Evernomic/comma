import AppShell from "@/components/layout/app-shell";
import AppHeader from "@/components/layout/header";
import MDX from "@/components/markdown/mdx";
import { Icons } from "@/components/shared/icons";
import { Badge } from "@/components/ui/badge";
import { getProject, getProjectsByAuthor } from "@/lib/fetchers/projects";
import { getUserByDomain } from "@/lib/fetchers/users";
import { generateSEO } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Protection from "./protection";

export const revalidate = 60;

interface ProjectPageProps {
  params: Promise<{ slug: string; domain: string }>;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata | null> {
  const { slug, domain: userDomain } = await params;
  const domain = decodeURIComponent(userDomain);
  const user = await getUserByDomain(domain);
  if (!user) {
    return notFound();
  }
  const project = await getProject({
    authorId: user.id,
    slug,
    published: true,
  });

  if (!project) {
    return notFound();
  }

  const path = `/projects/${project.slug}`;
  return generateSEO({
    title: project.title,
    ...(!project.isProtected && {
      description: project.seoDescription || project.description || undefined,
    }),
    seoTitle: project.seoTitle ?? project.title,
    image:
      project.ogImage ||
      `https://comma.to/api/og/post?title=${project.title}&username=${user.username || user.name}${project.isProtected ? "&locked=true" : ""}`,
    icons: [
      `${process.env.NEXT_PUBLIC_URL}/api/og/favicon?username=${user.username}`,
    ],
    url: user.domain
      ? `https://${user.domain}${path}`
      : `https://${user.username}.${process.env.NEXT_PUBLIC_USER_DOMAIN}${path}`,
  });
}

export async function generateStaticParams({ params }: ProjectPageProps) {
  const domain = decodeURIComponent((await params).domain);
  const user = await getUserByDomain(domain);
  const projects = await getProjectsByAuthor(user?.id as string);

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug, domain: userDomain } = await params;
  const domain = decodeURIComponent(userDomain);
  const user = await getUserByDomain(domain);
  if (!user) {
    return notFound();
  }
  const project = await getProject({
    authorId: user.id,
    slug,
    published: true,
  });

  if (!project) {
    return notFound();
  }
  const Content = (
    <AppShell>
      <AppHeader
        title={project.title}
        className="flex-row items-center justify-normal gap-1  [&_.title]:text-xl"
      >
        {project.url && (
          <Link
            href={project.url}
            className="text-gray-4 hover:text-secondary transition-colors"
            target="_blank"
            aria-label={`Go to ${project.title}`}
          >
            <Icons.arrowUpRight size={18} />
          </Link>
        )}
      </AppHeader>
      <div className="w-full flex-1 text-sm text-gray-4 flex items-center justify-between mb-4">
        <p>{project.description}</p>
        <Badge className="text-secondary bg-inherit font-medium ">
          {project.year}
        </Badge>
      </div>
      <MDX source={project.content} />
    </AppShell>
  );

  if (project.isProtected) {
    return (
      <Protection project={project} user={user}>
        {Content}
      </Protection>
    );
  }

  return Content;
}
