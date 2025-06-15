import AppShell from "@/components/layout/app-shell";
import AppHeader from "@/components/layout/header";
import NavButton from "@/components/layout/nav-button";
import MDX from "@/components/markdown/mdx";
import { getArticle, getArticlesByAuthor } from "@/lib/fetchers/articles";
import { getUserByDomain } from "@/lib/fetchers/users";
import {
  formatDate,
  generateSEO,
  getArticleOgImage,
  getSectionTitle,
  getUserFavicon,
  getUserPageURL,
} from "@/lib/utils";
import { UserPageSection } from "@/types";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Newsletter from "../components/newsletter";

export const revalidate = 5;

interface ArticlePageProps {
  params: Promise<{ slug: string; domain: string }>;
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata | null> {
  const { slug, domain: userDomain } = await params;

  const domain = decodeURIComponent(userDomain);
  const user = await getUserByDomain(domain);
  if (!user) {
    return notFound();
  }

  const article = await getArticle({
    authorId: user.id,
    slug,
    published: true,
  });

  if (!article) {
    return notFound();
  }

  const [url, ogImage, favicon] = [
    getUserPageURL(user),
    getArticleOgImage(article, user),
    getUserFavicon(user),
  ];
  return generateSEO({
    title: article.title,
    seoTitle: article.seoTitle ?? article.title,
    description: article.seoDescription || undefined,
    image: ogImage,
    icons: [favicon],
    canonicalURL: article.canonicalURL || undefined,
    url,
  });
}

export async function generateStaticParams({ params }: ArticlePageProps) {
  const domain = decodeURIComponent((await params).domain);
  const user = await getUserByDomain(domain);
  const articles = await getArticlesByAuthor(user?.id as string);

  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug, domain: userDomain } = await params;

  const domain = decodeURIComponent(userDomain);
  const user = await getUserByDomain(domain);
  if (!user) {
    return notFound();
  }
  const article = await getArticle({
    authorId: user.id,
    slug,
    published: true,
  });

  if (!article) {
    return notFound();
  }
  return (
    <AppShell>
      <AppHeader
        title={article?.title as string}
        className="gap-1 flex-col items-start mb-4 [&_.title]:text-xl"
      >
        <div className="w-full flex-col flex gap-3 text-sm text-gray-4">
          {article.subTitle && <p className="text-base">{article.subTitle}</p>}
          <p>{formatDate(article.publishedAt)}</p>
        </div>
      </AppHeader>
      <MDX source={article.content} />
      {article.tags.length > 0 ? (
        <div className="text-gray-4 flex items-center gap-2 mt-5">
          {article.tags.map((tag) => (
            <Link
              href={`/articles/tags/${tag}`}
              className="transition-colors hover:text-secondary"
              key={tag}
            >
              {`#${tag}`}
            </Link>
          ))}
        </div>
      ) : null}
      <div className="mt-5">
        <Newsletter
          title={getSectionTitle(0, user.sections as UserPageSection[])}
          user={user}
        />
      </div>
      <div className="mt-5 flex justify-between items-center">
        {article?.previousArticle && (
          <NavButton
            variant="text"
            direction="ltr"
            href={`/articles/${article.previousArticle.slug}`}
            icon="arrowLeft"
            aria-label="Read previous article"
          >
            Previous
          </NavButton>
        )}
        {article?.nextArticle && (
          <NavButton
            variant="text"
            href={`/articles/${article.nextArticle.slug}`}
            icon="arrowRight"
            aria-label="Read next article"
          >
            Next
          </NavButton>
        )}
      </div>
    </AppShell>
  );
}
