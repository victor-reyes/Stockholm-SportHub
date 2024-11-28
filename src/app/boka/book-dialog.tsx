"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FacilitySelect, TimeSlot } from "@/features/book/types";

type Props = {
  facility: FacilityWithBookingTimeSlot;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
export function BookDialog({ facility, open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="not-prose">
        <DialogHeader>
          <DialogTitle>Do you want to book?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          You are about to book {facility.name} at{" "}
          {facility.booking.start.toLocaleTimeString()} for 90 minutes. It will
          cost you 500 SEK.
         
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

export type FacilityWithBookingTimeSlot = FacilitySelect & {
  booking: TimeSlot;
};
