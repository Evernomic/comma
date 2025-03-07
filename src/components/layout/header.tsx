import { cn } from "@/lib/utils";
import type React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
}

export default function AppHeader({
  title,
  description,
  children,
  className,
}: Props) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div className="flex flex-col gap-1">
        {title && <h3 className="title text-lg font-medium ">{title}</h3>}
        {description && (
          <p className="description text-sm text-gray-4">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}
