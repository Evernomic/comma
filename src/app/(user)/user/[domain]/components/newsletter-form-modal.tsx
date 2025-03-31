import MDX from "@/components/markdown/mdx";
import { Icons } from "@/components/shared/icons";
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
import Feed from "./feed";
import { useId } from "react";

export default function NewsletterFormModal({ user }: { user: User }) {
  const title = getSectionTitle(0, user.sections as UserPageSection[]);
  return (
    <Dialog>
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
          {user.newsletterCta && user.newsletter && (
            <MDX source={user.newsletterCta} className="text-gray-4! text-sm" />
          )}
        </DialogHeader>
        {user.newsletter && (
          <NewsletterForm
            username={user.username}
            prefix={useId()}
            className="flex-col *:w-full [&_button]:flex-auto my-3"
          />
        )}
        <Feed />
      </DialogContent>
    </Dialog>
  );
}
