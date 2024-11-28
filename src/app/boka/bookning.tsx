"use client";

import {
  FacilitiesBookingWithTimeSlots,
  FacilitySelect,
} from "@/features/book/types";
import { CardForm } from "./card-form";
import { FacilitiesBooking } from "./facilities";
import { Map } from "./map";
import { useState } from "react";

type Props = {
  apiKey: string;
  facilitiesBookings: FacilitiesBookingWithTimeSlots[];
  allFacilities: FacilitySelect[];
  facilities: FacilitySelect[];
  stockholmDate: string;
  stockholmTime: string;
  onBoundsChanged?: (bounds: google.maps.LatLngBounds) => void;
};
export function Bookning({
  apiKey,
  facilitiesBookings,
  allFacilities,
  facilities,
  stockholmDate,
  stockholmTime,
}: Props) {
  const [bounds, setBounds] = useState<google.maps.LatLngBounds | null>(null);

  return (
    <>
      <div className="flex flex-wrap gap-4 items-center justify-around">
        <Map
          apiKey={apiKey}
          facilities={facilitiesBookings}
          onBoundsChanged={setBounds}
        />
        <CardForm
          allFacilities={allFacilities}
          facilities={facilities}
          stockholmDate={stockholmDate}
          stockholmTime={stockholmTime}
        />
      </div>
      <FacilitiesBooking facilities={facilitiesBookings} bounds={bounds} />
    </>
  );
}
