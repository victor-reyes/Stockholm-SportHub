import { DB } from "@/db";
import {
  bookings,
  facilities,
  facilitiesToSports,
  sports,
  users,
} from "@/db/schema";
import { and, gt, inArray, lt } from "drizzle-orm";
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
      fromDate: Date,
      toDate: Date,
      facilityIds?: number[],
      sportsIds?: number[],
    ) {
      const where = buildWhereSQL(fromDate, toDate, facilityIds, sportsIds);

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
  fromDate: Date,
  toDate: Date,
  facilityIds?: number[],
  sportsIds?: number[],
) {
  const facilityIn = facilityIds
    ? inArray(bookings.facilityId, facilityIds)
    : undefined;
  const sportIn = sportsIds ? inArray(sports.id, sports) : undefined;
  const overlappingDates = and(
    lt(bookings.startTimestamp, toDate),
    gt(bookings.endTimestamp, fromDate),
  );

  return and(facilityIn, sportIn, overlappingDates);
}

export type Repository = ReturnType<typeof createRepository>;
