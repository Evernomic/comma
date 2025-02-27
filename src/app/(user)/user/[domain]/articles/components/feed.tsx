"use client";

import NavButton from "@/components/layout/nav-button";
import { Icons } from "@/components/shared/icons";
import Button from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

const feeds = [
  {
    type: "rss",
    title: "RSS",
    href: "/feed",
  },
  {
    type: "atom",
    title: "Atom",
    href: "/feed?type=atom",
  },
] as const;

export default function Feed() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          aria-label="Subscribe newsletter or RSS feed"
          size="icon"
        >
          <Icons.rss size={15} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="items-center">Feed</DialogTitle>
        </DialogHeader>
        <div className="flex gap-2 justify-between">
          {feeds.map((feed) => (
            <NavButton
              href={feed.href}
              buttonVariant="secondary"
              iconSize={18}
              size="wide"
              className="w-full"
              buttonClassname="h-16 text-base"
              direction="ltr"
              icon="rss"
              key={feed.type}
            >
              {feed.title}
            </NavButton>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
