"use client";

import { TimeSlotItem } from "./time-slot-item";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { FacilitiesBookingWithTimeSlots } from "@/features/book/types";
import { useState } from "react";

type Props = {
  facilities: FacilitiesBookingWithTimeSlots[];
  bounds: google.maps.LatLngBounds | null;
};

export function FacilitiesBooking({ facilities, bounds }: Props) {
  const [showOccupied, setShowOccupied] = useState(false);
  const [updateOnMapMove, setUpdateOnMapMove] = useState(false);

  return (
    <div>
      <div className="flex gap-2 items-baseline justify-between">
        <h2>Facilities</h2>

        <div className="space-y-2 ">
          <div className="flex gap-1 items-center">
            <Switch
              checked={updateOnMapMove}
              onCheckedChange={setUpdateOnMapMove}
              id="update-on-map-move-mode"
            />
            <Label htmlFor="update-on-map-move-mode">Sync list with map</Label>
          </div>
          <div className="flex gap-1 items-center">
            <Switch
              checked={showOccupied}
              onCheckedChange={setShowOccupied}
              id="availability-mode"
            />
            <Label htmlFor="availability-mode">Show occupied</Label>
          </div>
        </div>
      </div>
      <ul>
        {facilities
          .filter((facility) => {
            if (updateOnMapMove && bounds) {
              const latLng = new google.maps.LatLng(facility.lat, facility.lng);
              return bounds.contains(latLng);
            }
            return true;
          })
          .map((facility) => (
            <li key={facility.id}>
              {facility.name}
              <ul className="not-prose space-y-2">
                {facility.timeSlots
                  .filter(
                    (timeSlot) => showOccupied || timeSlot.state === "free",
                  )
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
