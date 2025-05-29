import { cn } from "@/lib/utils";
import * as React from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, children, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "max-h-[140px] min-h-[70px] w-full  rounded-md border   bg-transparent p-2 text-sm text-secondary outline-hidden transition-colors placeholder:text-gray-1 focus:border-gray-1 disabled:cursor-not-allowed disabled:bg-gray-3",
          className,
          error && "border-danger!",
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
