"use server";

export async function searchAction(formData: FormData) {
  console.log(formData.entries().toArray());
}
