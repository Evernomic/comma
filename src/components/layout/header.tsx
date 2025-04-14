import { cn } from "@/lib/utils";
import React from "react";
import NavButton from "./nav-button";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  titleAsChild?: boolean;
  backButton?: boolean;
  asChild?: boolean;
}

export default function AppHeader({
  title,
  description,
  children,
  titleAsChild = false,
  asChild = false,
  className,
  backButton = false,
}: Props) {
  if (!title && !backButton && !asChild && !titleAsChild) {
    return null;
  }

  return (
    <div className={cn("flex items-center justify-between", className)}>
      {backButton && (
        <NavButton
          variant="text"
          size="sm"
          direction="ltr"
          buttonVariant="ghost"
          href="/"
          className="mr-2"
          icon="arrowLeft"
        >
          Back to home
        </NavButton>
      )}
      {(title || description) && !asChild && (
        <div className="flex flex-col gap-1">
          {titleAsChild
            ? children
            : title && <h3 className="title text-lg font-medium ">{title}</h3>}
          {description && (
            <p className="description text-sm text-gray-4">{description}</p>
          )}
        </div>
      )}
      {(!titleAsChild || asChild) && children}
    </div>
  );
}
