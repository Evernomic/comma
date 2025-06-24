"use client";
import UploadImage from "@/components/forms/upload-image";
import { Icons } from "@/components/shared/icons";
import Button from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Input from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { linkInBioLinkSchema } from "@/lib/validations/user";
import type { LinkInBioLink } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { nanoid } from "nanoid";
import Image from "next/image";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { flushSync } from "react-dom";
import { useForm } from "react-hook-form";
import * as z from "zod";

type FormData = z.infer<typeof linkInBioLinkSchema>;

export default function AddEditLinkInBioLinkModal({
  initialLinks,
  link,
  setLinks,
  edit,
}: {
  initialLinks: LinkInBioLink[];
  link?: LinkInBioLink;
  setLinks: Dispatch<SetStateAction<LinkInBioLink[]>>;
  edit?: boolean;
}) {
  const [showAddEditLinkModal, setShowAddEditLinkModal] =
    useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [imageURL, setImageURL] = useState<string | null>(
    edit && link ? (link.image ?? null) : null,
  );

  const { title } = useMemo(() => {
    if (edit && link) {
      return {
        title: "Edit link",
        successMessage: "Link has been saved.",
      };
    } else {
      return {
        title: "Add link",
        successMessage: "Link has been added.",
      };
    }
  }, [edit, link]);

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(linkInBioLinkSchema),
    defaultValues: link!,
  });

  useEffect(() => {
    if (!showAddEditLinkModal && isMounted && !edit) {
      reset();
      setImageURL(null);
    }
  }, [showAddEditLinkModal]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSubmit = async (data: FormData) => {
    startTransition(async () => {
      const updated = [
        ...(initialLinks
          ? link && edit
            ? initialLinks.map((l) =>
                l.id === link.id ? { id: l.id, ...data } : l,
              )
            : [...initialLinks, { id: nanoid(), ...data }]
          : [{ id: nanoid(), ...data }]),
      ];

      setLinks(updated);
      setShowAddEditLinkModal(false);
    });
  };

  return (
    <Dialog open={showAddEditLinkModal} onOpenChange={setShowAddEditLinkModal}>
      <DialogTrigger asChild>
        {edit ? (
          <Button variant="ghost" size="icon" className="size-4.4">
            <Icons.edit size={15} />
          </Button>
        ) : (
          <Button
            size="sm"
            variant="secondary"
            aria-label={title}
            title={title}
          />
        )}
      </DialogTrigger>
      <DialogContent className="min-h-max!">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form
          id="add-edit-link-in-bio-link-form"
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            placeholder="Title"
            error={!!errors.title}
            disabled={isPending}
            {...register("title")}
          />
          <Input
            type="url"
            placeholder="URL"
            error={!!errors.url}
            disabled={isPending}
            {...register("url")}
          />
          <UploadImage
            inline
            helpText={`Click to ${imageURL ? "update image" : "upload image"} (Max 4MB)`}
            onUploadCompleted={(url) => {
              flushSync(() => {
                setValue("image", url);
                setImageURL(url);
              });
            }}
          />
          <p className="text-gray-4 text-xs">
            Please add large resolution image for best view
          </p>
          {imageURL && (
            <div className="flex gap-2 ">
              <Image
                src={imageURL}
                width={0}
                height={0}
                sizes="100vw"
                className={cn("w-64 h-auto  rounded-md")}
                alt="Cover image"
                unoptimized
              />
              <Button
                type="button"
                size="sm"
                variant="destructive"
                disabled={isPending}
                autoFocus={false}
                onClick={() => {
                  setImageURL(null);
                  setValue("image", null);
                }}
              >
                Delete image
              </Button>
            </div>
          )}
          <Input
            placeholder="Content title"
            error={!!errors.contentTitle}
            disabled={isPending}
            {...register("contentTitle")}
          />

          <Input
            placeholder="Description"
            error={!!errors.description}
            disabled={isPending}
            {...register("description")}
          />
        </form>
        <DialogFooter>
          <Button
            form="add-edit-link-in-bio-link-form"
            type="submit"
            isPending={isPending}
            size="sm"
          >
            {edit ? "Save" : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
