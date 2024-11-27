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
    async getFalicityBookings(
      fromTimestamp: Date,
      toTimeStamp: Date,
      facilityIds?: number[],
      sportIds?: number[],
    ) {
      return await repository.getFalicityBookings(
        fromTimestamp,
        toTimeStamp,
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
  };
}

export const service = createService(createRepository(db));
