import Article from "@/components/articles/article";
import { Icons } from "@/components/shared/icons";
import { cn } from "@/lib/utils";
import type { Article as _Article } from "@prisma/client";
import Link from "next/link";

export default async function Articles({
  title,
  articles,
}: {
  title: string;
  articles: _Article[];
}) {
  if (!articles.length) {
    return null;
  }

  const hasMore = articles.length > 5
  return (
    <dl className="section-container not-prose">
      <dt className={cn("section-title group", hasMore && "link" )}>
        {hasMore ? (
          <Link
            href="/articles"
            className="absolute w-full h-full"
            aria-label="View All Articles"
          />
        ): null}
        <h3>{title}</h3>
        <Icons.arrowRight
          size={16}
          className={cn("text-gray-4 group-hover:text-secondary hidden", hasMore && "block")}
        />
      </dt>
      <dd className="section-content">
        {articles.map((article) => (
          <Article article={article} key={article.id} />
        ))}
      </dd>
    </dl>
  );
}
