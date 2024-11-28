import { service } from "@/features";
import { CardForm } from "./card-form";
import { Facilities } from "./facilities";

type Props = {
  searchParams?: Promise<{
    facilities?: string;
    date?: string;
    time?: string;
  }>;
};
export default async function Book(props: Props) {
  const { date, time, allFacilities, facilities } = await handleProps(props);

  const facilitiesBookings = await service.getFalicityBookings(
    new Date(`${date}T${time}:00Z`),
    undefined,
    facilities.map((f) => f.id),
    undefined,
  );

  return (
    <main className="p-4">
      <h1>Booking</h1>
      <CardForm
        allFacilities={allFacilities}
        facilities={facilities}
        stockholmDate={date}
        stockholmTime={time}
      />
      <Facilities facilities={facilitiesBookings} />
    </main>
  );
}
async function handleProps(props: Props) {
  const searchParams = await props.searchParams;
  const allFacilities = await service.getAllFacilities();

  const facilities = (searchParams?.facilities?.split(",") || [])
    .map((facility) => allFacilities.find((f) => f.name === facility))
    .filter(Boolean)
    .map((f) => f!);
  const stockholmTime = new Date().toLocaleString("sv-SE", {
    timeZone: "Europe/Stockholm",
  });
  const stockholmDate = new Date(
    new Date(stockholmTime).getTime() - new Date().getTimezoneOffset() * 60000,
  ).toISOString();
  const date = searchParams?.date || stockholmDate.split("T")[0];
  const time = searchParams?.time || stockholmDate.split("T")[1].slice(0, 5);

  return { date, time, allFacilities, facilities };
}
