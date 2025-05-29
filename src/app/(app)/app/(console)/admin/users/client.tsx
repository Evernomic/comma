"use client";
import Button from "@/components/ui/button";
import type { User as _User } from "@prisma/client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ky from "ky";
import { createSerializer, useQueryStates } from "nuqs";
import { useDebounce } from "use-debounce";

import User from "@/app/(home)/explore/user";
import { Icons } from "@/components/shared/icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistance } from "date-fns";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Actions from "./actions";
import UserFilters from "./filters";
import { filterSearchParams } from "./searchParams";

export type User = _User & {
  articles: {
    views: number;
  };
  projects: {
    views: number;
  };
  bookmarks: {
    clicks: number;
  };
};

export default function Client() {
  const [filters, setFilters] = useQueryStates(filterSearchParams, {
    history: "push",
  });
  const debouncedFilters = useDebounce(filters, 250);
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["users", debouncedFilters],
    queryFn: async (): Promise<{
      data: Array<User>;
      previousId: number;
      nextId: number | null;
      maxPage: number;
    }> => {
      const response = await ky(
        `/api/admin/users${createSerializer(filterSearchParams)(filters)}`,
      );
      return await response.json();
    },
    placeholderData: keepPreviousData,
  });

  return (
    <div className="space-y-5 relative">
      <UserFilters />
      <div className="flex justify-end items-center gap-2">
        {isFetching && (
          <span className="text-gray-4 flex items-center gap-2 mr-2 text-sm">
            <Icons.spinner size={15} className="animate-spin" /> Loading
          </span>
        )}
        <span className="text-gray-4 text-sm font-medium mr-2">
          {filters.page} of {data?.maxPage ?? 0}
        </span>
        <Button
          variant="secondary"
          size="icon"
          disabled={filters.page === 1}
          onClick={() => setFilters({ page: filters.page - 1 })}
        >
          <ArrowLeft size={15} />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          disabled={!data?.nextId}
          onClick={() => setFilters({ page: filters.page + 1 })}
        >
          <ArrowRight size={15} />
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="max-w-[200px] ">Name</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Joined</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.data.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="max-w-[200px] flex gap-2  truncate">
                  {user.image ? (
                    <Image
                      src={user.image}
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="rounded-full size-4 max-base:hidden"
                      alt={`${user.username}'s avatar`}
                    />
                  ) : (
                    <span className="size-4 bg-gray-2 rounded-full text-gray-4 flex items-center justify-center">
                      <Icons.user size={18} />
                    </span>
                  )}
                  {user.name}
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="text-right">
                  {formatDistance(user.createdAt, new Date(), {
                    addSuffix: true,
                  })}
                </TableCell>
                <TableCell className="flex justify-end">
                  <Actions user={user} refetch={() => refetch()} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {isFetching && (
        <div className="w-full  flex justify-center items-center">
          <Icons.spinner size={20} className="text-gray-4 animate-spin" />
        </div>
      )}
    </div>
  );
}
