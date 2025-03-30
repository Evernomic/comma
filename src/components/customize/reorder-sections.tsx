"use client";
import { userPageConfig } from "@/config/user-page";
import { cn, sortUserPageSections } from "@/lib/utils";
import { UserPageSection } from "@/types";
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

export default function ReorderSections({
  defaultOrder,
  startTransition,
}: {
  defaultOrder: UserPageSection[] | null;
  startTransition?: React.TransitionStartFunction;
}) {
  const [sections, setSections] = useState<UserPageSection[]>(
    sortUserPageSections(userPageConfig.sections, defaultOrder),
  );
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const router = useRouter();

  async function onDragEnd() {
    if (!isDragging) {
      startTransition?.(async () => {
        const res = await ky.patch("/api/user", {
          json: { sections },
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
  }, [sections, isDragging]);

  return (
    <div>
      <Reorder.Group axis="y" onReorder={setSections} values={sections}>
        <div className="space-y-2">
          {sections.map((section) => (
            <Section
              section={section}
              setSections={setSections}
              key={`${section.title}--${section.position}`}
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

function Section({
  section,
  onDragEnd,
  setSections,
  isDragging,
  setIsDragging,
}: {
  section: UserPageSection;
  setSections: Dispatch<SetStateAction<UserPageSection[]>>;
  isDragging: boolean;
  setIsDragging: Dispatch<SetStateAction<boolean>>;
  onDragEnd: () => void;
}) {
  const controls = useDragControls();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditing(false);
    const { sectionTitle } = Object.fromEntries(
      new FormData(e.currentTarget).entries(),
    ) as { sectionTitle: string };

    if (sectionTitle !== section.title) {
      setSections((prev) =>
        prev.map((s) =>
          s.position === section.position ? { ...s, title: sectionTitle } : s,
        ),
      );
    }
  };

  return (
    <Reorder.Item
      value={section}
      dragListener={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => {
        onDragEnd();
        setIsDragging(false);
      }}
      dragControls={controls}
    >
      <div className="rounded-md flex gap-2   items-center text-sm text-gray-4 px-1 h-4.7  min-w-[220px] max-w-[300px] max-[300px]:w-full bg-gray-3">
        {isEditing && !!section.isTitleEditable ? (
          <form className="w-full flex justify-center" onSubmit={onSubmit}>
            <Input
              placeholder="Enter title"
              name="sectionTitle"
              className="border-0 h-4.4"
              defaultValue={section.title}
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
            <p className="select-none grow truncate">{section.title}</p>
            {section.isTitleEditable !== false && (
              <Button
                variant="ghost"
                className="size-4.4"
                size="icon"
                onClick={() => setIsEditing(true)}
              >
                <Icons.edit size={15} />
              </Button>
            )}
          </>
        )}
      </div>
    </Reorder.Item>
  );
}
