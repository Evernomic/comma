"use client";

import { Icons } from "@/components/shared/icons";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { User } from "@/types";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import NewsletterForm from "../articles/components/newsletter-form";
import Feed from "./feed";

export default function NewsletterFormModal({
  user,
  title,
  children,
}: {
  user: User;
  title: string;
  children?: React.ReactNode;
}) {
  const defaultOpen = useSearchParams().get("open") === "newsletter";
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "rounded-full text-sm gap-2 px-2 flex-1",
        )}
        aria-label={title}
      >
        {user.newsletter ? (
          <>
            <Icons.plus size={20} /> Subscribe
          </>
        ) : (
          <>
            <Icons.rss size={18} /> Feed
          </>
        )}
      </DialogTrigger>
      <DialogContent className="p-4.5 pb-3 gap-0">
        <DialogHeader className="flex-col items-start gap-1">
          <DialogTitle>{user.newsletter ? title : "Feed"}</DialogTitle>
          {children}
        </DialogHeader>

        {user.newsletter && (
          <NewsletterForm
            username={user.username}
            prefix="newsletter-form"
            className="flex-col *:w-full [&_button]:flex-auto my-3"
          />
        )}
        <Feed />
      </DialogContent>
    </Dialog>
  );
}
