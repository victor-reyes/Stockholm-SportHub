import {
  pgTable,
  serial,
  varchar,
  timestamp,
  integer,
  text,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
});

export const usersRelations = relations(users, ({ many }) => ({
  bookings: many(bookings),
}));

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  facilityId: integer("facility_id")
    .notNull()
    .references(() => facilities.id),
  startTimestamp: timestamp("start_timestamp", { mode: "date" }).notNull(),
  endTimestamp: timestamp("end_timestamp", { mode: "date" }).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
});

export const bookingsRelations = relations(bookings, ({ one }) => ({
  user: one(users, {
    fields: [bookings.userId],
    references: [users.id],
  }),
  facility: one(facilities, {
    fields: [bookings.facilityId],
    references: [facilities.id],
  }),
}));

export const facilities = pgTable("facilities", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  description: text("description").notNull(),
});

export const facilitiesRelations = relations(facilities, ({ many }) => ({
  bookings: many(bookings),
  facilitiesSports: many(facilitiesToSports),
}));

export const sports = pgTable("sports", {
  id: serial("id").primaryKey(),
  sport: varchar("sport", { length: 20 }).$type<Sport>().notNull(),
});

export const sportsRelations = relations(sports, ({ many }) => ({
  facilitiesSports: many(facilitiesToSports),
}));

export const facilitiesToSports = pgTable("facilities_to_sports", {
  id: serial("id").primaryKey(),
  facilityId: integer("facility_id")
    .references(() => facilities.id)
    .notNull(),
  sportId: integer("sport_id")
    .references(() => sports.id)
    .notNull(),
});

export const facilitiesToSportsRelations = relations(
  facilitiesToSports,
  ({ one }) => ({
    facility: one(facilities, {
      fields: [facilitiesToSports.facilityId],
      references: [facilities.id],
    }),
    sport: one(sports, {
      fields: [facilitiesToSports.sportId],
      references: [sports.id],
    }),
  }),
);

export type Sport = (typeof SPORTS)[number];

export const SPORTS = [
  "football",
  "basketball",
  "volleyball",
  "tennis",
  "badminton",
  "ice hockey",
  "floorball",
  "futsal",
  "handball",
  "table tennis",
  "squash",
  "gym",
  "swimming",
  "yoga",
  "dance",
  "martial arts",
  "golf",
] as const;
