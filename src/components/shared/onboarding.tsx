"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { slugify } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const schema = z.object({
  name: z.string().min(1),
  username: z.string().min(1),
});

type FormData = z.infer<typeof schema>;

export default function Onboarding() {
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const name = watch("name");
  const onSubmit = async (data: FormData) => {
    startTransition(async () => {
      const res = await fetch("/api/user", {
        method: "PATCH",
        body: JSON.stringify({
          name: data.name,
          username: data.username,
        }),
      });
      if (!res.ok) {
        toast({
          title: "Username already in use",
        });
      } else {
        router.push("/articles");
        router.refresh();
      }
    });
  };

  useEffect(() => {
    setValue("username", slugify(name) ?? "");
  }, [name]);
  return (
    <div className="w-[400px] mx-auto p-10 flex flex-col items-center justify-center min-h-screen ">
      <div>
        <h2 className="text-xl">Welcome to Comma</h2>
        <p className="text-gray-1 text-sm mt-2">
          We just need a few details to finish creating your account. You can
          always change this later.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 flex flex-col gap-2 w-full"
      >
        <Input
          placeholder="Enter your name"
          {...register("name")}
          disabled={isLoading}
          autoFocus
        />
        {errors?.name && (
          <b className="text-xs text-danger">{errors.name.message}</b>
        )}
        <Input
          placeholder="Enter your username"
          {...register("username")}
          disabled={isLoading}
        />
        {errors?.username && (
          <b className="text-xs text-danger">{errors.username.message}</b>
        )}
        <Button disabled={!isValid} isPending={isLoading}>
          Start writing
        </Button>
      </form>
    </div>
  );
}
