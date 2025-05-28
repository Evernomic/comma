"use client";

import { Icons } from "@/components/shared/icons";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Button from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { type FormEvent, useState, useTransition } from "react";

import { toast } from "@/components/ui/use-toast";
import type { User } from "./client";

interface Props {
  user: User;
  refetch: () => void;
}

async function deleteUser(id: string) {
  const response = await fetch(`/api/admin/users/${id}`, {
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

export default function Actions({ user, refetch }: Props) {
  const [showActions, setShowActions] = useState<boolean>(false);

  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  const [isDeleting, startDeletingTransition] = useTransition();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <>
      <DropdownMenu
        modal={false}
        open={showActions}
        onOpenChange={setShowActions}
      >
        <DropdownMenuTrigger aria-label="User actions" asChild>
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
              Are you sure you want to delete this user?
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
                  const deleted = await deleteUser(user.id);
                  if (deleted) {
                    setShowDeleteAlert(false);
                    refetch();
                  }
                });
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
