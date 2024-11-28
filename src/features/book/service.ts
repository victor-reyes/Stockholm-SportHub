import { createRepository, Repository } from "./repository";
import { db } from "@/db";
import {
  BookingInsert,
  BookingSelect,
  FacilitiesToSportsInsert,
  FacilityInsert,
  SportInsert,
  TimeSlot,
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

      const facilitiesWithBookings = await repository.getFalicityBookings(
        fromTimestamp,
        toTimestamp,
        facilityIds,
        sportIds,
      );

      return facilitiesWithBookings.map((facility) => ({
        ...facility,
        timeSlots: generateTimeSlots(facility.bookings, fromTimestamp),
      }));
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

const START_HOURS = 7;
const END_HOURS = 22;

function generateTimeSlots(bookings: BookingSelect[], date: Date) {
  const timeSlots: Omit<TimeSlot, "durationInMin">[] = [];

  const operatingStart = new Date(
    new Date(date).setHours(START_HOURS, 0, 0, 0),
  );
  const operatingEnd = new Date(new Date(date).setHours(END_HOURS, 0, 0, 0));

  let currentTime = operatingStart;

  bookings.forEach((booking) => {
    if (booking.startTimestamp > currentTime) {
      timeSlots.push({
        start: new Date(currentTime),
        end: new Date(booking.startTimestamp),
        state: "free",
      });
    }
    timeSlots.push({
      start: new Date(booking.startTimestamp),
      end: new Date(booking.endTimestamp),
      state: "booked",
    });

    currentTime = booking.endTimestamp;
  });

  // if there is free time after the last booking
  if (currentTime < operatingEnd) {
    timeSlots.push({
      start: new Date(currentTime),
      end: new Date(operatingEnd),
      state: "free",
    });
  }

  const currentDate = new Date();

  return timeSlots.map((timeSlot) => ({
    ...timeSlot,
    durationInMin: calculateDurationInMin(timeSlot.start, timeSlot.end),
    state:
      timeSlot.state === "free" &&
      timeSlot.end.getTime() < currentDate.getTime()
        ? "unavailable"
        : timeSlot.state,
  }));
}

function calculateDurationInMin(start: Date, end: Date) {
  return (end.getTime() - start.getTime()) / (60 * 1000);
}
