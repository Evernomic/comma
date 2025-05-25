import { calloutCategories } from "@/lib/constants";
import type { Article, Callout, Project } from "@prisma/client";
import Link from "next/link";
import { Icons } from "../shared/icons";
import { Badge } from "../ui/badge";
import Button from "../ui/button";
import CalloutOperations from "./callout-operations";

interface Props {
  callout: Callout;
  admin?: boolean;
  children?: React.ReactNode;
  articles?: Article[];
  projects?: Project[];
}

export default function Callout({
  callout,
  children,
  admin,
  articles,
  projects,
}: Props) {
  return (
    <div className="-mx-2 flex min-h-5 max-md:h-auto relative group items-center justify-between rounded-md  p-2 text-sm transition-colors  hover:bg-gray-3 max-md:flex-col max-md:items-start">
      <div className="flex-1 flex gap-4 items-center max-md:flex-col max-md:items-baseline max-md:gap-1">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {callout.url ? (
              <Link
                href={callout.url}
                className="flex gap-1 hover:custom-underline"
                target="_blank"
              >
                {callout.title} <Icons.arrowUpRight size={14} />
              </Link>
            ) : (
              callout.title
            )}
            <Badge className=" h-4 flex gap-1 px-1 py-1 font-normal">
              {
                calloutCategories.find((c) => c.value === callout.category)
                  ?.title
              }
            </Badge>
          </div>

          {callout.description && (
            <p className="text-gray-4 text-sm">{callout.description}</p>
          )}
        </div>
      </div>
      <div className="flex max-md:mt-2 gap-2 justify-end max-md:w-full ">
        {!admin && callout.relatedPostURL && (
          <Link href={callout.relatedPostURL} target="_blank">
            <Button variant="secondary" size="sm" className="ml-2">
              Details
              <Icons.arrowUpRight size={15} />
            </Button>
          </Link>
        )}
        {admin && (
          <>
            {articles && projects && (
              <CalloutOperations
                articles={articles}
                projects={projects}
                callout={callout}
              />
            )}
          </>
        )}
      </div>
      {children}
    </div>
  );
}
