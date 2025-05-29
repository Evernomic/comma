import { cn } from "@/lib/utils";
import type * as React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export function EmptyPlaceholder({ className, children, ...props }: Props) {
  return (
    <div
      className={cn(
        "flex min-h-[200px] flex-col items-center justify-center rounded-md border  bg-gray-3  p-8 text-center",
        className,
      )}
      {...props}
    >
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        {children}
      </div>
    </div>
  );
}

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

EmptyPlaceholder.Title = function EmptyPlaceholderTitle({
  className,
  ...props
}: TitleProps) {
  return <h2 className={cn("text-lg font-medium", className)} {...props} />;
};

interface DescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

EmptyPlaceholder.Description = function EmptyPlaceholderDescription({
  className,
  ...props
}: DescriptionProps) {
  return (
    <p
      className={cn("text-md mt-1 text-center text-sm text-gray-4", className)}
      {...props}
    />
  );
};
