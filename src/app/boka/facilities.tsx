import { service } from "@/features";
import { TimeSlotItem } from "./time-slot-item";
import { FacilitiesBookingWithTimeSlots } from "@/features/book/types";

type Props = {
  facilities: FacilitiesBookingWithTimeSlots[];
};

export function Facilities({ facilities }: Props) {
  return (
    <div>
      <h2>Facilities</h2>
      <ul>
        {facilities.map((facility) => (
          <li key={facility.id}>
            {facility.name}
            <ul className="not-prose space-y-2">
              {facility.timeSlots.map((timeSlot, index) => (
                <TimeSlotItem key={index} timeSlot={timeSlot} />
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
