import Article from "@/components/articles/article";
import NoArticlesPlaceholder from "@/components/articles/no-articles-placeholder";
import AppShell from "@/components/layout/app-shell";
import AppHeader from "@/components/layout/header";
import { getArticlesByAuthor } from "@/lib/fetchers/articles";
import { getUserByDomain } from "@/lib/fetchers/users";
import { notFound } from "next/navigation";

interface TagPageProps {
  params: Promise<{
    domain: string;
    tagName: string;
  }>;
}

export default async function TagPage({ params }: TagPageProps) {
  const param = await params;
  const domain = decodeURIComponent(param.domain);
  const user = await getUserByDomain(domain);
  if (!user) {
    return notFound();
  }

  const articles = await getArticlesByAuthor(
    user.id,
    undefined,
    true,
    param.tagName,
  );

  return (
    <AppShell>
      <AppHeader title={`#${param.tagName}`} />
      <div>
        {articles.map((article) => (
          <Article article={article} key={article.id} />
        ))}
        {!articles.length && <NoArticlesPlaceholder />}
      </div>
    </AppShell>
  );
}
