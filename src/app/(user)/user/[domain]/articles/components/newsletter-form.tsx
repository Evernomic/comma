"use client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { subscribeSchema } from "@/lib/validations/subscribe";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";

type FormData = z.infer<typeof subscribeSchema>;


export default function NewsletterForm({
  username,
  prefix = "newsletter",
  className,
}: {
  username: string;
  prefix?: string;
  className?: string;
}) {
  const [pending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(subscribeSchema),
  });

  const onSubmit = async (data: FormData) => {
    startTransition(async () => {
      const res = await fetch("/api/subscribers", {
        method: "POST",
        body: JSON.stringify({
          email: data.email,
          username,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        toast({
          title: "Something went wrong",
          description: text,
        });
      } else {
        reset();
        toast({
          title: "You are now subscribed",
        });
      }
    });
  };
  return (
    <form
      id={`${prefix}-subscribe-newsletter`}
      className={cn("flex gap-2 items-center", className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        type="email"
        placeholder="Enter your email"
        className="bg-primary"
        disabled={pending}
        {...register("email")}
      />
      {errors.email && (
        <p className="text-xs font-bold text-danger">{errors.email.message}</p>
      )}
      <Button
        isPending={pending}
        className="flex-1/3 bg-primary"
        form={`${prefix}-subscribe-newsletter`}
      >
        Subscribe
      </Button>
    </form>
  );
}
