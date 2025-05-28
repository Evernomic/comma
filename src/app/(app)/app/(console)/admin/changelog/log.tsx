import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { Changelog } from "@prisma/client";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

interface Props {
  admin?: boolean;
  log: Pick<
    Changelog,
    "id" | "slug" | "title" | "createdAt" | "published" | "publishedAt"
  >;
}

export default async function Log({ log, admin }: Props) {
  const isPublished = log.published;
  return (
    <div
      className="-mx-2
     flex min-h-5 max-md:h-auto relative group items-center justify-between rounded-md  p-2  text-sm transition-colors  hover:bg-gray-3 max-md:flex-col max-md:items-start"
    >
      <Link
        href={`/admin/changelog/${admin ? log.id : log.slug}`}
        aria-label={`${log.title}`}
        className="absolute left-0 top-0 size-full"
      />
      <div className="flex-1 flex gap-4 items-center max-md:multi-[flex-col;items-start;gap-2]">
        <div className="flex flex-col w-full">
          <Balancer>{log.title}</Balancer>
          <p className="text-gray-4">{formatDate(log.publishedAt)}</p>
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
          </div>
        </div>
      )}
    </div>
  );
}
