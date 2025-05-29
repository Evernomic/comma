import { cn } from "@/lib/utils";
import type * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {}

function Badge({ className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex w-max items-center rounded-md border  bg-gray-3  px-2.5 py-0.5 text-gray-4 text-xs font-medium transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2",
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
