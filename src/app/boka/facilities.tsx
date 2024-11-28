import { service } from "@/features";

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
            <ul>
              {facility.bookings.map((booking) => (
                <li key={booking.id}>
                  {booking.startTimestamp.toLocaleString()} -{" "}
                  {booking.endTimestamp.toLocaleString()}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
