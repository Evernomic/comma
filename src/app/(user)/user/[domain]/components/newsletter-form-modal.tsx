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
import { useEffect, useState } from "react";
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
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    function handleHashChange() {
      if (window.location.hash === "#newsletter") {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    }

    handleHashChange();

    const abortController = new AbortController();

    window.addEventListener("hashchange", handleHashChange, {
      signal: abortController.signal,
    });

    return () => abortController.abort();
  }, []);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(val) => {
        setIsOpen(val);
        window.history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search,
        );
      }}
    >
      <DialogTrigger
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "rounded-full w-max py-2 text-sm gap-2 px-3 flex-1",
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
