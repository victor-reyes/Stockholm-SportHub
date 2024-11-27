import { FACILITIES } from "@/data";
import { service } from "@/features";
import { faker } from "@faker-js/faker";
import { SPORTS } from "./schema";

async function seed() {
  const usersIds = (
    await Promise.all(
      mockUsers().map(async (user) => await service.insertUser(user)),
    )
  ).filter((id) => id !== undefined);

  const facilitiesIds = await Promise.all(
    mockFacilities().map(async (facility) => {
      return await service.insertFacility(facility);
    }),
  );

  const sportsIds = await Promise.all(
    mockSports().map(async (sport) => {
      return await service.insertSport(sport);
    }),
  );

  await Promise.all(
    mockFacilitiesToSports(facilitiesIds, sportsIds).map(async (fts) => {
      return await service.insertFacilityToSport(fts);
    }),
  );

  await Promise.all(
    mockBookings(usersIds, facilitiesIds).map(async (booking) => {
      return await service.insertBooking(booking);
    }),
  );
}

function mockUsers(numberOfUsers: number = 100) {
  return Array.from({ length: numberOfUsers }).map(() => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
  }));
}

function mockFacilities() {
  return FACILITIES.map((facility) => ({
    name: facility.text,
    description: faker.commerce.productDescription(),
  }));
}

function mockSports() {
  return SPORTS.map((sport) => ({ sport }));
}

function mockFacilitiesToSports(facilityIds: number[], sportIds: number[]) {
  return facilityIds
    .flatMap((facilityId) => {
      const ids = faker.helpers.arrayElements(sportIds, { min: 1, max: 4 });
      return ids.map((sportId) => ({
        facilityId,
        sportId,
      }));
    })
    .filter((item, index, self) => self.indexOf(item) === index);
}

function mockBookings(userIds: number[], facilityIds: number[]) {
  return userIds.flatMap((userId) => {
    const from = new Date();

    const to = new Date(from);
    to.setMonth(to.getMonth() + 6);

    const dates = faker.date.betweens({ from: from, to: to, count: 10 });

    return dates.map((fromDate) => {
      const facilityId = faker.helpers.arrayElement(facilityIds);
      fromDate.setHours(Math.max(8, Math.min(21, fromDate.getHours())));
      fromDate.setMinutes(faker.helpers.arrayElement([0, 15, 30, 45]));

      const toDate = new Date(fromDate);
      const minuteInMs = 60 * 1000;
      toDate.setTime(
        toDate.getTime() +
          minuteInMs * faker.helpers.arrayElement([60, 75, 90, 105, 120]),
      );

      toDate.setTime(Math.min(toDate.getTime(), toDate.setHours(23, 0)));

      return {
        userId,
        facilityId,
        startTimestamp: fromDate,
        endTimestamp: toDate,
      };
    });
  });
}

seed();
