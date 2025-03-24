import MDX from "@/components/markdown/mdx";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn, getSectionTitle } from "@/lib/utils";
import type { User, UserPageSection } from "@/types";
import NewsletterForm from "../articles/components/newsletter-form";
import FeedMenu from "./feed-menu";
import { Icons } from "@/components/shared/icons";

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

export default function NewsletterFormModal({ user }: { user: User }) {
  const title = getSectionTitle(0, user.sections as UserPageSection[]);
  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "rounded-full text-sm gap-2",
        )}
        aria-label={title}
      >
       <Icons.plus size={20} /> Subscribe
      </DialogTrigger>
      <DialogContent className="p-4.5 pb-3 gap-0">
        <DialogHeader className="flex-col items-start gap-2">
          <DialogTitle>{title}</DialogTitle>
          {user.newsletterCta && (
            <MDX
              source={user.newsletterCta}
              className="text-gray-4! leading-4! text-sm"
            />
          )}
        </DialogHeader>
        <NewsletterForm
          username={user.username}
          className="flex-col *:w-full my-3"
        />
        <FeedMenu />
      </DialogContent>
    </Dialog>
  );
}
