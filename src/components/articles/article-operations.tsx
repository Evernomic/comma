"use client";
import type { Article as _Article } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Icons } from "../shared/icons";
import Button from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { toast } from "../ui/use-toast";
import { Pin, PinOff } from "lucide-react";


type Article = Pick<_Article, "isPinned" | "id">

interface Props {
  article: Article
}

async function togglePinArticle(article: Article) {
  const response = await fetch(`/api/articles/${article.id}`, {
    method: "PATCH",
    body: JSON.stringify({
      isPinned: !article.isPinned,
    })
  });

  if (!response?.ok) {
    toast({
      title: "Something went wrong.",
      description: "Please try again.",
    });
  }

  return true;
}
export default function ArticleOperations({ article }: Props) {
  const [showArticleOperations, setShowArticleOperations] =
    useState<boolean>(false);

  const [isPending, startTransition] = useTransition()
  const router = useRouter();

  return (
      <DropdownMenu
        modal={false}
        open={showArticleOperations}
        onOpenChange={setShowArticleOperations}
      >
        <DropdownMenuTrigger aria-label="Article Operations" asChild>
          <Button
            size="icon"
            variant="ghost"
            className="size-4.4 data-[state=open]:bg-gray-2 data-[state=open]:text-secondary"
          >
            <Icons.more size={15} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
                  
          <Button
            size="sm"
            variant="ghost"
            disabled={isPending}
            className="justify-start gap-2"
            onClick={async () => {
              startTransition(async() => {
                const res = await togglePinArticle(article)
                if(res) {
                  router.refresh();
                 toast({title: "Saved"})
                }

              })
            }}
            >
           {(!isPending) ? ( article.isPinned ? <><PinOff size={15} /> Unpin</> : <><Pin size={15} /> Pin</>) : <><Icons.spinner className="animate-spin" size={15} /> {article.isPinned ? "Unpinning" : "Pinning"}</>} 
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
  );
}
