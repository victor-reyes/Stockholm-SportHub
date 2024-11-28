"use client";

import { TimeSlotItem } from "./time-slot-item";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { FacilitiesBookingWithTimeSlots } from "@/features/book/types";
import { useState } from "react";

type Props = {
  facilities: FacilitiesBookingWithTimeSlots[];
};

export function Facilities({ facilities }: Props) {
  const [showOccupied, setShowOccupied] = useState(false);

  return (
    <div>
      <div className="flex gap-2 items-baseline justify-between">
        <h2>Facilities</h2>

        <div className="flex gap-1 items-center">
          <Switch
            checked={showOccupied}
            onCheckedChange={setShowOccupied}
            id="availability-mode"
          ></Switch>
          <Label htmlFor="availability-mode">Show occupied</Label>
        </div>
      </div>
      <ul>
        {facilities.map((facility) => (
          <li key={facility.id}>
            {facility.name}
            <ul className="not-prose space-y-2">
              {facility.timeSlots
                .filter((timeSlot) => showOccupied || timeSlot.state === "free")
                .map((timeSlot, index) => (
                  <TimeSlotItem key={index} timeSlot={timeSlot} />
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
