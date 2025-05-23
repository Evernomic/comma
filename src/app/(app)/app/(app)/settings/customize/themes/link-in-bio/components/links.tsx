"use client";
import { Icons } from "@/components/shared/icons";
import Button from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import type { LinkInBioLink } from "@/types";
import { Reorder, useDragControls } from "framer-motion";
import ky from "ky";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  default as AddEditLinkInBioLinkModal,
  default as AddEditLinkModal,
} from "./add-edit-link-in-bio-link";

export default function LinkInBioLinks({
  initialLinks,
  startTransition,
}: {
  initialLinks: LinkInBioLink[] | null;
  startTransition?: React.TransitionStartFunction;
}) {
  const [links, setLinks] = useState<LinkInBioLink[]>(initialLinks ?? []);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const router = useRouter();

  async function onDragEnd() {
    if (!isDragging) {
      startTransition?.(async () => {
        const res = await ky.patch("/api/user", {
          json: { linkInBioLinks: links },
        });
        if (!res.ok) {
          const error = await res.text();
          toast({
            title: "Something went wrong.",
            description: error,
            variant: "destructive",
          });
        } else {
          router.refresh();
          toast({
            title: "Saved",
          });
        }
      });
    }
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !isDragging) {
      onDragEnd();
    }
  }, [links, isDragging]);

  return (
    <div>
      <Reorder.Group axis="y" onReorder={setLinks} values={links}>
        <div className="space-y-2">
          <AddEditLinkModal initialLinks={links} setLinks={setLinks} />
          {links.map((link) => (
            <Link
              link={link}
              links={links}
              setLinks={setLinks}
              isDragging={isDragging}
              setIsDragging={setIsDragging}
              onDragEnd={onDragEnd}
              key={link.id}
            />
          ))}
        </div>
      </Reorder.Group>
    </div>
  );
}

function Link({
  link,
  links,
  setLinks,
  onDragEnd,
  isDragging,
  setIsDragging,
}: {
  link: LinkInBioLink;
  links: LinkInBioLink[];
  setLinks: Dispatch<SetStateAction<LinkInBioLink[]>>;
  isDragging: boolean;
  setIsDragging: Dispatch<SetStateAction<boolean>>;
  onDragEnd: () => void;
}) {
  const controls = useDragControls();
  return (
    <Reorder.Item
      value={link}
      dragListener={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => {
        onDragEnd();
        setIsDragging(false);
      }}
      dragControls={controls}
    >
      <div className="rounded-md flex gap-2   items-start text-sm text-gray-4 p-2 h-auto  w-full bg-gray-3">
        <Button
          className={cn(
            "reorder-handle size-4.4 cursor-grab",
            isDragging && "cursor-grabbing",
          )}
          variant="ghost"
          size="icon"
          onPointerDown={(e) => {
            controls.start(e);
            setIsDragging(true);
          }}
        >
          <Icons.gripVertical size={15} />
        </Button>
        <div className="flex flex-col gap-1 flex-1">
          <p className="select-none grow truncate text-secondary">
            {link.title}
          </p>
          <p className="text-xs">{link.description}</p>
          {link.image && (
            <Image
              src={link.image}
              width={0}
              height={0}
              sizes="100vw"
              className={cn("w-70 mt-2 h-auto  rounded-md")}
              alt="Cover image"
              priority
            />
          )}
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            className="size-4.4 text-danger! enabled:hover:text-danger!"
            variant="ghost"
            size="icon"
            onClick={() =>
              setLinks((prev) => prev.filter((l) => l.id !== link.id))
            }
          >
            <Icons.trash size={15} />
          </Button>
          <AddEditLinkInBioLinkModal
            initialLinks={links}
            setLinks={setLinks}
            link={link}
            edit
          />
        </div>
      </div>
    </Reorder.Item>
  );
}
