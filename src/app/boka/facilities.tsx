import { service } from "@/features";
import { TimeSlotItem } from "./time-slot-item";

type Props = {
  fromTimestamp: Date;
  toTimeStamp?: Date;
  facilityIds?: number[];
  sportIds?: number[];
};

export async function Facilities({
  fromTimestamp,
  toTimeStamp,
  facilityIds,
  sportIds,
}: Props) {
  const facilities = await service.getFalicityBookings(
    fromTimestamp,
    toTimeStamp,
    facilityIds,
    sportIds,
  );
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
