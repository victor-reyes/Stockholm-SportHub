"use client";

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
import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

type Props<T> = {
  items: T[];
  triggerText: string;
  searchPlaceholder: string;
  emptyText: string;
};

export function Combobox<T extends { id: string; text: string }>({
  items,
  triggerText,
  searchPlaceholder,
  emptyText,
}: Props<T>) {
  const [checkedItems, setCheckedItems] = useState(Array<T>());
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const refList = useRef<HTMLDivElement>(null);

  useEffect(() => {
    refList.current?.scrollTo(0, 0);
  }, [search]);

  useEffect(() => {
    setSearch("");
  }, [open]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          {checkedItems.length > 0
            ? checkedItems.map((item) => item.text).join("/")
            : triggerText}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={searchPlaceholder}
            value={search}
            onValueChange={setSearch}
          />
          {checkedItems.length > 0 && (
            <CommandGroup
              heading="Selected:"
              className="max-h-32 overflow-scroll"
            >
              {checkedItems.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.id}
                  onSelect={() => {
                    setCheckedItems((prev) => prev.filter((f) => f !== item));
                  }}
                >
                  <CheckItem isChecked={true} />
                  {item.text}
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          <CommandList ref={refList}>
            <CommandEmpty>{emptyText}</CommandEmpty>

            <CommandGroup>
              {items
                .filter((item) =>
                  item.text.toLowerCase().includes(search.toLowerCase()),
                )
                .map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.id}
                    onSelect={() => {
                      setCheckedItems((prev) => {
                        if (prev.includes(item)) {
                          return prev.filter((f) => f !== item);
                        }
                        return [...prev, item];
                      });
                      setOpen(false);
                    }}
                  >
                    <CheckItem isChecked={checkedItems.includes(item)} />
                    {item.text}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function CheckItem({ isChecked }: { isChecked: boolean }) {
  return (
    <Check
      className={cn("mr-2 h-4 w-4", isChecked ? "opacity-100" : "opacity-0")}
    />
  );
}
