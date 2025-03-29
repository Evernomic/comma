import { formatDate } from "@/lib/utils";
import type { Article as ArticleType } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { AnalyticsBadge } from "../analytics/analytics-badge";
import { Badge } from "../ui/badge";
interface Props {
  admin?: boolean;
  article: Pick<
    ArticleType,
    | "id"
    | "slug"
    | "title"
    | "createdAt"
    | "views"
    | "published"
    | "publishedAt"
    | "image"
  >;
}

export default async function Article({ article, admin }: Props) {
  const isPublished = article.published;
  return (
    <div
      className="-mx-2
     flex min-h-5 max-md:h-auto relative group items-center justify-between rounded-md  p-2  text-sm transition-colors  hover:bg-gray-3 max-md:flex-col max-md:items-start"
    >
      <Link
        href={`/articles/${admin ? article.id : article.slug}`}
        aria-label={`${article.title}`}
        className="absolute left-0 top-0 size-full"
      />
      <div className="flex-1 flex gap-4 items-center max-md:multi-[flex-col;items-start;gap-2]">
        {article.image && (
          <Image
            width={20}
            height={20}
            src={article.image}
            alt="Article icon"
          />
        )}
        <div className="flex flex-col w-full">
          <Balancer>{article.title}</Balancer>
          <p className="text-gray-4">{formatDate(article.publishedAt)}</p>
        </div>
      </div>
      {admin && (
        <div className="flex max-md:mt-2 justify-end max-md:w-full ">
          <div className="flex items-center gap-1 z-10">
            <Link
              href={`/articles?published=${isPublished ? "true" : "false"}`}
            >
              <Badge className="h-4.4 flex gap-1 px-1 py-1  hover:bg-gray-2 font-normal">
                {isPublished ? "Public" : "Draft"}
              </Badge>
            </Link>
            <AnalyticsBadge
              href={`/articles/${article.id}/analytics`}
              value={article.views}
              published={article.published}
              index="views"
            />
          </div>
        </div>
      )}
    </div>
  );
}
