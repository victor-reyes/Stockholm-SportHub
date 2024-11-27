import {
  pgTable,
  serial,
  varchar,
  timestamp,
  integer,
  date,
  time,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 25 }).notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  facilityId: integer("facility_id").references(() => facilities.id),
  bookingDate: date("booking_date").notNull(),
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
});

export const facilities = pgTable("facilities", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  description: varchar("description", { length: 255 }),
});

export const sports = pgTable("sports", {
  id: serial("id").primaryKey(),
  sport: varchar("sport", { length: 10 }).$type<Sport>().notNull(),
});

export const facilitiesSports = pgTable("facilities_sports", {
  id: serial("id").primaryKey(),
  facilityId: integer("facility_id").references(() => facilities.id),
  sportId: integer("sport_id").references(() => sports.id),
});

export type Sport =
  | "football"
  | "basketball"
  | "volleyball"
  | "tennis"
  | "badminton"
  | "ice hockey"
  | "floorball";
