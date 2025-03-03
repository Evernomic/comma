"use client";
import { URLRegex } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { bookmarkFormSchema } from "@/lib/validations/bookmark";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Bookmark as BookmarkType, Collection } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import type * as z from "zod";
import { Icons } from "../shared/icons";
import Button from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Input from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "../ui/use-toast";

type FormData = z.infer<typeof bookmarkFormSchema>;

export type Bookmark = Pick<BookmarkType, "id" | "title" | "url"> & {
  collection?: Collection;
};

export default function AddEditBookmarkModal({
  collections,
  bookmark,
  edit,
  open = false,
  closeBookmarkOperations,
}: {
  collections?: Collection[];
  bookmark?: Bookmark;
  edit?: boolean;
  open?: boolean;
  closeBookmarkOperations?: () => void;
}) {
  const [showAddEditBookmarkModal, setShowAddEditBookmarkModal] =
    useState<boolean>(open);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (!showAddEditBookmarkModal && open) {
      router.push("/bookmarks");
    }
  }, [showAddEditBookmarkModal, open]);

  const { title, endpoint, method, successMessage } = useMemo(() => {
    if (edit && bookmark) {
      return {
        title: "Edit bookmark",
        endpoint: `/api/bookmarks/${bookmark.id}`,
        method: "PATCH",
        successMessage: "Bookmark has been saved.",
      };
    }
    return {
      title: "Add bookmark",
      endpoint: "/api/bookmarks",
      method: "POST",
      successMessage: "Bookmark has been added.",
    };
  }, [edit, bookmark]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(bookmarkFormSchema),
    defaultValues: {
      title: bookmark?.title,
      domain: bookmark?.url,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    const res = await fetch(endpoint, {
      method,
      body: JSON.stringify({
        title: data.title,
        url: URLRegex.test(data.domain)
          ? data.domain
          : `https://${data.domain}`,
        collection: data?.collection === "all" ? null : data.collection,
      }),
    });

    setIsLoading(false);
    const body = await res.text();
    if (!res?.ok) {
      return toast({
        title: "Something went wrong.",
        description: body,
      });
    }
    setShowAddEditBookmarkModal(false);
    closeBookmarkOperations?.();
    reset();
    router.refresh();

    return toast({
      title: successMessage,
    });
  };

  return (
    <Dialog
      open={showAddEditBookmarkModal}
      onOpenChange={setShowAddEditBookmarkModal}
    >
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className={cn("gap-2 justify-start")}
          aria-label={title}
        >
          {edit ? (
            <>
              <Icons.edit size={15} />
              Edit
            </>
          ) : (
            <>{title}</>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form
          id="add-edit-bookmark-form"
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            type="text"
            placeholder="Title"
            autoComplete="off"
            {...register("title")}
            disabled={isLoading}
          />
          {errors?.title && (
            <b className="text-xs text-danger">{errors.title.message}</b>
          )}
          <Input
            placeholder="Domain or URL"
            disabled={isLoading}
            {...register("domain")}
          />
          {errors?.domain && (
            <b className="text-xs text-danger">{errors.domain.message}</b>
          )}

          <Controller
            control={control}
            name="collection"
            render={({ field: { onChange } }) => (
              <Select
                onValueChange={onChange}
                defaultValue={bookmark?.collection?.id}
                disabled={isLoading}
              >
                <SelectTrigger className="w-full text-gray-1">
                  <SelectValue placeholder="Select collection" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {collections?.map((collection) => (
                    <SelectItem value={collection.id} key={collection.id}>
                      {collection.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </form>
        <DialogFooter>
          <Button
            form="add-edit-bookmark-form"
            type="submit"
            variant="default"
            size="sm"
            isPending={isLoading}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
