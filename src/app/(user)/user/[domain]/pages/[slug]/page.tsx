import AppShell from "@/components/layout/app-shell";
import AppHeader from "@/components/layout/header";
import MDX from "@/components/markdown/mdx";
import { siteConfig } from "@/config/site";
import { getArticlesByAuthor } from "@/lib/fetchers/articles";
import { getBookmarksByAuthor } from "@/lib/fetchers/bookmarks";
import { getPage } from "@/lib/fetchers/pages";
import { getProjectsByAuthor } from "@/lib/fetchers/projects";
import {
  getUserByDomain,
  getWorkExperiencesByUser,
} from "@/lib/fetchers/users";
import { getJSONLDScript } from "@/lib/json-ld";
import {
  generateSEO,
  getJSONLD,
  getPostPageURL,
  getProjectOgImage,
  getUserFavicon,
  getUserPageURL,
} from "@/lib/utils";
import type { Metadata } from "next";
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
  const page = await getPage({
    authorId: user.id,
    slug,
    published: true,
  });

  if (!page) {
    return notFound();
  }

  const [url, ogImage, favicon] = [
    getPostPageURL("pages", page.slug, user),
    getProjectOgImage(page, user),
    getUserFavicon(user),
  ];
  return generateSEO({
    title: page.title,
    seoTitle: page.seoTitle ?? page.title,
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

export default async function Page({ params }: ProjectPageProps) {
  const { slug, domain: userDomain } = await params;
  const domain = decodeURIComponent(userDomain);
  const user = await getUserByDomain(domain);
  if (!user) {
    return notFound();
  }
  const page = await getPage({
    authorId: user.id,
    slug,
    published: true,
  });

  if (!page) {
    return notFound();
  }

  const url = getPostPageURL("pages", slug, user);

  const [articles, projects, bookmarks, experiences] = await Promise.all([
    getArticlesByAuthor(user.id),
    getProjectsByAuthor(user.id),
    getBookmarksByAuthor(user.id),
    getWorkExperiencesByUser(user.id),
  ]);

  const allData = { user, articles, projects, bookmarks, experiences };

  const Content = (
    <AppShell>
      <AppHeader
        className="flex-row items-center justify-normal mb-3  [&_.title]:text-xl"
        backButton={!page.content?.includes("::Navigation::")}
      />
      <MDX source={page.content} allData={allData} withSections />

      {getJSONLDScript(
        getJSONLD({
          type: "webPage",
          data: {
            "@type": "WebPage",
            "@id": url,
            url,
            name: page.title,
            description: page.seoDescription ?? undefined,
            image: page.ogImage ?? undefined,
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
          },
        }),
      )}
    </AppShell>
  );

  if (page.isProtected) {
    return (
      <Protection page={page} user={user}>
        {Content}
      </Protection>
    );
  }

  return Content;
}
