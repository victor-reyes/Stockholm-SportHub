"use server";

import { service } from "@/features";

export async function searchAction(formData: FormData) {
  const allFacilities = await service.getAllFacilities();

  const facilities = formData
    .getAll("facility")
    .map((facility) => allFacilities.find((f) => f.name === facility)!.id);

  const sports = formData.getAll("sport");
  const date = formData.get("date");
  const time = formData.get("time");

  const fromTimestamp = new Date(`${date}T${time}:00Z`);
  fromTimestamp.setMinutes(Math.floor(fromTimestamp.getMinutes() / 15) * 15);

  console.log("facilities", facilities);
  console.log("fromTimestamp", fromTimestamp);
}
