import {
  pgTable,
  serial,
  varchar,
  timestamp,
  integer,
  date,
  time,
} from "drizzle-orm/pg-core";
import { db } from ".";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 25 }).notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
});

export const bookings = pgTable(
  "bookings",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => users.id),
    bookingDate: date("booking_date").notNull(),
    startTime: time("start_time").notNull(),
    endTime: time("end_time").notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
  },
);


db.select()