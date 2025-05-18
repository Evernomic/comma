"use client";
import type { Project as _Project } from "@prisma/client";
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


type Project = Pick<_Project, "isPinned" | "id">

interface Props {
  project: Project
}

async function togglePinProject(project: Project) {
  const response = await fetch(`/api/projects/${project.id}`, {
    method: "PATCH",
    body: JSON.stringify({
      isPinned: !project.isPinned,
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
export default function ProjectOperations({ project }: Props) {
  const [showProjectOperations, setShowProjectOperations] =
    useState<boolean>(false);

  const [isPending, startTransition] = useTransition()
  const router = useRouter();

  return (
      <DropdownMenu
        modal={false}
        open={showProjectOperations}
        onOpenChange={setShowProjectOperations}
      >
        <DropdownMenuTrigger aria-label="Project Operations" asChild>
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
                const res = await togglePinProject(project)
                if(res) {
                  router.refresh();
                 toast({title: "Saved"})
                }

              })
            }}
            >
           {(!isPending) ? ( project.isPinned ? <><PinOff size={15} /> Unpin</> : <><Pin size={15} /> Pin</>) : <><Icons.spinner className="animate-spin" size={15} /> {project.isPinned ? "Unpinning" : "Pinning"}</>} 
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
  );
}
