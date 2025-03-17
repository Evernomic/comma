"use client";
import Button from "@/components/ui/button";
import { EmptyPlaceholder } from "@/components/ui/empty-placeholder";
import { Skeleton } from "@/components/ui/skeleton";
import type { User as _User } from "@prisma/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import ky from "ky";
import { createSerializer, useQueryStates } from "nuqs";
import React from "react";
import { useDebounce } from "use-debounce";
import ExplorePageFilters from "./filters";
import { filterSearchParams } from "./searchParams";
import User from "./user";

export default function Client() {
  const [filters] = useQueryStates(filterSearchParams, { history: "push" });
  const debouncedFilters = useDebounce(filters, 250);
  const { status, data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["users", debouncedFilters],
      queryFn: async ({
        pageParam,
      }): Promise<{
        data: Array<
          Pick<
            _User,
            | "name"
            | "title"
            | "username"
            | "domain"
            | "image"
            | "category"
            | "location"
          >
        >;
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
            {page.data.map((user) => (
              <User user={user} key={user.username} />
            ))}
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
