import type { Editor, Range } from "@tiptap/react";
import { uploadImg } from "./upload-image";

interface CommandProps {
  editor: Editor;
  range: Range;
}

export default function getSuggestions({ query }: { query: string }) {
  return [
    {
      name: "To-do List",
      icon: "task",
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).toggleTaskList().run();
      },
    },
    {
      name: "Image",
      icon: "image",
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).focus().run();
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = async () => {
          if (input.files?.length) {
            uploadImg(input.files[0], editor.view);
          }
        };
        input.click();
      },
    },
    {
      name: "Inline image",
      icon: "image",
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).focus().run();
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = async () => {
          if (input.files?.length) {
            uploadImg(input.files[0], editor.view, true);
          }
        };
        input.click();
      },
    },
    {
      name: "Heading 1",
      icon: "heading1",
      command: ({ editor, range }: CommandProps) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 1 })
          .run();
      },
    },
    {
      name: "Heading 2",
      icon: "heading2",
      command: ({ editor, range }: CommandProps) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 2 })
          .run();
      },
    },
    {
      name: "Heading 3",
      icon: "heading3",
      command: ({ editor, range }: CommandProps) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 3 })
          .run();
      },
    },
    {
      name: "Bullet List",
      icon: "bullet",
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).toggleBulletList().run();
      },
    },
    {
      name: "Numbered List",
      icon: "numbered",
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).toggleOrderedList().run();
      },
    },
    {
      name: "Divider",
      icon: "divider",
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).setHorizontalRule().run();
      },
    },
    {
      name: "Quote",
      icon: "quote",
      command: ({ editor, range }: CommandProps) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .toggleNode("paragraph", "paragraph")
          .toggleBlockquote()
          .run();
      },
    },
    {
      name: "Code",
      icon: "code",
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
      },
    },
  ].filter((item) =>
    item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
  );
}
