import Article from "@/components/articles/article";
import { Icons } from "@/components/shared/icons";
import type { Article as _Article } from "@prisma/client";
import Link from "next/link";

export default async function Articles({
  title,
  articles,
}: {
  title: string;
  articles: _Article[],
}) {

  if (!articles.length) {
    return null;
  }
  return (
    <dl className="section-container">
      <dt className="section-title link group">
        <Link
          href="/articles"
          className="absolute w-full h-full"
          aria-label="View All Articles"
        />
        <h3>{title}</h3>
        <Icons.arrowRight
          size={16}
          className="text-gray-4 group-hover:text-secondary"
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
