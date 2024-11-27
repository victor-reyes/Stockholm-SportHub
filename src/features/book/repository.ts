import { DB } from "@/db";

export function createRepository(db: DB) {
  return {
    async getAllBookings() {
      return await db.query.bookings.findMany();
    },
  };
}

export type Repository = ReturnType<typeof createRepository>;
