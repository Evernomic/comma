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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export const editNewsletterCTASchema = z.object({
  newsletterCTA: z.string().max(300),
});

type FormData = z.infer<typeof editNewsletterCTASchema>;

export default function EditNewsletterCTA({
  defaultNewsletterCta,
}: {
  defaultNewsletterCta: string | null;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(editNewsletterCTASchema),
    defaultValues: {
      newsletterCTA: defaultNewsletterCta ?? undefined,
    },
  });

  const onSubmit = async (data: FormData) => {
    startTransition(async () => {
      const res = await fetch("/api/user", {
        method: "PATCH",
        body: JSON.stringify({
          newsletterCta: data.newsletterCTA,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        toast({
          title: "Something went wrong",
          description: text,
        });
      } else {
        router.refresh();
        setIsOpen(false);
        toast({
          title: "Saved",
        });
      }
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" aria-label="Edit newsletter CTA" size="sm">
          <Icons.edit size={16} />
          Edit newsletter CTA
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit newsletter CTA</DialogTitle>
        </DialogHeader>
        <form
          id="edit-newsletter-cta"
          className="flex flex-col gap-1"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="text-xs text-gray-4 self-end">Markdown is supported</p>
          <Textarea
            placeholder="Type..."
            maxLength={300}
            disabled={pending}
            className="field-sizing-content"
            {...register("newsletterCTA")}
          />
          <div className="flex justify-between items-center">
            {errors.newsletterCTA && (
              <p className="text-xs font-bold text-danger">
                {errors.newsletterCTA.message}
              </p>
            )}
          </div>
          <p className="text-xs text-gray-4 self-end">
            {watch("newsletterCTA")?.length ?? "0"} of 300
          </p>
        </form>
        <DialogFooter>
          <Button
            type="submit"
            isPending={pending}
            size="sm"
            form="edit-newsletter-cta"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
