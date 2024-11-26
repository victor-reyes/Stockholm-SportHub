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
import { useState } from "react";
import { Button } from "@/components/ui/button";

type Props = { facilities: Facility[] };
type Facility = { id: string; value: string; text: string };

export function FacilityCombobox({ facilities }: Props) {
  const [checkedFacilities, setCheckedFacilities] = useState<Facility[]>([]);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          {checkedFacilities.length > 0
            ? checkedFacilities.map((facility) => facility.text).join("/")
            : "Select Facility"}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command shouldFilter={false}>
          <CommandInput placeholder="Search facility..." />
          <CommandList>
            <CommandEmpty>No facility found.</CommandEmpty>
            <CommandGroup>
              {facilities.map((facility) => (
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
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      checkedFacilities.includes(facility)
                        ? "opacity-100"
                        : "opacity-0",
                    )}
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
