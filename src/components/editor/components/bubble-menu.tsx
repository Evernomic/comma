import { Icons } from "@/components/shared/icons";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  isNodeSelection,
  BubbleMenu as TipTapBubbleMenu,
  useCurrentEditor,
} from "@tiptap/react";
import { useRef, useState } from "react";
import LinkSelector from "./link-selector";
import NodeSelector from "./node-selector";

export interface BubbleMenuItem {
  name: string;
  isActive: boolean;
  command: () => void;
  icon: typeof Icons.heading1;
}

export default function BubbleMenu() {
  const [isNodeSelectorOpen, setIsNodeSelectorOpen] = useState<boolean>(false);
  const [isLinkSelectorOpen, setIsLinkSelectorOpen] = useState<boolean>(false);

  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  const items: BubbleMenuItem[] = [
    {
      name: "bold",
      isActive: editor.isActive("bold"),
      command: () => editor.chain().focus().toggleBold().run(),
      icon: Icons.bold,
    },
    {
      name: "italic",
      isActive: editor.isActive("italic"),
      command: () => editor.chain().focus().toggleItalic().run(),
      icon: Icons.italic,
    },
    {
      name: "strike",
      isActive: editor.isActive("strike"),
      command: () => editor.chain().focus().toggleStrike().run(),
      icon: Icons.strike,
    },
    {
      name: "code",
      isActive: editor.isActive("code"),
      command: () => editor.chain().focus().toggleCode().run(),
      icon: Icons.code,
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <TipTapBubbleMenu
      editor={editor}
      tippyOptions={{
        duration: 100,
        onHidden: () => {
          setIsNodeSelectorOpen(false);
          setIsLinkSelectorOpen(false);
        },
      }}
      shouldShow={({ editor, state }) => {
        const { selection } = state;
        const { empty } = selection;

        if (editor.isActive("image") || empty || isNodeSelection(selection)) {
          return false;
        }

        return true;
      }}
    >
      <div
        className="relative z-50 flex flex-row gap-2 rounded-lg border border-gray-2 bg-gray-3 p-1"
        ref={containerRef}
      >
        <NodeSelector
          containerRef={containerRef}
          editor={editor}
          isOpen={isNodeSelectorOpen}
          setIsOpen={() => {
            setIsNodeSelectorOpen(!isNodeSelectorOpen);
          }}
        />
        <LinkSelector
          containerRef={containerRef}
          editor={editor}
          isOpen={isLinkSelectorOpen}
          setIsOpen={() => {
            setIsLinkSelectorOpen(!isLinkSelectorOpen);
          }}
        />
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <Button
              variant="ghost"
              size="icon"
              onClick={item.command}
              className={cn(item.isActive ? "bg-gray-2 text-secondary" : "")}
              key={i}
            >
              <Icon size={15} />
            </Button>
          );
        })}
      </div>
    </TipTapBubbleMenu>
  );
}
