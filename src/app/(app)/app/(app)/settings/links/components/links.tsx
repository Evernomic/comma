"use client";
import { Icons } from "@/components/shared/icons";
import Button from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import type { Social } from "@/types";
import { Reorder, useDragControls } from "framer-motion";
import ky from "ky";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import AddEditLinkModal from "./add-edit-link";

export default function SocialLinks({
  initialLinks,
  startTransition,
}: {
  initialLinks: Social[] | null;
  startTransition?: React.TransitionStartFunction;
}) {
  const [links, setLinks] = useState<Social[]>(initialLinks ?? []);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const router = useRouter();

  async function onDragEnd() {
    if (!isDragging) {
      startTransition?.(async () => {
        const res = await ky.patch("/api/user", {
          json: { links },
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
          <AddEditLinkModal initialLinks={links} />
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
  link: Social;
  links: Social[];
  setLinks: Dispatch<SetStateAction<Social[]>>;
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
      <div className="rounded-md flex gap-2   items-center text-sm text-gray-4 px-1 h-4.7  min-w-[220px] max-w-[300px] max-[300px]:w-full bg-gray-3">
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
        <p className="select-none grow truncate">{link.title}</p>
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
          <AddEditLinkModal initialLinks={links} link={link} edit />
        </div>
      </div>
    </Reorder.Item>
  );
}
