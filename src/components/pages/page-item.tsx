import type { Page } from "@prisma/client";
import { formatDistance } from "date-fns";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { Badge } from "../ui/badge";

interface Props {
  admin?: boolean;
  page: Page;
}

export default async function PageItem({ page, admin }: Props) {
  const isPublished = page.published;
  return (
    <div
      className="-mx-2
     flex min-h-5 max-md:h-auto relative group items-center justify-between rounded-md  p-2  text-sm transition-colors  hover:bg-gray-3 max-md:flex-col max-md:items-start"
    >
      <Link
        href={`/pages/${admin ? page.id : page.slug}`}
        aria-label={`${page.title}`}
        className="absolute left-0 top-0 size-full"
      />
      <div className="flex-1 flex gap-4 items-center max-md:multi-[flex-col;items-start;gap-2]">
        <div className="flex flex-col w-full">
          <Balancer>{page.title}</Balancer>
          {admin && (
            <p className="text-gray-4">
              Last updated{" "}
              {formatDistance(page.updatedAt, new Date(), { addSuffix: true })}
            </p>
          )}
        </div>
      </div>
      {admin && (
        <div className="flex max-md:mt-2 justify-end max-md:w-full ">
          <div className="flex items-center gap-1 z-10">
            <Link href={`/pages?published=${isPublished ? "true" : "false"}`}>
              <Badge className="h-4.4 flex gap-1 px-1 py-1  hover:bg-gray-2 font-normal">
                {isPublished
                  ? page.visibility === "visible"
                    ? "Public"
                    : "Unlisted"
                  : "Draft"}
              </Badge>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
