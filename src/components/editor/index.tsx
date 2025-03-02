"use client";

import "@/styles/editor.css";
import "katex/dist/katex.min.css"
import { EditorContent, useEditor } from "@tiptap/react";
import { useRouter } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useDebouncedCallback } from "use-debounce";
import { toast } from "../ui/use-toast";
import BubbleMenu from "./components/bubble-menu";
import { TiptapExtensions } from "./extensions";
import { handleImagePaste } from "./extensions/upload-image";
interface Props {
  endpoint: string;
  method: "PUT" | "PATCH";
  content?: any;
  title: string;
  setSaving: Dispatch<SetStateAction<boolean>>;
}

export default function Editor({
  endpoint,
  method,
  content,
  title,
  setSaving,
}: Props) {
  const editor = useEditor({
    extensions: TiptapExtensions,
    content,
    immediatelyRender: false,
    editorProps: {
      handlePaste: (view, event) => handleImagePaste(view, event),
    },
    onUpdate: (e) => {
      debouncedUpdates({ editor: e.editor });
    },
  });
  const router = useRouter();
  const debouncedUpdates = useDebouncedCallback(
    async ({ editor, title }: { editor: any; title?: string }) => {
      setSaving(true);
      const content = editor?.storage.markdown.getMarkdown();
      const res = await fetch(`/api/${endpoint}`, {
        method,
        body: JSON.stringify({
          title,
          content,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        toast({
          title: "Something went wrong.",
          description: err,
        });
      }
      router.refresh();
      setTimeout(() => {
        setSaving(false);
      }, 700);
    },
    1000,
  );

  return (
    <div className="flex flex-col gap-2">
      <TextareaAutosize
        className="resize-none border-0 bg-transparent line-clamp-none text-xl font-medium outline-none placeholder:text-gray-1"
        placeholder="Title"
        defaultValue={title}
        maxLength={70}
        onChange={(e) => {
          debouncedUpdates({
            editor,
            title: e.target.value,
          });
        }}
      />
      <div className="prose-base relative  w-full flex-1  prose-h1:text-xl prose-h2:text-lg prose-h3:text-base prose-headings:font-normal prose-hr:my-4  prose-headings:mb-4 prose-headings:mt-8 ">
        {editor && <BubbleMenu editor={editor} />}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
