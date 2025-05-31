"use client";
import Button from "@/components/ui/button";
import { EmptyPlaceholder } from "@/components/ui/empty-placeholder";
import { Skeleton } from "@/components/ui/skeleton";
import type { AdSpot } from "@/lib/validations/admin";
import type { User as _User } from "@prisma/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import ky from "ky";
import { createSerializer, useQueryStates } from "nuqs";
import React from "react";
import { useDebounce } from "use-debounce";
import AdSpotItem from "./adspot";
import ExplorePageFilters from "./filters";
import { filterSearchParams } from "./searchParams";
import User from "./user";

export type ExplorePageUser = Pick<
  _User,
  "name" | "title" | "username" | "domain" | "image" | "category" | "location"
>;

export default function Client({ adspots }: { adspots: AdSpot[] }) {
  const [filters] = useQueryStates(filterSearchParams, { history: "push" });
  const debouncedFilters = useDebounce(filters, 250);
  const { status, data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["users", debouncedFilters],
      queryFn: async ({
        pageParam,
      }): Promise<{
        data: Array<ExplorePageUser>;
        previousId: number;
        nextId: number;
      }> => {
        const response = await ky(
          `/api/explore${createSerializer(filterSearchParams)({ ...filters, page: pageParam })}`,
        );
        return await response.json();
      },
      initialPageParam: 1,
      getPreviousPageParam: (firstPage) => firstPage.previousId,
      getNextPageParam: (lastPage) => lastPage.nextId,
    });

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
            {mix(page.data, adspots).map((item) => {
              if (isAdSpot(item)) {
                return <AdSpotItem adspot={item} key={item.id} />;
              }
              return <User user={item} key={item.username} />;
            })}
          </React.Fragment>
        ))}
        {!data?.pages.every((p) => p.data.length) && status !== "pending" && (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Title>No results</EmptyPlaceholder.Title>
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

type Mix = AdSpot | ExplorePageUser;

function isAdSpot(input: Mix): input is AdSpot {
  return (input as AdSpot).place !== undefined;
}
function mix(users: ExplorePageUser[], adspots: AdSpot[]) {
  const result: Mix[] = [...users];

  if (!adspots || adspots.length === 0) {
    return result;
  }

  adspots.map((ad, i) => {
    const insertIndex = (i + 1) * 5 + i;
    if (insertIndex <= result.length) {
      result.splice(insertIndex, 0, ad);
    }
  });

  return result;
}
