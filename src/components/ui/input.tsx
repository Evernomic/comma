import { cn } from "@/lib/utils";
import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "h-5 w-full rounded-md  border  border-gray-2 bg-transparent px-2 text-sm text-secondary outline-none transition-colors placeholder:text-gray-1 focus:border-gray-1 disabled:cursor-not-allowed disabled:bg-gray-3",
          className,
          error && "!border-danger",
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export default Input;
