import Article from "@/components/articles/article";
import { Icons } from "@/components/shared/icons";
import { getArticlesByAuthor } from "@/lib/fetchers/articles";
import type { User } from "@/types";
import Link from "next/link";

export default async function Articles({ user }: { user: User }) {
  const articles = await getArticlesByAuthor(user.id, 5);

  if (!articles.length) {
    return null;
  }
  return (
    <dl className="section-container">
      <Link href="/articles" aria-label="View All Articles">
        <dt className="section-title link group">
          <h3>Articles</h3>
          <Icons.arrowRight
            size={16}
            className="text-gray-4 group-hover:text-secondary"
          />
        </dt>
      </Link>

      <dd className="section-content">
        {articles.map((article) => (
          <Article article={article} key={article.id} />
        ))}
      </dd>
    </dl>
  );
}
