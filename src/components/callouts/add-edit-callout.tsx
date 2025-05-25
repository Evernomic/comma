"use client";
import { calloutCategories } from "@/lib/constants";
import { calloutSchema } from "@/lib/validations/callout";
import { zodResolver } from "@hookform/resolvers/zod";
import { Article, Callout, Project } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
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
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/use-toast";

type FormData = z.infer<typeof calloutSchema>;

export default function AddEditCalloutModal({
  callout,
  articles,
  projects,
  edit,
  closeCalloutOperations,
}: {
  callout?: Callout;
  articles: Article[];
  projects: Project[];
  edit?: boolean;
  closeCalloutOperations?: () => void;
}) {
  const [showAddEditCalloutModal, setShowAddEditCalloutModal] =
    useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const { title, endpoint, method, successMessage } = useMemo(() => {
    if (edit && callout) {
      return {
        title: "Edit callout",
        endpoint: `/api/user/callouts/${callout.id}`,
        method: "PATCH",
        successMessage: "Callout has been saved.",
      };
    } else {
      return {
        title: "Add callout",
        endpoint: "/api/user/callouts",
        method: "POST",
        successMessage: "Callout has been added.",
      };
    }
  }, [edit, callout]);

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(calloutSchema),
    defaultValues: {
      title: callout?.title,
      description: callout?.description!,
      url: callout?.url!,
      category: callout?.category,
    },
  });

  useEffect(() => {
    if (!showAddEditCalloutModal) {
      reset();
    }
  }, [showAddEditCalloutModal]);

  const onSubmit = async (data: FormData) => {
    startTransition(async () => {
      const res = await fetch(endpoint, {
        method,
        body: JSON.stringify(data),
      });

      const body = await res.text();
      if (!res?.ok) {
        toast({
          title: "Something went wrong.",
          description: body,
        });
      } else {
        setShowAddEditCalloutModal(false);
        reset();
        closeCalloutOperations?.();
        router.refresh();
        toast({
          title: successMessage,
        });
      }
    });
  };

  const posts = [
    ...articles.map((a) => ({ ...a, type: "article" })),
    ...projects.map((p) => ({ ...p, type: "project" })),
  ];
  return (
    <Dialog
      open={showAddEditCalloutModal}
      onOpenChange={setShowAddEditCalloutModal}
    >
      <DialogTrigger asChild>
        {edit ? (
          <Button variant="ghost" size="sm" className="justify-start gap-2">
            <Icons.edit size={15} /> Edit
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
          id="add-edit-callout-form"
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            placeholder="Title"
            error={!!errors.title}
            disabled={isPending}
            {...register("title")}
          />

          <Textarea
            placeholder="Add some details"
            disabled={isPending}
            error={!!errors.description}
            maxLength={250}
            {...register("description")}
            className="field-sizing-content"
          />
          <Input
            type="url"
            placeholder="https://example.com"
            error={!!errors.url}
            disabled={isPending}
            {...register("url")}
          />
          <Controller
            control={control}
            name="postId"
            render={({ field: { onChange } }) => (
              <Select
                defaultValue={callout?.postId ?? undefined}
                onValueChange={(val) => {
                  onChange(val);
                  const type = posts.find((p) => p.id === val)?.type as
                    | "article"
                    | "project";
                  setValue("postType", type);
                }}
                disabled={isPending}
              >
                <SelectTrigger error={!!errors.postId}>
                  <SelectValue placeholder="Select related post" />
                </SelectTrigger>
                <SelectContent>
                  {posts?.map((p) => (
                    <SelectItem className="pr-2!" value={p.id} key={p.id}>
                      <div className="flex-1 flex items-center gap-2">
                        <span className="text-gray-4 text-sm ">
                          {p.type === "article" ? "Article" : "Project"}
                        </span>
                        {p.title}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <Controller
            control={control}
            name="category"
            render={({ field: { onChange } }) => (
              <Select
                onValueChange={onChange}
                defaultValue={callout?.category}
                disabled={isPending}
              >
                <SelectTrigger error={!!errors.category}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {calloutCategories?.map((c) => (
                    <SelectItem value={c.value} key={c.value}>
                      {c.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </form>
        <DialogFooter>
          <Button
            form="add-edit-callout-form"
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
