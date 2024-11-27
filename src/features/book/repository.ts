import { DB } from "@/db";
import { bookings, sports } from "@/db/schema";
import { and, gte, inArray } from "drizzle-orm";

export function createRepository(db: DB) {
  return {
    async getAllBookings() {
      return await db.query.bookings.findMany();
    },

    async getFalicityBookings(
      facilityIds?: number[],
      sportsIds?: number[],
      fromDate?: Date,
      toDate?: Date,
    ) {
      const facilityIn = facilityIds
        ? inArray(bookings.facilityId, facilityIds)
        : undefined;
      const sportIn = sportsIds ? inArray(sports.id, sports) : undefined;
      const fromDateGte = fromDate
        ? gte(bookings.bookingDate, fromDate)
        : undefined;
      const toDateLte = toDate ? gte(bookings.bookingDate, toDate) : undefined;

      return await db.query.facilities.findMany({
        with: {
          bookings: true,
          facilitiesSports: { with: { sport: true } },
        },
        where: and(facilityIn, sportIn, fromDateGte, toDateLte),
      });
    },
  };
}

export type Repository = ReturnType<typeof createRepository>;
