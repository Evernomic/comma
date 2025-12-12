import AppShell from "@/components/layout/app-shell";
import AppHeader from "@/components/layout/header";
import NavButton from "@/components/layout/nav-button";
import MDX from "@/components/markdown/mdx";
import { siteConfig } from "@/config/site";
import { getArticle, getArticlesByAuthor } from "@/lib/fetchers/articles";
import { getUserByDomain } from "@/lib/fetchers/users";
import { getJSONLDScript } from "@/lib/json-ld";
import {
  cn,
  formatDate,
  generateSEO,
  getArticleOgImage,
  getJSONLD,
  getPersonSchema,
  getPostPageURL,
  getSectionProps,
  getUserFavicon,
  getUserPageURL,
} from "@/lib/utils";
import type { UserPageSection } from "@/types";
import { format } from "date-fns";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Newsletter from "../components/newsletter";

// export const revalidate = 1;
export const dynamic = "force-dynamic"

type PageParams = { slug: string; domain: string };
interface ArticlePageProps {
  params: Promise<PageParams>;
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

// export async function generateStaticParams({ params }: { params: PageParams }) {
//   const identifier = params.domain;
//   const domain = decodeURIComponent(identifier);
//   const user = await getUserByDomain(domain);
//   const articles = await getArticlesByAuthor(user?.id as string);

//   return articles.map((article) => ({
//     slug: article.slug,
//   }));
// }

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
        className={cn("gap-2 flex-col items-start mb-4 [&_.title]:text-xl", {
          "!gap-1": !!article.subTitle,
        })}
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
          {...getSectionProps(0, user.sections as UserPageSection[])}
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

      {getJSONLDScript(
        getJSONLD({
          type: "article",
          data: {
            "@type": "Article",
            url: getPostPageURL("articles", slug, user),
            headline: article.title,
            author: getPersonSchema(user),
            publisher: {
              "@type": "Organization",
              name: siteConfig.name,
              logo: {
                "@type": "ImageObject",
                url: siteConfig.ogImage,
              },
            },
            datePublished: format(article.publishedAt, "yyyy-MM-dd"),
          },
        }),
      )}
    </AppShell>
  );
}
