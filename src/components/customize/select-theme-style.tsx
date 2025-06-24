"use client";

import { themeStyles } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { UserPageTheme } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NavButton from "../layout/nav-button";
import { Icons } from "../shared/icons";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { toast } from "../ui/use-toast";

export default function SelectThemeStyle({
  startTransition,
  defaultTheme,
}: {
  startTransition?: React.TransitionStartFunction;
  defaultTheme: UserPageTheme;
}) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [selectedTheme, setSelectedTheme] =
    useState<UserPageTheme>(defaultTheme);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    if (isMounted) {
      startTransition?.(async () => {
        const res = await fetch("/api/user", {
          method: "PATCH",
          body: JSON.stringify({
            theme: selectedTheme,
          }),
          signal: controller.signal,
        });
        if (!res.ok) {
          const error = await res.text();
          toast({
            title: "Something went wrong.",
            description: error,
            variant: "destructive",
          });
        } else {
          router.refresh();
          if (selectedTheme !== "default") {
            router.push(
              `/settings/customize${selectedTheme === "linkInBio" ? "/themes/link-in-bio" : "/home"}`,
            );
          }
          toast({
            title: "Saved",
          });
        }
      });
    }

    return () => {
      controller.abort();
    };
  }, [selectedTheme]);
  return (
    <RadioGroup
      className="flex gap-2 justify-between"
      onValueChange={(val) => setSelectedTheme(val as UserPageTheme)}
      defaultValue={selectedTheme}
    >
      {themeStyles.map((option) => (
        <label
          className=" flex  flex-col  gap-2 justify-center "
          htmlFor={option.value}
          key={option.value}
        >
          <div
            className={cn(
              "relative border flex-1  p-4.4 rounded-md transition-colors  cursor-pointer hover:bg-gray-3  text-gray-1 w-50 min-h-64 flex justify-center items-center",
              {
                "bg-gray-3": selectedTheme === option.value,
              },
            )}
          >
            {option.value === "default" ? (
              <Icons.defaultThemeStyleSkeleton />
            ) : option.value === "linkInBio" ? (
              <Icons.linkInBioThemeStyleSkeleton />
            ) : (
              <Icons.freeStyleThemeStyleSkeleton />
            )}
            <RadioGroupItem
              value={option.value}
              className="absolute bg-primary right-2 top-2"
              id={option.value}
            />

            {option.value === selectedTheme &&
              (option.value === "freeStyle" ||
                option.value === "linkInBio") && (
                <NavButton
                  href={`/settings/customize${option.value === "linkInBio" ? "/themes/link-in-bio" : "/home"}`}
                  icon="edit"
                  iconSize={13}
                  direction="ltr"
                  buttonVariant="primary"
                  buttonClassname="absolute bottom-2 text-xs right-2"
                >
                  Edit
                </NavButton>
              )}
          </div>

          <span className="text-xs text-secondary">{option.title}</span>
        </label>
      ))}
    </RadioGroup>
  );
}
