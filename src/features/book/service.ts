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
      facilityIds?: number[],
      sportsIds?: number[],
      fromDate?: Date,
      toDate?: Date,
    ) {
      return await repository.getFalicityBookings(
        facilityIds,
        sportsIds,
        fromDate,
        toDate,
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
    async insertFacilitySport(facilitySport: FacilitiesToSportsInsert) {
      return await repository.insertFacilitySport(facilitySport);
    },
    async insertBooking(booking: BookingInsert) {
      return await repository.insertBooking(booking);
    },
  };
}

export const service = createService(createRepository(db));
