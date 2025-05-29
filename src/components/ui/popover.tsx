"use client";

import { cn } from "@/lib/utils";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as React from "react";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverClose = PopoverPrimitive.Close;

const PopoverContent = React.forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
    excludePortal?: boolean;
  }
>(
  (
    {
      className,
      align = "start",
      sideOffset = 4,
      excludePortal = false,
      ...props
    },
    ref,
  ) => {
    const popoverClassName = cn(
      "text-gray z-50 -ml-1 w-auto rounded-md bg-gray-3 p-1 shadow-md border   outline-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    );
    if (excludePortal) {
      return (
        <PopoverPrimitive.Content
          ref={ref}
          align={align}
          sideOffset={sideOffset}
          className={popoverClassName}
          {...props}
        />
      );
    }

    return (
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          ref={ref}
          align={align}
          sideOffset={sideOffset}
          className={popoverClassName}
          {...props}
        />
      </PopoverPrimitive.Portal>
    );
  },
);
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverClose, PopoverContent, PopoverTrigger };
