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
import { Badge } from "./badge";
import Button from "./button";

interface ComboboxProps
  extends Omit<SelectProps, "onValueChange" | "defaultValue"> {
  value?: string;
  name: string;
  options: SelectOption[];
  onValueChange: (value: string[]) => void;
  className?: string;
  defaultValue?: string[];
}

export function Filter({
  disabled,
  className,
  name,
  defaultValue,
  options,
  onValueChange,
}: ComboboxProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedValues, setSelectedValues] = useState<string[]>(
    defaultValue ?? [],
  );

  useEffect(() => {
    onValueChange(selectedValues);
  }, [selectedValues]);

  const onSelect = (value: string) => {
    if (selectedValues.includes(value)) {
      setSelectedValues((prev) => prev.filter((v) => v !== value));
    } else {
      setSelectedValues((prev) => [...prev, value]);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          size="sm"
          variant="secondary"
          aria-expanded={open}
          className={cn(
            "w-max max-w-36 justify-between data-[state=open]:bg-gray-2 text-secondary text-xs",
            className,
            selectedValues.length && "bg-gray-3",
          )}
          disabled={disabled}
        >
          {`${name}${selectedValues.length > 0 ? ":" : ""}`}

          <span
            className={cn("hidden truncate", selectedValues.length && "block")}
          >
            {selectedValues
              .map(
                (value) =>
                  options?.find((option) => option.value === value)?.title,
              )
              .join(", ")}
          </span>
          <Icons.chevronsUpDown
            size={18}
            className={cn("text-gray-4", selectedValues.length > 0 && "hidden")}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="ml-0 size-auto p-0 border-0" align="end">
        <Command className="border border-gray-2 flex flex-col bg-gray-3 text-gray-1 pb-0 w-[16rem]">
          <CommandInput placeholder="Search..." className="h-10 items-center">
            <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
              Done
            </Button>
          </CommandInput>
          <CommandList className="max-h-56 border-t border-t-gray-2">
            {selectedValues.length > 0 && (
              <div className="px-1 flex-1 flex gap-1 flex-wrap  mt-2">
                {selectedValues.map((value) => (
                  <Badge className="bg-gray-2 gap-1 " key={value}>
                    {options?.find((option) => option.value === value)?.title}
                    <Icons.x
                      size={12}
                      onClick={() => onSelect(value)}
                      className="cursor-pointer"
                    />
                  </Badge>
                ))}

                <Badge
                  className="bg-gray-2 gap-1 cursor-pointer"
                  onClick={() => setSelectedValues([])}
                >
                  Clear all
                </Badge>
              </div>
            )}
            <CommandEmpty>No results.</CommandEmpty>
            <CommandGroup>
              {options?.map((option) => (
                <CommandItem
                  key={`option--${option.value}`}
                  className="py-1.5 px-2 text-sm outline-none focus:bg-gray-2 !text-gray-1 flex-row-reverse justify-between"
                  value={option.title}
                  onSelect={() => onSelect(option.value)}
                >
                  <Icons.check
                    size={20}
                    className={cn(
                      selectedValues.includes(option.value)
                        ? "opacity-100"
                        : "opacity-0",
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
