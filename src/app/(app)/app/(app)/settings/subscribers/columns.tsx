"use client";

import { Icons } from "@/components/shared/icons";
import Button from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Subscriber } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import DeleteSubscriber from "./delete-subscriber";

export const columns: ColumnDef<Subscriber>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => {
      const isAsc = column.getIsSorted() === "asc";
      const Icon = Icons[isAsc ? "chevronUp" : "chevronDown"];
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => column.toggleSorting(isAsc)}
        >
          Email
          <Icon size={18} />
        </Button>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      const isAsc = column.getIsSorted() === "asc";
      const Icon = Icons[isAsc ? "chevronUp" : "chevronDown"];

      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => column.toggleSorting(isAsc)}
        >
          Subscribed
          <Icon size={18} />
        </Button>
      );
    },
    cell: ({ row }) => {
      const subscribedAt = row.getValue("createdAt") as Date;

      const formatted = subscribedAt.toLocaleDateString("en-US", {
        hour: "2-digit",
        minute: "numeric",
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      return formatted;
    },
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      const subscriber = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Icons.more size={18} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <DeleteSubscriber id={subscriber.id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
