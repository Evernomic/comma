"use client";

import { useGTM } from "@/hooks/use-gtm";
import { capitalize, cn } from "@/lib/utils";
import { authFormSchema } from "@/lib/validations/auth";
import type { Icon } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Balancer from "react-wrap-balancer";
import type * as z from "zod";
import NavButton from "../layout/nav-button";
import { Icons } from "../shared/icons";
import Button from "../ui/button";
import Input from "../ui/input";
import { toast } from "../ui/use-toast";

type FormData = z.infer<typeof authFormSchema>;

type EmailProvider = {
  name: string;
  href: string;
  icon: Icon;
};

const authMethods = ["google", "github", "email"] as const;

const emailProviders: EmailProvider[] = [
  {
    name: "Gmail",
    icon: "gmail",
    href: "https://mail.google.com",
  },
  {
    name: "Outlook",
    icon: "outlook",
    href: "https://outlook.live.com",
  },
  {
    name: "iCloud Mail",
    icon: "icloudMail",
    href: "https://icloud.com/mail",
  },
] as const;
type AuthMethod = (typeof authMethods)[number];

export default function AuthForm() {
  const [authMethod, setAuthMethod] = useState<AuthMethod | undefined>();
  const [isMailSent, setIsMailSent] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(authFormSchema),
  });
  const [isLoading, setIsLoading] = useState<string | boolean>();
  const { triggerSignUpEvent } = useGTM();
  const onSubmit = async (data: FormData) => {
    setIsLoading("email");

    const res = await signIn("email", {
      email: data.email,
      redirect: false,
    });

    setIsLoading(false);
    reset();

    if (!res?.ok) {
      return toast({
        title: "Something went wrong",
      });
    }

    triggerSignUpEvent();
    setIsMailSent(true);
    setAuthMethod(undefined);
  };
  return (
    <div
      className={cn(
        "flex flex-col p-5 rounded-md relative",
        isMailSent && "bg-gray-3",
      )}
    >
      {isMailSent ? (
        <div className="w-full  rounded-md flex flex-col items-center text-center">
          <Button
            onClick={() => setIsMailSent(false)}
            size="icon"
            variant="ghost"
            className="absolute left-2 top-2"
          >
            <Icons.arrowLeft size={18} />
          </Button>
          <Icons.mail size={35} />
          <h2 className="text-xl font-medium mt-2 mb-1">Check your inbox</h2>
          <p className="text-gray-4 text-sm">
            <Balancer>
              We sent you an activation link. Please be sure to check your spam
              folder too.
            </Balancer>
          </p>
          <div className="flex gap-2 mt-4">
            {emailProviders.map((p) => (
              <NavButton
                href={p.href}
                icon={p.icon}
                direction="ltr"
                aria-label={p.name}
                target="_blank"
                rel="noopener noreferrer"
                key={p.name}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center gap-4">
            <Icons.logo size={50} />
            <h1 className="text-center text-2xl font-medium">
              Welcome to Comma
            </h1>
          </div>
          <div className="flex gap-2 flex-col">
            {authMethods.map((method) => {
              if (authMethod !== method) {
                const Icon = Icons[method === "email" ? "mail" : method];
                return (
                  <Button
                    size="wide"
                    disabled={!!isLoading}
                    onClick={() => {
                      if (method !== "email") {
                        setIsLoading(method);
                        triggerSignUpEvent();
                        signIn(method);
                      } else {
                        setAuthMethod(method);
                      }
                    }}
                    key={method}
                  >
                    {isLoading === method ? (
                      <Icons.spinner size={18} className="animate-spin" />
                    ) : (
                      <Icon size={18} />
                    )}
                    Continue with {capitalize(method)}
                  </Button>
                );
              }
            })}

            {authMethod === "email" && (
              <form
                className="flex flex-col gap-2"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Input
                  type="email"
                  placeholder="Email"
                  autoCapitalize="none"
                  autoCorrect="off"
                  autoComplete="off"
                  autoFocus
                  disabled={!!isLoading}
                  {...register("email")}
                />
                {errors?.email && (
                  <b className="text-xs text-danger">{errors.email.message}</b>
                )}
                <Button
                  size="wide"
                  type="submit"
                  variant="secondary"
                  disabled={!!isLoading}
                  isPending={isLoading === "email"}
                >
                  Continue
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
