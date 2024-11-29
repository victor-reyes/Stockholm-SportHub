"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FacilitySelect, TimeSlot } from "@/features/book/types";
import { useState } from "react";

type Props = {
  facility: FacilityWithBookingTimeSlot;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
export function BookDialog({ facility, open, onOpenChange }: Props) {
  const [duration, setDuration] = useState(60);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="not-prose">
        <DialogHeader>
          <DialogTitle>Do you want to book?</DialogTitle>
        </DialogHeader>
        <DialogDescription className="space-y-4" asChild>
          <div>
            <p>You are about to book {facility.name}</p>
            <SelectDuration
              timeSlot={facility.booking}
              onDurationChange={setDuration}
            />
            <p>
              It will cost you <strong>{duration * 10}</strong> SEK
            </p>
          </div>
        </DialogDescription>
        <DialogFooter className="flex justify-between items-center">
          <Button onClick={() => onOpenChange(false)}>Book</Button>
          <Button onClick={() => onOpenChange(false)}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

type SelectionProps = {
  timeSlot: TimeSlot;
  onDurationChange: (duration: number) => void;
};
function SelectDuration({ timeSlot, onDurationChange }: SelectionProps) {
  const durationOptions = Array.from(
    { length: (timeSlot.durationInMin - 60) / 15 + 1 },
    (_, i) => 60 + i * 15,
  );

  return (
    <Select
      onValueChange={(string) => {
        const duration = parseInt(string);
        onDurationChange(duration);
      }}
      defaultValue="60"
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        {durationOptions.map((duration) => (
          <SelectItem key={duration} value={duration.toString()}>
            {duration} minutes
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export type FacilityWithBookingTimeSlot = FacilitySelect & {
  booking: TimeSlot;
};
