"use client";
import { cn } from "@/lib/utils";
import type { SelectOption } from "@/types";
import { useRouter } from "next/navigation";
import type React from "react";
import {
  cloneElement,
  type FormEvent,
  isValidElement,
  useId,
  useMemo,
  useState,
  useTransition,
} from "react";
import { Icons } from "../shared/icons";
import Upgrade from "../shared/upgrade";
import Button from "../ui/button";
import { Combobox } from "../ui/combobox";
import Input from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import { TagInput } from "../ui/tag-input";
import { Textarea } from "../ui/textarea";
import { toast } from "../ui/use-toast";

interface FormProps {
  title: string;
  description?: string;
  type?: "input" | "textarea" | "tag-input";
  helpText?: string;
  inputData?: React.InputHTMLAttributes<HTMLInputElement>;
  textareaData?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  endpoint: string;
  method?: "PATCH";
  required?: boolean;
  prefix?: string | React.ReactNode;
  suffix?: string | React.ReactNode;
  asChild?: boolean;
  toggle?: boolean;
  selectOptions?: SelectOption[];
  selectType?: "default" | "combobox";
  children?: React.ReactNode;
  proFeature?: boolean;
  toggleStates?: [string, string];
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
  toggle = false,
  toggleStates = ["Enabled", "Disabled"],
  selectOptions = undefined,
  selectType = "default",
  proFeature = false,
}: FormProps) {
  const [saving, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [value, setValue] = useState<any>(
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

  const Comp = asChild ? "div" : "form";
  const formId = useId();
  return (
    <Comp
      className="overflow-hidden relative rounded-md border "
      onSubmit={(e) => (!asChild ? onSubmit(e) : e.preventDefault())}
      id={formId}
    >
      {proFeature && <Upgrade />}
      <div className="flex flex-col gap-1 p-4">
        <div className="font-medium">{title}</div>
        <p className="text-sm text-gray-4 mb-2">{description}</p>
        {!asChild ? (
          <div>
            {type === "input" ? (
              <>
                {toggle ? (
                  <div className="flex items-center gap-2 text-sm text-gray-4">
                    <Switch
                      type="submit"
                      onCheckedChange={(checked) => setValue(checked)}
                      defaultChecked={inputData?.defaultChecked}
                      form={formId}
                      disabled={saving}
                    />{" "}
                    <label>
                      {inputData?.defaultChecked
                        ? toggleStates[0]
                        : toggleStates[1]}
                    </label>
                    {suffix}
                  </div>
                ) : selectOptions && selectOptions?.length > 0 ? (
                  <div>
                    {selectType === "combobox" ? (
                      <Combobox
                        defaultValue={inputData?.defaultValue as string}
                        onValueChange={(val) => setValue(val)}
                        disabled={saving}
                        placeholder={inputData?.placeholder}
                        options={selectOptions}
                        className="w-[250px]"
                      />
                    ) : (
                      <Select
                        defaultValue={inputData?.defaultValue as string}
                        onValueChange={(val) => setValue(val)}
                        disabled={saving}
                      >
                        <SelectTrigger className="w-[250px] max-md:w-full">
                          <SelectValue placeholder={inputData?.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {selectOptions.map((option) => (
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
                  </div>
                ) : (
                  <div className="flex items-center relative w-max">
                    {prefix && (
                      <span className="h-5 rounded-l-md bg-gray-3 flex items-center justify-center px-2 border  border-r-0 text-sm text-gray-4">
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
                      autoComplete="off"
                      disabled={saving}
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
                      <span className="h-5 rounded-r-md bg-gray-3 flex items-center justify-center px-2 border  border-l-0 text-sm text-gray-4">
                        {suffix}
                      </span>
                    )}
                  </div>
                )}
              </>
            ) : type === "tag-input" ? (
              <TagInput value={value} onValueChange={setValue} />
            ) : (
              <Textarea
                {...textareaData}
                className="max-w-[400px] max-md:w-full"
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
            )}
          </div>
        ) : isValidElement(children) ? (
          cloneElement(children as any, { startTransition })
        ) : null}
      </div>
      <footer className="flex h-auto flex-row items-center   justify-between border-t  bg-gray-3 px-4 py-2">
        <div className={cn("text-sm text-gray-4", error ? "text-danger" : "")}>
          {(saving && toggle) || (asChild && saving) ? (
            <Icons.spinner className="animate-spin" size={15} />
          ) : (
            error || helpText
          )}
        </div>

        <Button
          type={toggle || asChild ? "button" : "submit"}
          size="sm"
          className={cn((toggle || asChild) && "invisible")}
          disabled={disabledButton}
          isPending={saving}
          form={formId}
        >
          Save
        </Button>
      </footer>
    </Comp>
  );
}
