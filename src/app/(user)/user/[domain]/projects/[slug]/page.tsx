import AppShell from "@/components/layout/app-shell";
import AppHeader from "@/components/layout/header";
import MDX from "@/components/markdown/mdx";
import { Icons } from "@/components/shared/icons";
import { siteConfig } from "@/config/site";
import { getProject, getProjectsByAuthor } from "@/lib/fetchers/projects";
import { getUserByDomain } from "@/lib/fetchers/users";
import { getJSONLDScript } from "@/lib/json-ld";
import {
  generateSEO,
  getJSONLD,
  getPostPageURL,
  getProjectOgImage,
  getUserFavicon,
  getUserPageURL,
} from "@/lib/utils";
import { format } from "date-fns";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Protection from "./protection";
import type { Social } from "@/types";

export const revalidate = 5;

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

  const [url, ogImage, favicon] = [
    getPostPageURL("projects", project.slug, user),
    getProjectOgImage(project, user),
    getUserFavicon(user),
  ];
  return generateSEO({
    title: project.title,
    ...(!project.isProtected && {
      description: project.seoDescription || project.description || undefined,
    }),
    seoTitle: project.seoTitle ?? project.title,
    image: ogImage,
    icons: [favicon],
    url,
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
        titleAsChild={!!project.url}
      >
        {project.url && (
          <Link
            href={project.url}
            target="_blank"
            aria-label={`Go to ${project.title}`}
            className="group flex gap-1 title text-lg font-medium "
          >
            {project.title}{" "}
            <Icons.arrowUpRight
              className="group-hover:multi-['-translate-y-0.5;translate-x-0.5'] transition"
              size={18}
            />
          </Link>
        )}
      </AppHeader>
      <div className="w-full flex-1 text-sm text-gray-4 flex items-center justify-between mb-4">
        <p>{project.description}</p>
        <p className="text-gray-4 text-sm font-medium ">{project.year}</p>
      </div>
      <MDX source={project.content} />

      {getJSONLDScript(
        getJSONLD({
          type: "article",
          data: {
            "@type": "Article",
            url: getPostPageURL("projects", slug, user),
            headline: project.title,
            author: {
              "@type": "Person",
              name: user.name ?? user.username,
              url: getUserPageURL(user),
              image: getUserFavicon(user),
              sameAs: (user.links as Array<Social>).map((link) => link.url),
              jobTitle: user.title ?? user.category ?? undefined,
            },
            publisher: {
              "@type": "Organization",
              name: siteConfig.name,
              logo: {
                "@type": "ImageObject",
                url: siteConfig.ogImage,
              },
            },
            datePublished: format(project.createdAt, "yyyy-MM-dd"),
          },
        }),
      )}
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
