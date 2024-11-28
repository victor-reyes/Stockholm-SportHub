"use server";
import { redirect } from "next/navigation";

export async function searchAction(formData: FormData) {
  const facilities = formData.getAll("facility");

  const sports = formData.getAll("sport");
  const date = formData.get("date");
  const time = formData.get("time");

  const params = new URLSearchParams({
    date: date as string,
    time: time as string,
    facilities: facilities.join(","),
  });

  redirect(`/boka?${params.toString()}`);
}
