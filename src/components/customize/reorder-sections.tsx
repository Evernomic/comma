"use client";
import { userPageConfig } from "@/config/user-page";
import { sortUserPageSections } from "@/lib/utils";
import { UserPageSection } from "@/types";
import { Reorder, useDragControls } from "framer-motion";
import ky from "ky";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icons } from "../shared/icons";
import { toast } from "../ui/use-toast";

export default function ReorderSections({
  defaultOrder,
  startTransition,
}: {
  defaultOrder: number[];
  startTransition?: React.TransitionStartFunction;
}) {
  const [sections, setSections] = useState<UserPageSection[]>(
    sortUserPageSections(userPageConfig.sections, defaultOrder),
  );
  const router = useRouter();

  async function onDragEnd() {
    startTransition?.(async () => {
      const res = await ky.patch("/api/user", {
        json: { sectionsOrder: sections.map((s) => s.position) },
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

  return (
    <div>
      <Reorder.Group axis="y" onReorder={setSections} values={sections}>
        <div className="space-y-2">
          {sections.map((section) => (
            <Section
              section={section}
              key={`${section.title}--${section.position}`}
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
}: {
  section: UserPageSection;
  onDragEnd: () => void;
}) {
  const controls = useDragControls();

  return (
    <Reorder.Item
      value={section}
      dragListener={false}
      onDragEnd={onDragEnd}
      dragControls={controls}
    >
      <div className="rounded-md flex gap-2  items-center text-sm text-gray-4 px-2 h-4.5 w-[200px] bg-gray-3">
        <span
          className="reorder-handle cursor-pointer size-4 flex items-center  justify-center transition-colors rounded-md hover:bg-gray-2"
          onPointerDown={(e) => controls.start(e)}
        >
          <Icons.gripVertical size={15} />
        </span>
        <p className="select-none">{section.title}</p>
      </div>
    </Reorder.Item>
  );
}
