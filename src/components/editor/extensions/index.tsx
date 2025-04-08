import { allowedMimeTypes } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Mathematics from "@aarkue/tiptap-math-extension";
import FileHandler from "@tiptap-pro/extension-file-handler";
import TiptapImage from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Typography from "@tiptap/extension-typography";
import TiptapUnderline from "@tiptap/extension-underline";
import { mergeAttributes } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
import { Placeholder as ImagePlaceholder } from "../plugins/placeholder";
import { SlashCommand } from "./slash-command";
import { uploadImg } from "./upload-image";

const CustomImage = TiptapImage.extend({
  addProseMirrorPlugins() {
    return [ImagePlaceholder];
  },

  renderHTML({ HTMLAttributes }) {
    const src = new URL(HTMLAttributes.src);

    const isInline = src.searchParams.get("inline") === "true";
    const [width, height] = [
      src.searchParams.get("width"),
      src.searchParams.get("height"),
    ];

    if (width) HTMLAttributes.width = width;
    if (height) HTMLAttributes.height = height;

    return [
      "img",
      mergeAttributes(HTMLAttributes, {
        class: cn(isInline ? "inline-image" : "block-image"),
      }),
    ];
  },
}).configure({
  inline: true,
  allowBase64: true,
  HTMLAttributes: {
    class: "rounded-md border border-gray-3 mt-0",
  },
});

export const TiptapExtensions = [
  StarterKit.configure({
    paragraph: {
      HTMLAttributes: {
        class: "text-gray-4",
      },
    },
    bulletList: {
      HTMLAttributes: {
        class:
          "list-disc list-outside leading-3 mt-4 mb-4.4  [&_li]:leading-4 [&_li]:mt-2 text-secondary marker:text-gray-1",
      },
    },
    orderedList: {
      HTMLAttributes: {
        class:
          "list-decimal list-outside leading-3 mt-4 mb-4.4 [&_li]:leading-4 [&_li]:mt-2 text-secondary marker:text-gray-1",
      },
    },
    listItem: {
      HTMLAttributes: {
        class: "leading-normal -mb-2",
      },
    },
    blockquote: {
      HTMLAttributes: {
        class: " border-l-4 border-gray-2 italic font-medium",
      },
    },
    codeBlock: {
      HTMLAttributes: {
        class: "rounded-lg border border-gray-2 bg-gray-3 text-secondary",
      },
    },
    code: {
      HTMLAttributes: {
        class:
          "rounded-lg border border-gray-2 bg-gray-3 px-1 py-0.5 font-normal text-secondary",
        spellcheck: "false",
      },
    },
    horizontalRule: {
      HTMLAttributes: {
        class: "border-gray-2",
      },
    },
    bold: {
      HTMLAttributes: {
        class: "font-semibold text-secondary",
      },
    },
  }),
  Link.extend({ inclusive: false }).configure({
    HTMLAttributes: {
      class: "text-secondary custom-underline cursor-pointer font-normal",
    },
    autolink: true,
  }),
  FileHandler.configure({
    allowedMimeTypes: [...allowedMimeTypes],
    onDrop: (editor, files) => uploadImg(files[0], editor.view),
  }),
  Markdown.configure({
    html: true,
    transformCopiedText: true,
    transformPastedText: true,
  }),
  TaskList.configure({
    HTMLAttributes: {
      class: "pl-0",
    },
  }),
  TaskItem.configure({
    HTMLAttributes: {
      class: "flex items-start [&_p]:my-0",
    },
    nested: true,
  }),
  Placeholder.configure({
    placeholder: ({ node }) => {
      switch (node.type.name) {
        case "heading":
          return `Heading ${node.attrs.level}`;
        case "codeBlock":
          return "";
        default:
          return "Write or type '/ ' for commands";
      }
    },
    includeChildren: false,
  }),
  CustomImage,
  TiptapUnderline,
  SlashCommand,
  Typography,
  Mathematics,
];
