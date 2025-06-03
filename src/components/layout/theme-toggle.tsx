"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Icons } from "../shared/icons";
import Button from "../ui/button";

export default function ThemeToggle({
  compact = false,
  onlyText = false,
  className,
  iconSize = 15,
  size =  4.5
}: {
  compact?: boolean;
  onlyText?: boolean;
  className?: string;
  iconSize?: number;
  size?: number;
}) {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";
  const toggle = () => setTheme(isDark ? "light" : "dark");
  const text = isDark ? "Switch to light" : "Switch to dark";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  if (onlyText) {
    return (
      <p
        onClick={toggle}
        className="w-max text-xs text-gray-4 hover:text-secondary transition-colors cursor-pointer"
      >
        {text}
      </p>
    );
  }

  return (
    <Button
      onClick={toggle}
      className={cn(
        "justify-start text-secondary hover:text-secondary gap-2 dark:[&_.moon-icon]:hidden [&_.sun-icon]:hidden dark:[&_.sun-icon]:inline",
        compact ? "justify-center text-gray-4" : "",
        className,
        {
          "size-5": compact && size === 5
        }
      )}
      size={compact ? "icon" : "sm"}
      variant="ghost"
      // aria-label={text}
    >
      <Icons.sun size={iconSize} className="sun-icon" />
      <Icons.moon size={iconSize} className="moon-icon" />
      {!compact && <span className="text-xs ">{text}</span>}
    </Button>
  );
}
