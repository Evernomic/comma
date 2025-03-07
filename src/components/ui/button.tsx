import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { Icons } from "../shared/icons";

const buttonVariants = cva(
  "flex h-5 cursor-pointer relative overflow-hidden flex-row items-center justify-center gap-1  px-2 rounded-md text-gray-1 outline-hidden transition-colors disabled:cursor-not-allowed disabled:opacity-70",
  {
    variants: {
      variant: {
        default:
          "border border-gray-2 bg-inherit text-gray-4 text-sm enabled:hover:bg-gray-2",
        destructive: "bg-danger text-primary",
        secondary:
          "bg-gray-3 enabled:hover:bg-gray-2 border border-gray-2 text-gray-4 enabled:hover:text-secondary ",
        ghost:
          "enabled:hover:bg-gray-2! bg-inherit text-gray-4 enabled:hover:text-secondary! data-[state=open]:bg-gray-2 data-[state=open]:text-secondary",
        primary:
          "bg-secondary text-primary opacity-100 hover:opacity-80 transition-opacity ",
      },
      size: {
        sm: "h-4.5 text-xs",
        icon: "size-4.5 p-0 hover:text-secondary",
        wide: "w-full text-sm px-4",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  title?: string;
  isPending?: boolean | string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      asChild = false,
      children,
      size,
      title,
      isPending,
      disabled,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={!!isPending || disabled}
        {...props}
      >
        {title ?? children}
        {isPending && (
          <span
            className={cn(
              "size-full flex gap-1 bg-inherit justify-center items-center absolute",
              variant === "default" && "bg-gray-2!",
            )}
          >
            <Icons.spinner
              size={size === "wide" ? 18 : 15}
              className="left-0 top-0 animate-spin"
            />
            {typeof isPending === "string" ? isPending : null}
          </span>
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export default Button;

export { buttonVariants };
