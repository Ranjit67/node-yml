import { Document, Schema, model, ObjectId, SchemaType } from "mongoose";
type rescheduleBy = "artist" | "user";
export interface BookingReschedule extends Document {
  artist: ObjectId;
  user: ObjectId;
  rescheduleBy: rescheduleBy;
  booking: ObjectId;
  rescheduleDate: {
    start: Date;
    ending: Date;
  };
  personalizedMsgDate: Date;
  timestamp: Date;
}
const bookingRescheduleSchema = new Schema({
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
    ending: {
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

const BookingRescheduleSchema = model<BookingReschedule>(
  "BookingReschedule",
  bookingRescheduleSchema
);
export default BookingRescheduleSchema;
