"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { userCategories, userLocations } from "@/lib/constants";
import slugify from "slugify";
import { categoryValues, locationValues } from "@/lib/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Combobox } from "../ui/combobox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const schema = z.object({
  name: z.string().min(1),
  username: z.string().min(1),
  category: z.enum(categoryValues),
  location: z.enum(locationValues),
});

type FormData = z.infer<typeof schema>;

export default function Onboarding({
  user,
}: {
  user: Pick<User, "name" | "username" | "category">;
}) {
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();
  const {
    handleSubmit,
    control,
    register,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.name!,
      username: user.username,
      category: user.category!,
    },
  });

  const name = watch("name")
  const onSubmit = async (data: FormData) => {
    startTransition(async () => {
      const res = await fetch("/api/user", {
        method: "PATCH",
        body: JSON.stringify({
          ...(user.name !== data.name && {
            name: data.name
          }),
          ...(user.username !== data.username && {
            username: data.username
          }),
          ...(user.category !== data.category && {
            category: data.category
          }),
          location: data.location
        }),
      });
      if (!res.ok) {
        const err = await res.text()
        toast({
          title: err,
          variant: "destructive"
        });
      } else {
        router.push("/articles");
        router.refresh();
      }
    });
  };

  useEffect(() => {
    if(name !== user.name) {
      setValue("username", slugify(name,{
        replacement: "",
        remove: /[^a-zA-Z0-9]/g,
        lower: true,
        strict: true,
        trim: true,
      }) ?? "");
    }
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
        <Controller
          control={control}
          {...register("category")}
          render={({ field: { onChange, value } }) => (
            <Select
              defaultValue={value}
              disabled={isLoading}
              onValueChange={onChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {userCategories.map((option) => (
                  <SelectItem
                    value={option.value}
                    key={`option--${option.value}`}
                  >
                    {option.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <Controller
          control={control}
          {...register("location")}
          render={({ field: { onChange, value } }) => (
            <Combobox
              defaultValue={value}
              onValueChange={onChange}
              disabled={isLoading}
              placeholder="Select country"
              options={userLocations}
            />
          )}
        />
        <Button disabled={!isValid} isPending={isLoading}>
          Start writing
        </Button>
      </form>
    </div>
  );
}
