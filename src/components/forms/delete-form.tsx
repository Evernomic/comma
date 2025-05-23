"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Button from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Input from "../ui/input";
import { toast } from "../ui/use-toast";

export default function DeleteForm({
  type,
  title,
  description,
  endpoint,
  keyword,
  redirectPath = "/",
}: {
  type?: "user";
  title: string;
  description?: string;
  endpoint: string;
  keyword: string;
  redirectPath?: string;
}) {
  const deleteFormSchema = z.object({
    keyword: z.string().refine((value) => value === keyword),
  });

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [isDeleting, startTransition] = useTransition();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof deleteFormSchema>>({
    resolver: zodResolver(deleteFormSchema),
  });
  return (
    <div className="overflow-hidden rounded-md border border-danger">
      <div className="flex flex-col gap-1 p-4">
        <div className="font-medium">{title}</div>
        <p className="text-sm text-gray-4">
          This action is not reversible, so please continue with caution.
        </p>
      </div>
      <footer className="flex h-auto flex-row items-center justify-end border-t border-danger  px-4 py-2">
        <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
          <DialogTrigger asChild>
            <Button variant="destructive" size="sm">
              Delete
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className="flex flex-col items-start">
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>
                {description} <b>{keyword}</b> to continue:
              </DialogDescription>
            </DialogHeader>

            <form
              id="delete-form"
              onSubmit={handleSubmit(async () => {
                startTransition(async () => {
                  const res = await fetch(`/api${endpoint}`, {
                    method: "DELETE",
                  });
                  if (!res.ok) {
                    const err = await res.text();
                    toast({
                      title: "Something went wrong",
                      description: err,
                    });
                  } else {
                    setShowDeleteModal(false);
                    toast({
                      title: "Deleted",
                    });
                    if (type && type === "user") {
                      return signOut();
                    }
                    router.push(redirectPath);
                    router.refresh();
                  }
                });
              })}
            >
              <Input
                type="text"
                placeholder="type here.."
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                {...register("keyword")}
              />
              {errors.keyword && (
                <b className="text-xs text-danger">{errors.keyword.message}</b>
              )}
            </form>
            <DialogFooter>
              <Button
                size="sm"
                title="Cancel"
                variant="ghost"
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
              />
              <Button
                disabled={!isValid}
                form="delete-form"
                size="sm"
                variant="destructive"
                isPending={isDeleting}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </footer>
    </div>
  );
}
