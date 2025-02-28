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
import NewsletterForm from "./newsletter-form";
import { User } from "@prisma/client";

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

export default function Feed({username}: {username: string}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showNewsletterForm, setShowNewsletterForm] = useState<boolean>(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          aria-label="Subscribe newsletter or RSS feed"
          size="icon"
        >
          <Icons.plus size={15} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="items-center">Feed</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-2 max-md:grid-cols-1">
          {feeds.map((feed) => (
            <NavButton
              href={feed.href}
              buttonVariant="secondary"
              iconSize={18}
              size="wide"
              className="w-full"
              buttonClassname="h-16 text-base gap-2"
              direction="ltr"
              icon="rss"
              key={feed.type}
            >
              {feed.title}
            </NavButton>
          ))}
          <Button
              onClick={() => setShowNewsletterForm(prev => !prev)}
              variant="secondary"
              size="wide"
              className="w-full gap-2 h-16 text-base "
            >
            <Icons.mail size={18} />  Email
            </Button>
        </div>
        {showNewsletterForm && <NewsletterForm username={username} prefix="feed-subscribe"/>}
      </DialogContent>
    </Dialog>
  );
}
