"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import type React from "react";
import { type FormEvent, useMemo, useState, useTransition } from "react";
import { Icons } from "../shared/icons";
import Button from "../ui/button";
import Input from "../ui/input";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/use-toast";

interface FormProps {
  title: string;
  description?: string;
  type?: "input" | "textarea";
  helpText?: string;
  inputData?: React.InputHTMLAttributes<HTMLInputElement>;
  textareaData?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  endpoint: string;
  method?: "PATCH";
  required?: boolean;
  prefix?: string;
  suffix?: string;
  asChild?: boolean;
  children?: React.ReactNode;
}

export default function Form({
  type = "input",
  method = "PATCH",
  endpoint,
  title,
  description,
  helpText,
  inputData,
  textareaData,
  children,
  prefix,
  suffix,
  required = true,
  asChild = false,
}: FormProps) {
  const [saving, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [value, setValue] = useState(
    inputData?.defaultValue || textareaData?.defaultValue || "",
  );
  const router = useRouter();
  const disabledButton = useMemo(() => {
    return (
      saving ||
      (!required ? false : !value) ||
      inputData?.defaultValue === value ||
      textareaData?.defaultValue === value
    );
  }, [
    value,
    saving,
    inputData?.defaultValue,
    textareaData?.defaultValue,
    required,
  ]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      const res = await fetch(`/api/${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          [(textareaData?.name || inputData?.name) as string]:
            inputData?.type === "number"
              ? Number(value)
              : value.toString().trim().length
                ? value
                : null,
        }),
      });
      if (!res.ok) {
        if (res.status === 422) {
          const error = await res.text();
          setError(error);
        }
        toast({
          title: "Something went wrong.",
          variant: "destructive",
        });
      } else {
        router.refresh();

        toast({
          title: "Saved",
        });
      }
    });
  }

  return (
    <form
      className="overflow-hidden rounded-md border border-gray-2"
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-1 p-4">
        <h1>{title}</h1>
        <p className="text-sm text-gray-4">{description}</p>
        {!asChild && (
          <div className="mt-2">
            {type === "input" ? (
              <div className="flex items-center relative w-max">
                {prefix && (
                  <span className="h-5 rounded-l-md bg-gray-3 flex items-center justify-center px-2 border border-gray-2 border-r-0 text-sm text-gray-4">
                    {prefix}
                  </span>
                )}
                <Input
                  {...inputData}
                  type={
                    inputData?.type === "password" && showPassword
                      ? "text"
                      : (inputData?.type ?? "text")
                  }
                  value={value}
                  autoComplete="off"
                  className={cn(
                    "w-[250px] max-md:w-full",
                    prefix ? "rounded-l-none " : "",
                    suffix ? "rounded-r-none" : "",
                  )}
                  onChange={(e) => setValue(e.target.value)}
                />
                {inputData?.type === "password" && (
                  <span
                    className="text-gray-4 cursor-pointer absolute right-3"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <Icons.eye size={18} />
                    ) : (
                      <Icons.eyeOff size={18} />
                    )}
                  </span>
                )}
                {suffix && (
                  <span className="h-5 rounded-r-md bg-gray-3 flex items-center justify-center px-2 border border-gray-2 border-l-0 text-sm text-gray-4">
                    {suffix}
                  </span>
                )}
              </div>
            ) : (
              <Textarea
                className="w-[350px] max-md:w-full"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
                {...textareaData}
              />
            )}
          </div>
        )}
        {asChild && children}
      </div>
      <footer className="flex h-auto flex-row items-center   justify-between border-t border-gray-2 bg-gray-3 px-4 py-2">
        <div className={cn("text-sm text-gray-4", error ? "text-danger" : "")}>
          {error || helpText}
        </div>

        <Button
          type="submit"
          size="sm"
          className={cn(asChild && "invisible")}
          disabled={disabledButton}
          isPending={saving}
        >
          Save
        </Button>
      </footer>
    </form>
  );
}
