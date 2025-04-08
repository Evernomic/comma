"use client";

import "@/styles/editor.css";
import { EditorContent, EditorProvider, useCurrentEditor } from "@tiptap/react";
import "katex/dist/katex.min.css";
import { useRouter } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useDebouncedCallback } from "use-debounce";
import { toast } from "../ui/use-toast";
import BubbleMenu from "./components/bubble-menu";
import { TiptapExtensions } from "./extensions";
import { ImageResizer } from "./extensions/image-resizer";
import { handleImagePaste } from "./extensions/upload-image";
interface Props {
  endpoint: string;
  method: "PUT" | "PATCH";
  content?: any;
  setSaving: Dispatch<SetStateAction<boolean>>;
  name?: string;
}
interface WithTitle extends Props {
  onlyContent?: false;
  title: string;
}

interface WithoutTitle extends Props {
  onlyContent: true;
  title?: undefined;
}

export type TitleProps = WithTitle | WithoutTitle;

export type EditorProps = Props & TitleProps;

export default function Editor({
  endpoint,
  method,
  content,
  title,
  name = "content",
  onlyContent = false,
  setSaving,
}: EditorProps) {
  const { editor } = useCurrentEditor();
  const router = useRouter();
  const debouncedUpdates = useDebouncedCallback(
    async ({ editor, title }: { editor: any; title?: string }) => {
      setSaving(true);
      const content = editor?.storage.markdown.getMarkdown();
      const res = await fetch(`/api/${endpoint}`, {
        method,
        body: JSON.stringify({
          ...(!onlyContent && { title }),
          [name as string]: content,
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
      {!onlyContent && (
        <TextareaAutosize
          className="resize-none border-0 bg-transparent line-clamp-none text-xl font-medium outline-hidden placeholder:text-gray-1"
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
      )}
      <div className="prose-base relative  w-full flex-1  prose-h1:text-xl prose-h2:text-lg prose-h3:text-base prose-headings:font-normal prose-hr:my-4  prose-headings:mb-4 prose-headings:mt-8 ">
        <EditorProvider
          content={content}
          editorProps={{
            handlePaste: (view, event) => handleImagePaste(view, event),
          }}
          onUpdate={(e) => debouncedUpdates({ editor: e.editor })}
          extensions={TiptapExtensions}
          immediatelyRender={false}
          slotAfter={<ImageResizer />}
        >
          <BubbleMenu />
          <EditorContent editor={editor} />
        </EditorProvider>
      </div>
    </div>
  );
}
