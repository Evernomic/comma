"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { proPlan } from "@/config/subscriptions";
import { userCategories, userLocations } from "@/lib/constants";
import { categoryValues, locationValues } from "@/lib/validations/user";
import { Period } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
  useTransition,
} from "react";
import { Controller, useForm } from "react-hook-form";
import slugify from "slugify";
import * as z from "zod";
import { Combobox } from "../ui/combobox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import { Icons } from "./icons";

const schema = z.object({
  name: z.string().min(1),
  username: z.string().min(1),
  category: z.enum(categoryValues),
  location: z.enum(locationValues),
});

type FormData = z.infer<typeof schema>;

export default function Onboarding({ user }: { user: User }) {
  const [isProfileCompleted, setIsProfileCompleted] = useState<boolean>(false);

  return (
    <div className="w-[400px] max-[400px]:w-full mx-auto p-10 flex flex-col items-center justify-center min-h-screen ">
      {isProfileCompleted ? (
        <Plans />
      ) : (
        <CompleteProfile
          user={user}
          setIsProfileCompleted={setIsProfileCompleted}
        />
      )}
    </div>
  );
}

function CompleteProfile({
  user,
  setIsProfileCompleted,
}: {
  user: User;
  setIsProfileCompleted: Dispatch<SetStateAction<boolean>>;
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
      username: user.username.length <= 20 ? user.username : undefined,
      category: user.category!,
    },
  });

  const name = watch("name");
  const onSubmit = async (data: FormData) => {
    startTransition(async () => {
      const res = await fetch("/api/user", {
        method: "PATCH",
        body: JSON.stringify({
          ...(user.name !== data.name && {
            name: data.name,
          }),
          ...(user.username !== data.username && {
            username: data.username,
          }),
          ...(user.category !== data.category && {
            category: data.category,
          }),
          ...(user.location !== data.location && {
            location: data.location,
          }),
        }),
      });
      if (!res.ok) {
        const err = await res.text();
        toast({
          title: err,
          variant: "destructive",
        });
      } else {
        if (!user.lsId || !user.lsVariantId || !user.lsCurrentPeriodEnd) {
          setIsProfileCompleted(true);
        } else {
          router.push("/articles");
          router.refresh();
        }
      }
    });
  };

  useEffect(() => {
    if (name !== user.name) {
      setValue(
        "username",
        slugify(name, {
          replacement: "",
          remove: /[^a-zA-Z0-9]/g,
          lower: true,
          strict: true,
          trim: true,
        }) ?? "",
      );
    }
  }, [name]);

  return (
    <>
      <div>
        <h2 className="text-xl">Welcome to Comma</h2>
        <p className="text-gray-4 text-sm mt-2">
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
              defaultValue={value ?? undefined}
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
          Continue
        </Button>
      </form>
    </>
  );
}

function Plans() {
  const [period, setPeriod] = useState<Period>("monthly");
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();
  const { title, description } = proPlan;

  async function billing(e: FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const res = await fetch("/api/user/billing", {
        method: "POST",
        body: JSON.stringify({
          plan: "pro",
          period,
        }),
      });
      if (!res?.ok) {
        toast({
          title: "Something went wrong.",
          description: "Please refresh the page and try again.",
        });
      } else {
        const data = await res.json();
        if (data) {
          window.location.href = data.url;
        }
      }
    });
  }

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-xl">You&apos;re on the free plan.</h2>
        <p className="text-gray-4 text-sm mt-2">
          If you want to use all features without limits, you can upgrade to the
          Pro plan
        </p>
      </div>

      <div className="bg-gray-3 border border-gray-2 rounded-md p-2 mt-5 w-max justify-self-end text-xs text-gray-4 flex items-center gap-1">
        <label htmlFor="plan-switch">Monthly</label>
        <Switch
          id="plan-switch"
          aria-label="Plan period toggle"
          checked={period === "yearly"}
          onCheckedChange={(checked) =>
            setPeriod(checked ? "yearly" : "monthly")
          }
        />
        <label htmlFor="plan-switch">Yearly</label>
      </div>
      <div className="bg-gray-3 flex flex-col gap-4  border border-gray-2 rounded-md p-3">
        <header className="w-full flex justify-between items-center">
          <div className="space-y-1">
            <div>{title}</div>
            <p className="text-gray-4 text-xs">{description}</p>
          </div>
          <p className="text-lg  text-secondary tracking-wider  flex items-baseline gap-1">
            ${proPlan.price[period]}
            <span className="text-xs text-gray-4">
              / {period === "monthly" ? "month" : "year"}
            </span>
          </p>
        </header>

        <div className="flex flex-col gap-2 ">
          {proPlan.features.map((feature) => {
            const Icon = Icons[feature.icon];
            return (
              <p
                className="text-xs justify-start flex gap-2"
                key={feature.name}
              >
                <Icon
                  size={15}
                  className={
                    feature.icon === "x" ? "text-danger" : "text-grass"
                  }
                />
                {feature.name}
              </p>
            );
          })}
        </div>
      </div>
      <div className="mt-4 space-y-3">
        <Button
          variant="primary"
          className="w-full"
          isPending={isLoading}
          onClick={billing}
        >
          Upgrade plan to Pro
        </Button>
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => {
            router.push("/articles");
            router.refresh();
          }}
        >
          Continue with Free
        </Button>
      </div>
    </div>
  );
}
