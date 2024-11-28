"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Square, SquareCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

type Props<T> = {
  items: T[];
  triggerText: string;
  searchPlaceholder: string;
  emptyText: string;
  selectedItems: T[];
  onItemsSelect?: (items: T[]) => void;
};

export function Combobox<T extends { id: string; name: string }>({
  items,
  triggerText,
  searchPlaceholder,
  emptyText,
  selectedItems,
  onItemsSelect,
}: Props<T>) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const refList = useRef<HTMLDivElement>(null);

  useEffect(() => {
    refList.current?.scrollTo(0, 0);
  }, [search]);

  useEffect(() => {
    setSearch("");
  }, [open]);

  const handleSelect = (itemId: string) => {
    const item = items.find((i) => i.id === itemId)!;
    onItemsSelect?.(
      selectedItems.some((i) => i.id === item.id)
        ? selectedItems.filter((i) => i !== item)
        : [...selectedItems, item],
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">{triggerText}</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={searchPlaceholder}
            value={search}
            onValueChange={setSearch}
          />
          {selectedItems.length > 0 && (
            <>
              <CommandGroup
                heading="Selected:"
                className="max-h-32 overflow-scroll"
              >
                {selectedItems.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.id}
                    onSelect={handleSelect}
                  >
                    <CheckItem isChecked={true} />
                    {item.name}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </>
          )}

          <CommandList ref={refList}>
            <CommandEmpty>{emptyText}</CommandEmpty>

            <CommandGroup>
              {items
                .filter((item) =>
                  item.name.toLowerCase().includes(search.toLowerCase()),
                )
                .map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.id}
                    onSelect={handleSelect}
                  >
                    <CheckItem
                      isChecked={selectedItems.some((i) => i.id === item.id)}
                    />
                    {item.name}
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
  return isChecked ? <SquareCheck fill="black" color="white" /> : <Square />;
}
