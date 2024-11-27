import {
  pgTable,
  serial,
  varchar,
  timestamp,
  integer,
  date,
  time,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 25 }).notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
});

export const usersRelations = relations(users, ({ many }) => ({
  bookings: many(bookings),
}));

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  facilityId: integer("facility_id").references(() => facilities.id),
  bookingDate: date("booking_date").notNull(),
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
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
  description: varchar("description", { length: 255 }),
});

export const facilitiesRelations = relations(facilities, ({ many }) => ({
  bookings: many(bookings),
  facilitiesSports: many(facilitiesToSports),
}));

export const sports = pgTable("sports", {
  id: serial("id").primaryKey(),
  sport: varchar("sport", { length: 10 }).$type<Sport>().notNull(),
});

export const sportsRelations = relations(sports, ({ many }) => ({
  facilitiesSports: many(facilitiesToSports),
}));

export const facilitiesToSports = pgTable("facilities_to_sports", {
  id: serial("id").primaryKey(),
  facilityId: integer("facility_id").references(() => facilities.id),
  sportId: integer("sport_id").references(() => sports.id),
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

export type Sport =
  | "football"
  | "basketball"
  | "volleyball"
  | "tennis"
  | "badminton"
  | "ice hockey"
  | "floorball";
