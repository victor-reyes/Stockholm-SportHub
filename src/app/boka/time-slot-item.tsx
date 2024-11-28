"use client";
import { Card } from "@/components/ui/card";
import { FacilitySelect, TimeSlot } from "@/features/book/types";
import { SquareArrowOutUpRight } from "lucide-react";

type Props = {
  facility: FacilitySelect;
  timeSlot: TimeSlot;
};

export function TimeSlotItem({ timeSlot, facility }: Props) {
  const height = Math.max(3, timeSlot.durationInMin / 60);

  const start = useFormattedDateTime(timeSlot.start);
  const end = useFormattedDateTime(timeSlot.end);

  const [bookDialogOpen, setBookDialogOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleClick = () => setBookDialogOpen(true);

  return (
    <>
      <BookDialog
        facility={{ ...facility, booking: timeSlot }}
        open={bookDialogOpen}
        onOpenChange={(open) => {
          console.log("now from here", open);
          setBookDialogOpen(open);
        }}
      />
      <li>
        <Card
          onClick={timeSlot.state === "free" ? handleClick : undefined}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{ height: `${height}rem` }}
          className={`px-4 py-0 flex items-center justify-between self-center ${
            timeSlot.state === "free"
              ? "hover:border-slate-300 hover:bg-slate-50 cursor-pointer"
              : timeSlot.state === "booked"
              ? "bg-slate-200 text-slate-300"
              : "bg-slate-100 text-slate-300"
          }`}
        >
          {start} - {end}
          {timeSlot.state === "free" && (
            <>
              <SquareArrowOutUpRight
                strokeWidth={hovered ? 2.2 : 1.5}
                className={hovered ? "text-primary" : "text-slate-500"}
              />
            </>
          )}
        </Card>
      </li>
    </>
  );
}

import { useState, useEffect, useCallback } from "react";
import { BookDialog } from "./book-dialog";

const useFormattedDateTime = (date: Date) => {
  const [formattedDate, setFormattedDate] = useState("");

  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  useEffect(() => {
    setFormattedDate(new Date(date).toLocaleTimeString("sv-SE", options));
  }, [date]);

  return formattedDate;
};
