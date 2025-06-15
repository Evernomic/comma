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
  const [showAddExternalLinkForm, setShowAddExternalLinkForm] =
    useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const router = useRouter();

  async function onDragEnd() {
    if (!isDragging) {
      startTransition?.(async () => {
        try {
          const res = await ky.patch("/api/user", {
            json: { navLinks: links },
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
        } catch (err) {}
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
          {showAddExternalLinkForm ? (
            <AddExternalLink
              setLinks={setLinks}
              hide={() => setShowAddExternalLinkForm(false)}
            />
          ) : (
            <Button size="sm" onClick={() => setShowAddExternalLinkForm(true)}>
              Add external link
            </Button>
          )}
        </div>
      </Reorder.Group>
    </div>
  );
}

function AddExternalLink({
  hide,
  setLinks,
}: {
  hide: () => void;
  setLinks: Dispatch<SetStateAction<CustomNavItem[]>>;
}) {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { linkTitle: title, linkHref: href } = Object.fromEntries(
      new FormData(e.currentTarget).entries(),
    ) as { linkTitle: string; linkHref: string };

    setLinks((prev) => [...prev, { title, href, isExternal: true }]);
    hide();
  };
  return (
    <form className="w-full flex gap-2" onSubmit={onSubmit}>
      <div className="flex  gap-1">
        <Input
          placeholder="Enter title"
          name="linkTitle"
          className="h-4.5"
          minLength={1}
          autoFocus
          required
        />
        <Input
          placeholder="Enter URL"
          name="linkHref"
          className="h-4.5"
          minLength={1}
          required
        />
      </div>
      <div className="flex gap-1">
        <Button
          type="button"
          className="size-4.5"
          variant="ghost"
          size="icon"
          onClick={hide}
        >
          <Icons.x size={15} />
        </Button>
        <Button type="submit" className="size-4.5" variant="ghost" size="icon">
          <Icons.check size={15} />
        </Button>
      </div>
    </form>
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
    const { linkTitle, linkHref } = Object.fromEntries(
      new FormData(e.currentTarget).entries(),
    ) as { linkTitle: string; linkHref: string };

    if (
      linkTitle !== link.title && link.isExternal
        ? link.href !== linkTitle
        : true
    ) {
      setLinks((prev) =>
        prev.map((l) =>
          l.href === link.href
            ? { ...l, title: linkTitle, ...(linkHref && { href: linkHref }) }
            : l,
        ),
      );
    }
  };
  const EyeIcon =
    Icons[
      link.isVisible === undefined || link.isVisible !== false
        ? "eye"
        : "eyeOff"
    ];
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
      <div className="rounded-md flex gap-2   items-center text-sm text-gray-4 px-1 h-4.7 w-max min-w-[300px]  max-w-[400px] max-[400px]:w-full bg-gray-3">
        {isEditing ? (
          <>
            {link.isExternal ? (
              <form className="w-full flex gap-2" onSubmit={onSubmit}>
                <div className="flex gap-1">
                  <Input
                    placeholder="Enter title"
                    name="linkTitle"
                    defaultValue={link.title}
                    className="h-4.4  border-0"
                    minLength={1}
                    autoFocus
                    required
                  />
                  <Input
                    placeholder="Enter URL"
                    name="linkHref"
                    defaultValue={link.href}
                    className="h-4.4 border-0"
                    minLength={1}
                    required
                  />
                </div>
                <div className="flex gap-1">
                  <Button
                    type="button"
                    className="size-4.4 text-danger! enabled:hover:text-danger!"
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setLinks((prev) =>
                        prev.filter((l) => l.href !== link.href),
                      )
                    }
                  >
                    <Icons.trash size={15} />
                  </Button>
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
            )}
          </>
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
            <p className="select-none grow truncate text-secondary">
              {link.title}
            </p>

            <div className="flex gap-1">
              <Button
                variant="ghost"
                className="size-4.4"
                size="icon"
                onClick={() => {
                  setLinks((prev) =>
                    prev.map((l) =>
                      l.href === link.href
                        ? {
                            ...l,
                            isVisible:
                              link.isVisible === undefined
                                ? false
                                : !link.isVisible,
                          }
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
