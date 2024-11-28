import {
  bookings,
  facilities,
  facilitiesToSports,
  sports,
  users,
} from "@/db/schema";

export type UserInsert = typeof users.$inferInsert;
export type UserSelect = typeof users.$inferSelect;

export type FacilityInsert = typeof facilities.$inferInsert;
export type FacilitySelect = typeof facilities.$inferSelect;

export type SportInsert = typeof sports.$inferInsert;
export type SportSelect = typeof sports.$inferSelect;

export type FacilitiesToSportsInsert = typeof facilitiesToSports.$inferInsert;
export type FacilitiesToSportsSelect = typeof facilitiesToSports.$inferSelect;

export type BookingInsert = typeof bookings.$inferInsert;
export type BookingSelect = typeof bookings.$inferSelect;

export type TimeSlot = {
  start: Date;
  end: Date;
  durationInMin: number;
  state: "free" | "booked" | "unavailable";
};

export type FacilitiesBookingWithTimeSlots = FacilitySelect & {
  timeSlots: TimeSlot[];
  bookings: BookingSelect[];
};
