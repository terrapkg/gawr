import * as React from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

export function Combobox({
  values,
  defaultValue,
  group,
}: {
  values: CbValue[];
  defaultValue?: number;
  group: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(values[defaultValue ?? 0].value);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between px-5 py-6 sm:px-4 sm:py-2 text-lg sm:text-base"
        >
          {values.find((v) => v.value === value)?.label}
          <ChevronsUpDown className="ml-2 h-7 w-7 sm:h-4 sm:w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={`Search ${group}...`} />
          <CommandList>
            <CommandEmpty>No {group} found.</CommandEmpty>
            <CommandGroup>
              {values &&
                values.map &&
                values.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === framework.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {framework.label}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
