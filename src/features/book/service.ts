import { createRepository, Repository } from "./repository";
import { db } from "@/db";
import {
  BookingInsert,
  FacilitiesToSportsInsert,
  FacilityInsert,
  SportInsert,
  UserInsert,
} from "./types";

function createService(repository: Repository) {
  return {
    async getAllBookings() {
      return await repository.getAllBookings();
    },
    async getAllFacilities() {
      return await repository.getAllFacilities();
    },

    async getFalicityBookings(
      fromTimestamp: Date,
      toTimestamp?: Date,
      facilityIds?: number[],
      sportIds?: number[],
    ) {
      toTimestamp =
        toTimestamp || new Date(new Date(fromTimestamp).setHours(23, 0));

      return await repository.getFalicityBookings(
        fromTimestamp,
        toTimestamp,
        facilityIds,
        sportIds,
      );
    },

    async insertUser(user: UserInsert) {
      return await repository.insertUser(user);
    },
    async insertFacility(facility: FacilityInsert) {
      return await repository.insertFacility(facility);
    },
    async insertSport(sport: SportInsert) {
      return await repository.insertSport(sport);
    },
    async insertFacilityToSport(facilityToSport: FacilitiesToSportsInsert) {
      return await repository.insertFacilitySport(facilityToSport);
    },
    async insertBooking(booking: BookingInsert) {
      return await repository.insertBooking(booking);
    },
    async insertBookings(bookings: BookingInsert[]) {
      return await repository.insertBookings(bookings);
    },
  };
}

export const service = createService(createRepository(db));
