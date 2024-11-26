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

type Props = { facilities: Facility[] };
type Facility = { id: string; value: string; text: string };

export function FacilityCombobox({ facilities }: Props) {
  const [checkedFacilities, setCheckedFacilities] = useState<Facility[]>([]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const refList = useRef<HTMLDivElement>(null);

  useEffect(() => {
    refList.current?.scrollTo(0, 0);
  }, [search]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          {checkedFacilities.length > 0
            ? checkedFacilities.map((facility) => facility.text).join("/")
            : "Select Facility"}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search facility..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList ref={refList}>
            <CommandEmpty>No facility found.</CommandEmpty>
            <CommandGroup>
              {facilities
                .filter((facility) =>
                  facility.text.toLowerCase().includes(search.toLowerCase()),
                )
                .map((facility) => (
                  <CommandItem
                    key={facility.id}
                    value={facility.id}
                    onSelect={() => {
                      setCheckedFacilities((prev) => {
                        if (prev.includes(facility)) {
                          return prev.filter((f) => f !== facility);
                        }
                        return [...prev, facility];
                      });
                      setOpen(false);
                    }}
                  >
                    <CheckItem
                      isChecked={checkedFacilities.includes(facility)}
                    />
                    {facility.text}
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
