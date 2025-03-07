import { userPageConfig } from "@/config/user-page";
import { getArticlesByAuthor } from "@/lib/fetchers/articles";
import { getProjectsByAuthor } from "@/lib/fetchers/projects";
import { getUserByDomain } from "@/lib/fetchers/users";
import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const host = headersList.get("host")!;
  const url = `https://${host}`;
  const userDomain = `.${process.env.NEXT_PUBLIC_USER_DOMAIN!}`;

  if (host === `www.${process.env.NEXT_PUBLIC_APP_DOMAIN!}`) {
    return [
      {
        url,
        lastModified: new Date(),
      },
      {
        url: `${url}/explore`,
        lastModified: new Date(),
      },
      {
        url: `${url}/privacy`,
        lastModified: new Date(),
      },
      {
        url: `${url}/terms`,
        lastModified: new Date(),
      },
    ];
  }

  const domain = host.endsWith(userDomain) ? host.split(userDomain)[0] : host;
  const user = await getUserByDomain(domain);

  if (!user) {
    return notFound();
  }

  const pages = userPageConfig.pages.map((p) => ({
    url: `${url}${p.href === "/" ? "" : p.href}`,
    lastModified: new Date(),
  }));

  const [articles, projects] = await Promise.all([
    getArticlesByAuthor(user.id),
    getProjectsByAuthor(user.id),
  ]);

  const mappedArticles = articles.map((article) => ({
    url: `${url}/articles/${article.slug}`,
    lastModified: article.updatedAt,
  }));

  const mappedProjects = projects.map((project) => ({
    url: `${url}/projects/${project.slug}`,
    lastModified: project.updatedAt,
  }));

  return [...pages, ...mappedArticles, ...mappedProjects];
}
