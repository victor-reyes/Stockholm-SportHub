import { DB } from "@/db";
import {
  bookings,
  facilities,
  facilitiesToSports,
  sports,
  users,
} from "@/db/schema";
import { and, eq, gt, inArray, lt } from "drizzle-orm";
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
      fromTimestamp: Date,
      toTimestamp: Date,
      facilityIds?: number[],
      sportIds?: number[],
    ) {
      const where = buildWhereSQL(
        fromTimestamp,
        toTimestamp,
        facilityIds,
        sportIds,
      );

      return await db.query.facilities.findMany({
        with: {
          bookings: true,
          facilitiesSports: { with: { sport: true } },
        },
        where: where,
      });
    },

    async insertUser(user: UserInsert) {
      return (
        await db.insert(users).values(user).returning({ id: users.id })
      )[0].id;
    },
    async insertFacility(facility: FacilityInsert) {
      return (
        await db
          .insert(facilities)
          .values(facility)
          .returning({ id: facilities.id })
      )[0].id;
    },
    async insertSport(sport: SportInsert) {
      return (
        await db.insert(sports).values(sport).returning({ id: sports.id })
      )[0].id;
    },
    async insertFacilitySport(facilitySport: FacilitiesToSportsInsert) {
      return (
        await db
          .insert(facilitiesToSports)
          .values(facilitySport)
          .returning({ id: facilitiesToSports.id })
      )[0].id;
    },
    async insertBooking(booking: BookingInsert) {
      return (
        await db.insert(bookings).values(booking).returning({ id: bookings.id })
      )[0].id;
    },

    async findOverlapping(
      facilityId: number,
      fromTimestmp: Date,
      toTimestamp: Date,
    ) {
      return await db.query.bookings.findFirst({
        where: and(
          eq(bookings.facilityId, facilityId),
          lt(bookings.startTimestamp, toTimestamp),
          gt(bookings.endTimestamp, fromTimestmp),
        ),
      });
    },
  };
}

function buildWhereSQL(
  fromTimestamp: Date,
  toTimestamp: Date,
  facilityIds?: number[],
  sportIds?: number[],
) {
  const facilityIdsInArray = facilityIds
    ? inArray(bookings.facilityId, facilityIds)
    : undefined;
  const sportIdsInArray = sportIds ? inArray(sports.id, sports) : undefined;
  const overlappingDates = and(
    lt(bookings.startTimestamp, toTimestamp),
    gt(bookings.endTimestamp, fromTimestamp),
  );

  return and(facilityIdsInArray, sportIdsInArray, overlappingDates);
}

export type Repository = ReturnType<typeof createRepository>;
