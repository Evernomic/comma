import NavButton from "@/components/layout/nav-button";
import { Icons } from "@/components/shared/icons";
import { formatDate, getDate } from "@/lib/utils";
import type { Article } from "@prisma/client";
import { useRouter } from "next/navigation";
import { type SetStateAction, useState } from "react";
import type { EditorPageProps, Post } from ".";
import Button from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

import { toast } from "../../ui/use-toast";

export default function PublishButton({
  post,
  type,
  user,
  setSaving,
}: EditorPageProps & {
  setSaving: React.Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();

  return (
    <div className="flex items-center border border-gray-2 rounded-md overflow-hidden">
      <Button
        title={post.published ? "Unpublish" : "Publish"}
        size="sm"
        variant="ghost"
        className="rounded-none"
        aria-label={`${post.published ? "Unpublish" : "Publish"}`}
        onClick={async () => {
          setSaving(true);
          const res = await fetch(`/api/${type}/${post.id}`, {
            method: "PATCH",
            body: JSON.stringify({
              published: !post.published,
              ...(!post.published &&
                type === "articles" && {
                  publishedAt: getDate(),
                }),
            }),
          });
          setSaving(false);

          if (!res.ok) {
            const error = await res.text();
            return toast({
              title: "Something went wrong.",
              description: error,
            });
          }
          router.refresh();
          return toast({
            title: post.published ? "Unpublished" : "Published",
          });
        }}
      />
      {type === "articles" && user.newsletter && isArticle(post) && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="border-l border-gray-2 rounded-none data-[state=open]:bg-gray-3"
              aria-label="Send newsletter"
            >
              <Icons.chevronDown size={15} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {/* <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="ghost"
                    disabled={!post.published || isLoading}
                    className="justify-start gap-2"
                    onClick={async () => {
                      setIsLoading(true);
                      const res = await fetch(
                        `/api/${type}/${post.id}/newsletter`,
                        {
                          method: "POST",
                        },
                      );
                      setIsLoading(false);

                      if (!res.ok) {
                        const err = await res.text();
                        return toast({
                          title: "Something went wrong.",
                          description: err,
                        });
                      }
                      router.refresh();
                      return toast({
                        title: "Sent",
                      });
                    }}
                  >
                    {!isLoading ? (
                      <>
                        <Icons.send size={15} />
                        Send newsletter
                      </>
                    ) : (
                      <>
                        <Icons.spinner size={15} className="animate-spin" />
                        Sending...
                      </>
                    )}
                  </Button>
                </TooltipTrigger>
                {!post.published && (
                  <TooltipContent>
                    You must publish this article to send newsletter
                  </TooltipContent>
                )}
                {post.published && !!post.lastNewsletterSentAt && (
                  <TooltipContent>
                    Last sent on {formatDate(post.lastNewsletterSentAt as Date)}
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider> */}
            <NavButton
              href="/settings/subscribers"
              buttonVariant="ghost"
              buttonClassname="gap-2"
              direction="ltr"
              icon="mail"
            >
              Manage subscribers
            </NavButton>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}

function isArticle(post: Post): post is Article {
  return (post as Article).lastNewsletterSentAt !== undefined;
}
