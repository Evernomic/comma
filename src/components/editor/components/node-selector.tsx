import { Icons } from "@/components/shared/icons";
import Button from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { Editor } from "@tiptap/core";
import type { Dispatch, SetStateAction } from "react";
import type { BubbleMenuItem } from "./bubble-menu";

interface LinkSelectorProps {
  editor: Editor;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function NodeSelector({
  editor,
  isOpen,
  setIsOpen,
}: LinkSelectorProps) {
  const items: BubbleMenuItem[] = [
    {
      name: "Text",
      icon: Icons.textIcon,
      command: () =>
        editor.chain().focus().toggleNode("paragraph", "paragraph").run(),
      isActive:
        editor.isActive("paragraph") &&
        !editor.isActive("bulletList") &&
        !editor.isActive("orderedList"),
    },
    {
      name: "Heading 1",
      icon: Icons.heading1,
      command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive("heading", { level: 1 }),
    },
    {
      name: "Heading 2",
      icon: Icons.heading2,
      command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive("heading", { level: 2 }),
    },
    {
      name: "Heading 3",
      icon: Icons.heading3,
      command: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor.isActive("heading", { level: 3 }),
    },
    {
      name: "Bullet List",
      icon: Icons.listOrdered,
      command: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
    },
    {
      name: "Numbered List",
      icon: Icons.listOrdered,
      command: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive("orderedList"),
    },
    {
      name: "Quote",
      icon: Icons.textQuote,
      command: () =>
        editor
          .chain()
          .focus()
          .toggleNode("paragraph", "paragraph")
          .toggleBlockquote()
          .run(),
      isActive: editor.isActive("blockquote"),
    },
    {
      name: "Code Block",
      icon: Icons.code,
      command: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: editor.isActive("codeBlock"),
    },
  ];

  const active = items.filter((item) => item.isActive)[0];
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className={cn(editor.getAttributes("link").href ? "bg-gray-2" : "")}
        >
          {active?.name}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="mt-1 flex flex-col gap-1 rounded-lg"
      >
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <button
              className={cn(
                "flex w-full flex-row items-center gap-2 rounded-md px-2 py-1 text-xs transition-colors hover:bg-gray-2",
                item.isActive ? "bg-gray-2" : "",
              )}
              key={i}
              onClick={() => {
                item.command();
                setIsOpen(false);
              }}
            >
              <Icon size={15} />
              {item.name}
            </button>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}
