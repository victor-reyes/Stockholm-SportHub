import { createRepository, Repository } from "./repository";
import { db } from "@/db";

function createService(repository: Repository) {
  return {
    async getAllBookings() {
      return await repository.getAllBookings();
    },
  };
}

export const service = createService(createRepository(db));
