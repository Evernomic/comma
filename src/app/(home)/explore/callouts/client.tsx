"use client";
import Callout from "@/components/callouts/callout";
import { Icons } from "@/components/shared/icons";
import Button from "@/components/ui/button";
import { EmptyPlaceholder } from "@/components/ui/empty-placeholder";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip } from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";
import { siteConfig } from "@/config/site";
import type { Callout as _Callout } from "@prisma/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import ky from "ky";
import { createSerializer, useQueryStates } from "nuqs";
import React, { useState } from "react";
import { useDebounce } from "use-debounce";
import ExplorePageFilters from "./filters";
import { filterSearchParams } from "./searchParams";

export type Data = _Callout & {
  user: {
    username: string;
    domain: string;
  };
};

export default function Client() {
  const [filters] = useQueryStates(filterSearchParams, { history: "push" });
  const debouncedFilters = useDebounce(filters, 250);
  const [isPending, setIsPending] = useState<string | null>(null);

  const { status, data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["users", debouncedFilters],
      queryFn: async ({
        pageParam,
      }): Promise<{
        data: Array<Data>;
        previousId: number;
        nextId: number;
      }> => {
        const response = await ky(
          `/api/explore/callouts${createSerializer(filterSearchParams)({ ...filters, page: pageParam })}`,
        );
        return await response.json();
      },
      initialPageParam: 1,
      getPreviousPageParam: (firstPage) => firstPage.previousId,
      getNextPageParam: (lastPage) => lastPage.nextId,
    });

  async function apply(calloutId: string) {
    const res = await fetch(`/api/explore/callouts/${calloutId}/apply`, {
      method: "POST",
    });

    if (res.status === 401) {
      window.location.href = siteConfig.links.signup;
    }

    return res.ok;
  }

  return (
    <div className="space-y-5">
      <ExplorePageFilters />
      <div className="space-y-2">
        {status === "pending" &&
          Array.from({ length: 10 })
            .fill(true)
            .map((_, i) => <Skeleton className="h-[90px] -mx-4" key={i} />)}
      </div>

      <div>
        {data?.pages.map((page) => (
          <React.Fragment key={page.nextId}>
            {page.data.map((callout) => (
              <Callout callout={callout} key={callout.id}>
                <Tooltip
                  text="Make sure you are registered in Comma."
                  delayDuration={0}
                >
                  <Button
                    variant="primary"
                    size="sm"
                    disabled={isPending === callout.id}
                    onClick={async () => {
                      setIsPending(callout.id);
                      const isApplied = await apply(callout.id);
                      setIsPending(null);
                      if (isApplied) {
                        toast({
                          title: "Applied",
                          description:
                            "An email has been sent to the person who called regarding your application.",
                        });
                      }
                    }}
                  >
                    {isPending === callout.id ? (
                      <>
                        <Icons.spinner size={15} className="animate-spin" />{" "}
                        Applying
                      </>
                    ) : (
                      "Apply"
                    )}
                  </Button>
                </Tooltip>
              </Callout>
            ))}
          </React.Fragment>
        ))}
        {!data?.pages.every((p) => p.data.length) && status !== "pending" && (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Title>No callouts yet</EmptyPlaceholder.Title>
          </EmptyPlaceholder>
        )}
      </div>
      {hasNextPage && (
        <Button
          variant="secondary"
          disabled={!hasNextPage || isFetchingNextPage}
          className="w-full"
          isPending={isFetchingNextPage}
          onClick={() => fetchNextPage()}
        >
          Load more
        </Button>
      )}
    </div>
  );
}
