import { DB } from "@/db";
import {
  bookings,
  facilities,
  facilitiesToSports,
  sports,
  users,
} from "@/db/schema";
import { and, gte, inArray } from "drizzle-orm";
import {
  BookingInsert,
  FacilitiesToSportsInsert,
  FacilityInsert,
  SportInsert,
  UserInsert,
} from "./types";

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
      const where = buildWhereSQL(facilityIds, sportsIds, fromDate, toDate);

      return await db.query.facilities.findMany({
        with: {
          bookings: true,
          facilitiesSports: { with: { sport: true } },
        },
        where: where,
      });
    },

    async insertUser(user: UserInsert) {
      return (await db.insert(users).values(user)).oid;
    },
    async insertFacility(facility: FacilityInsert) {
      return (await db.insert(facilities).values(facility)).oid;
    },
    async insertSport(sport: SportInsert) {
      return (await db.insert(sports).values(sport)).oid;
    },
    async insertFacilitySport(facilitySport: FacilitiesToSportsInsert) {
      return (await db.insert(facilitiesToSports).values(facilitySport)).oid;
    },
    async insertBooking(booking: BookingInsert) {
      return (await db.insert(bookings).values(booking)).oid;
    },
  };
}

function buildWhereSQL(
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

  return and(facilityIn, sportIn, fromDateGte, toDateLte);
}

export type Repository = ReturnType<typeof createRepository>;
