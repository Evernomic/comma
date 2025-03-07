"use client";

import { useEffect, useState } from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { SelectOption } from "@/types";
import type { SelectProps } from "@radix-ui/react-select";
import { Icons } from "../shared/icons";
import Button from "./button";

interface ComboboxProps extends SelectProps {
  placeholder?: string;
  value?: string;
  options: SelectOption[];
  onValueChange: (value: string) => void;
  className?: string;
}

export function Combobox({
  placeholder,
  disabled,
  className,
  defaultValue,
  options,
  onValueChange,
}: ComboboxProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>(defaultValue ?? "");

  useEffect(() => {
    onValueChange(value);
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between data-[state=open]:bg-gray-3 text-secondary text-sm hover:bg-inherit! disabled:bg-gray-3 disabled:opacity-100",
            className,
          )}
          disabled={disabled}
        >
          {value
            ? options.find((option) => option.value === value)?.title
            : placeholder}
          <Icons.chevronsUpDown size={20} className="text-gray-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="ml-0 size-auto p-0 border-0">
        <Command className="border border-gray-2 bg-gray-3 text-gray-1 pb-0">
          <CommandInput placeholder="Search..." className="h-10" />
          <CommandList className="max-h-48 min-w-[10rem]">
            <CommandEmpty>No results.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={`option--${option.value}`}
                  className="py-1.5 px-2 text-sm outline-hidden focus:bg-gray-2 text-gray-1! flex-row-reverse justify-between"
                  value={option.title}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : option.value);
                    setOpen(false);
                  }}
                >
                  <Icons.check
                    size={20}
                    className={cn(
                      value === option.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {option.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
