import { Schema, model } from "mongoose";
import { BookingRescheduleModule } from "types";
("../types");

const bookingRescheduleSchema = new Schema<BookingRescheduleModule>({
  artist: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  rescheduleBy: {
    enum: ["artist", "user"],
    type: String,
  },
  booking: {
    type: Schema.Types.ObjectId,
    ref: "Booking",
  },
  rescheduleDate: {
    start: {
      type: Date,
    },
    end: {
      type: Date,
    },
  },
  personalizedMsgDate: {
    type: Date,
  },
  timestamp: {
    type: Date,
  },
});

const BookingRescheduleSchema = model<BookingRescheduleModule>(
  "BookingReschedule",
  bookingRescheduleSchema
);
export default BookingRescheduleSchema;
