"use client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { subscribeSchema } from "@/lib/validations/subscribe";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";

type FormData = z.infer<typeof subscribeSchema>;

export default function Newsletter({username}: {username: string}) {
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
    <dl className="section-container gap-3  rounded-md">
      <dt className="section-title flex-col items-start gap-1">
        <h3>Newsletter</h3>
        <p className="text-gray-4 text-sm">
          Subscribe to be notified of new articles
        </p>
      </dt>
      <dd className="section-content pb-0">
        <form
          id="subscribe-newsletter"
          className="flex gap-2 items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            type="email"
            placeholder="Enter your email"
            disabled={pending}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs font-bold text-danger">
              {errors.email.message}
            </p>
          )}
          <Button
            isPending={pending}
            variant="secondary"
            className="px-12"
            form="subscribe-newsletter"
          >
            Subscribe
          </Button>
        </form>
      </dd>
    </dl>
  );
}
