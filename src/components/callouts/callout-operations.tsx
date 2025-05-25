"use client";
import type { Article, Callout, Project } from "@prisma/client";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
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
import AddEditCalloutModal from "./add-edit-callout";

interface Props {
  callout: Callout;
  articles: Article[];
  projects: Project[];
}

async function deleteCallout(calloutId: string) {
  const response = await fetch(`/api/user/callouts/${calloutId}`, {
    method: "DELETE",
  });

  if (!response?.ok) {
    toast({
      title: "Something went wrong.",
      description: "Your callout was not deleted. Please try again.",
    });
  }

  return true;
}

export default function CalloutOperations({
  callout,
  articles,
  projects,
}: Props) {
  const [showCalloutOperations, setShowCalloutOperations] =
    useState<boolean>(false);

  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  const router = useRouter();

  return (
    <>
      <DropdownMenu
        modal={false}
        open={showCalloutOperations}
        onOpenChange={setShowCalloutOperations}
      >
        <DropdownMenuTrigger aria-label="Delete or edit callout" asChild>
          <Button
            size="icon"
            variant="ghost"
            className="size-4.4 data-[state=open]:bg-gray-2 data-[state=open]:text-secondary"
          >
            <Icons.more size={15} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <AddEditCalloutModal
            articles={articles}
            projects={projects}
            callout={callout}
            edit
            closeCalloutOperations={() => setShowCalloutOperations(false)}
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
              Are you sure you want to delete this callout?
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
              disabled={isDeleteLoading}
              onClick={() => setShowDeleteAlert(false)}
            />

            <Button
              variant="destructive"
              size="sm"
              onClick={async (e: FormEvent) => {
                e.preventDefault();
                setIsDeleteLoading(true);
                const deleted = await deleteCallout(callout.id);
                if (deleted) {
                  setIsDeleteLoading(false);
                  setShowDeleteAlert(false);
                  router.refresh();
                }
                setIsDeleteLoading(false);
              }}
              isPending={isDeleteLoading}
            >
              <Icons.trash size={15} /> Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
