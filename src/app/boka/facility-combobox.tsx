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
import { useState } from "react";
import { Button } from "@/components/ui/button";

type Props = { facilities: Facility[] };
type Facility = { id: string; value: string; text: string };

export function FacilityCombobox({ facilities }: Props) {
  const [checkedFacilities, setCheckedFacilities] = useState<Facility[]>([]);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Select Facility</Button>
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
