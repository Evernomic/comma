import { Icons } from "@/components/shared/icons";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Editor } from "@tiptap/core";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface LinkSelectorProps {
  editor: Editor;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const linkSchema = z.object({
  link: z.string().min(2),
});

type FormData = z.infer<typeof linkSchema>;

export default function LinkSelector({
  editor,
  isOpen,
  setIsOpen,
}: LinkSelectorProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(linkSchema),
  });

  const onSubmit = (data: FormData) => {
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: data.link })
      .run();
    setIsOpen(false);
  };
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        className={cn(
          "rounded-md p-1 size-4.5 flex justify-center items-center text-sm data-[state=open]:bg-gray-2",
          editor.getAttributes("link").href ? "bg-gray-2" : "",
        )}
        onClick={() => setIsOpen(true)}
      >
        <Icons.link size={15} />
      </PopoverTrigger>
      <PopoverContent align="start" className="mt-1">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full gap-1 flex">
          <Input
            type="url"
            placeholder="url"
            defaultValue={editor.getAttributes("link").href}
            className={cn("h-4.5", errors?.link ? "border-danger" : "")}
            {...register("link")}
          />
          {editor.getAttributes("link").href ? (
            <Button
              type="button"
              onClick={() => {
                editor.chain().focus().unsetLink().run();
                reset();
              }}
              size="icon"
              className="min-w-4.5x"
              variant="destructive"
            >
              <Icons.trash size={15} />
            </Button>
          ) : (
            <Button
              type="submit"
              className="min-w-4.5"
              variant="ghost"
              size="icon"
            >
              <Icons.check size={18} />
            </Button>
          )}
        </form>
      </PopoverContent>
    </Popover>
  );
}
