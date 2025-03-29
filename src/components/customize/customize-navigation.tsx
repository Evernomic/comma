"use client";
import { userPageConfig } from "@/config/user-page";
import { cn, sortUserNavItems } from "@/lib/utils";
import type { CustomNavItem } from "@/types";
import { Reorder, useDragControls } from "framer-motion";
import ky from "ky";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Icons } from "../shared/icons";
import Button from "../ui/button";
import Input from "../ui/input";
import { toast } from "../ui/use-toast";

export default function CustomizeNavigation({
  defaultLinks,
  startTransition,
}: {
  defaultLinks: CustomNavItem[] | null;
  startTransition?: React.TransitionStartFunction;
}) {
  const [links, setLinks] = useState<CustomNavItem[]>(
    sortUserNavItems(
      userPageConfig.pages.map(({ icon, ...rest }) => rest),
      defaultLinks,
    ),
  );
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const router = useRouter();

  async function onDragEnd() {
    if (!isDragging) {
      startTransition?.(async () => {
        const res = await ky.patch("/api/user", {
          json: { externalLinks: links },
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
              setLinks={setLinks}
              key={`${link.title}--${link.href}`}
              isDragging={isDragging}
              setIsDragging={setIsDragging}
              onDragEnd={onDragEnd}
            />
          ))}
        </div>
      </Reorder.Group>
    </div>
  );
}

function Link({
  link,
  setIsDragging,
  isDragging,
  onDragEnd,
  setLinks,
}: {
  link: CustomNavItem;
  setLinks: Dispatch<SetStateAction<CustomNavItem[]>>;
  isDragging: boolean;
  setIsDragging: Dispatch<SetStateAction<boolean>>;
  onDragEnd: () => void;
}) {
  const controls = useDragControls();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditing(false);
    const { linkTitle } = Object.fromEntries(
      new FormData(e.currentTarget).entries(),
    ) as { linkTitle: string };

    if (linkTitle !== link.title) {
      setLinks((prev) =>
        prev.map((l) =>
          l.href === link.href ? { ...l, title: linkTitle } : l,
        ),
      );
    }
  };
  console.log(link.title, link.isVisible);
  const EyeIcon = Icons[link.isVisible ? "eye" : "eyeOff"];
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
        {isEditing ? (
          <form className="w-full flex justify-center" onSubmit={onSubmit}>
            <Input
              placeholder="Enter title"
              name="linkTitle"
              className="border-0 h-4.4"
              defaultValue={link.title}
              minLength={1}
              autoFocus
              required
            />
            <div className="flex gap-1">
              <Button
                type="button"
                className="size-4.4"
                variant="ghost"
                size="icon"
                onClick={() => setIsEditing(false)}
              >
                <Icons.x size={15} />
              </Button>
              <Button
                type="submit"
                className="size-4.4"
                variant="ghost"
                size="icon"
              >
                <Icons.check size={15} />
              </Button>
            </div>
          </form>
        ) : (
          <>
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

            <div className="flex gap-1">
              <Button
                variant="ghost"
                className="size-4.4"
                size="icon"
                onClick={() => {
                  setLinks((prev) =>
                    prev.map((l) =>
                      l.href === link.href
                        ? { ...l, isVisible: !link.isVisible }
                        : l,
                    ),
                  );
                }}
              >
                <EyeIcon size={15} />
              </Button>
              <Button
                variant="ghost"
                className="size-4.4"
                size="icon"
                onClick={() => setIsEditing(true)}
              >
                <Icons.edit size={15} />
              </Button>
            </div>
          </>
        )}
      </div>
    </Reorder.Item>
  );
}
