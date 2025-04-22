"use client";
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
import { socialLinkSchema } from "@/lib/validations/user";
import type { Social } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { nanoid } from "nanoid";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

type FormData = z.infer<typeof socialLinkSchema>;

export default function AddEditLinkModal({
  initialLinks,
  link,
  setLinks,
  edit,
}: {
  initialLinks: Social[];
  link?: Social;
  setLinks: Dispatch<SetStateAction<Social[]>>;
  edit?: boolean;
}) {
  const [showAddEditLinkModal, setShowAddEditLinkModal] =
    useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const { title, successMessage } = useMemo(() => {
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
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(socialLinkSchema),
    defaultValues: link!,
  });

  useEffect(() => {
    if (!showAddEditLinkModal) {
      reset();
    }
  }, [showAddEditLinkModal]);

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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form
          id="add-edit-link-form"
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
            placeholder="Profile link"
            error={!!errors.url}
            disabled={isPending}
            {...register("url")}
          />

          <Input
            placeholder="Display name (optional)"
            error={!!errors.username}
            disabled={isPending}
            {...register("username")}
          />
        </form>
        <DialogFooter>
          <Button
            form="add-edit-link-form"
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
