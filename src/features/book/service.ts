import { createRepository, Repository } from "./repository";
import { db } from "@/db";

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
  };
}

export const service = createService(createRepository(db));
