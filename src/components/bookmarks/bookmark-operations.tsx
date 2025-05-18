"use client";
import type { Collection } from "@prisma/client";
import { useRouter } from "next/navigation";
import { type FormEvent, useState, useTransition } from "react";
import { Icons } from "../shared/icons";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import Button from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { toast } from "../ui/use-toast";
import AddEditBookmarkModal, { type Bookmark } from "./add-edit-bookmark-modal";
import { Pin, PinOff } from "lucide-react";

interface Props {
  bookmark: Bookmark;
  collections?: Collection[];
}

async function deleteBookmark(bookmarkId: string) {
  const response = await fetch(`/api/bookmarks/${bookmarkId}`, {
    method: "DELETE",
  });

  if (!response?.ok) {
    toast({
      title: "Something went wrong.",
      description: "Your post was not deleted. Please try again.",
    });
  }

  return true;
}



async function togglePinBookmark(bookmark: Bookmark) {
  const {id, ...rest} = bookmark
  const response = await fetch(`/api/bookmarks/${bookmark.id}`, {
    method: "PATCH",
    body: JSON.stringify({
      ...rest,
      isPinned: !bookmark.isPinned,
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
export default function BookmarkOperations({ bookmark, collections }: Props) {
  const [showBookmarkOperations, setShowBookmarkOperations] =
    useState<boolean>(false);

  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  const [isDeleting, startDeletingTransition] = useTransition()
  const [isPending, startTransition] = useTransition()
  const router = useRouter();

  return (
    <>
      <DropdownMenu
        modal={false}
        open={showBookmarkOperations}
        onOpenChange={setShowBookmarkOperations}
      >
        <DropdownMenuTrigger aria-label="Bookmark Operations" asChild>
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
                const res = await togglePinBookmark(bookmark)
                if(res) {
                  router.refresh();
                 toast({title: "Saved"})
                }

              })
            }}
            >
           {(!isPending) ? ( bookmark.isPinned ? <><PinOff size={15} /> Unpin</> : <><Pin size={15} /> Pin</>) : <><Icons.spinner className="animate-spin" size={15} /> {bookmark.isPinned ? "Unpinning" : "Pinning"}</>} 
          </Button>
          <AddEditBookmarkModal
            bookmark={bookmark}
            collections={collections}
            edit
            closeBookmarkOperations={() => setShowBookmarkOperations(false)}
          />
          <Button
            size="sm"
            variant="destructive"
            className="justify-start gap-2 border-0 bg-transparent text-gray-4 hover:bg-danger hover:text-primary"
            onClick={() => setShowDeleteAlert(true)}
          >
            <Icons.trash size={15} /> Delete
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this bookmark?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              title="Cancel"
              variant="ghost"
              size="sm"
              disabled={isDeleting}
              onClick={() => setShowDeleteAlert(false)}
            />

            <Button
              variant="destructive"
              size="sm"
              onClick={async (e: FormEvent) => {
                e.preventDefault();
                startDeletingTransition(async () => {

                  const deleted = await deleteBookmark(bookmark.id);
                  if (deleted) {
                    setShowDeleteAlert(false);
                    router.refresh();
                  }
                })
              }}
              isPending={isDeleting}
            >
              <Icons.trash size={15} /> Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
