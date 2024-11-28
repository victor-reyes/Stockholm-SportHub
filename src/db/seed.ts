import { FACILITIES } from "@/data";
import { service } from "@/features";
import { faker } from "@faker-js/faker";
import { SPORTS } from "./schema";
import { generateRandomPoint } from "./geo";

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

  await service.insertBookings(mockBookings(usersIds, facilitiesIds));
}

function mockUsers(numberOfUsers: number = 200) {
  return faker.helpers
    .uniqueArray(faker.internet.email, numberOfUsers)
    .map((email) => ({ name: faker.person.fullName(), email }));
}

function mockFacilities() {
  return FACILITIES.map((facility) => {
    const { lat, lng } = generateRandomPoint();
    return {
      name: facility.text,
      description: faker.commerce.productDescription(),
      lat: lat,
      lng: lng,
    };
  });
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
    from.setDate(from.getDate() - 2);

    const to = new Date(from);
    to.setDate(to.getDate() + 10);

    const dates = faker.date.betweens({ from: from, to: to, count: 50 });

    return dates.map((fromDate) => {
      const facilityId = faker.helpers.arrayElement(facilityIds);
      fromDate.setHours(Math.max(8, Math.min(21, fromDate.getHours())));
      fromDate.setMinutes(faker.helpers.arrayElement([0, 15, 30, 45]), 0, 0);

      const toDate = new Date(fromDate);
      const minuteInMs = 60 * 1000;
      toDate.setTime(
        toDate.getTime() +
          minuteInMs *
            faker.helpers.arrayElement([60, 75, 90, 105, 120, 150, 180, 240]),
      );

      toDate.setTime(Math.min(toDate.getTime(), toDate.setHours(23, 0, 0, 0)));

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
