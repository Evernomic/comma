"use client";
import NavButton from "@/components/layout/nav-button";
import { Icons } from "@/components/shared/icons";
import Button from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

export default function FeedMenu({ noPopover }: { noPopover?: boolean }) {
  if (noPopover) {
    return (
      <div className="flex gap-1 w-full mt-3 pb-3">
        {feeds.map((feed) => (
          <NavButton
            href={feed.href}
            buttonVariant="secondary"
            buttonClassname="gap-2 h-12"
            className="w-full"
            size="wide"
            target="_blank"
            key={feed.type}
          >
            <Icons.rss size={18} /> {feed.title}
          </NavButton>
        ))}
      </div>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost" className="self-end">
          <Icons.rss size={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex gap-1">
          {feeds.map((feed) => (
            <NavButton
              href={feed.href}
              buttonVariant="ghost"
              target="_blank"
              key={feed.type}
            >
              {feed.title}
            </NavButton>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
