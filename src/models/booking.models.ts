import { Schema, model } from "mongoose";

import { BookingModels } from "../types";

const bookingSchema = new Schema<BookingModels>({
  eventDate: {
    start: Date,
    end: Date,
  },

  eventLocation: {
    type: String,
  },
  location: {
    lat: {
      type: Number,
      default: 0,
    },
    lng: {
      type: Number,
      default: 0,
    },
    country: {
      type: String,
    },
  },
  crowdSize: {
    type: Number,
  },
  serviceType: {
    type: Schema.Types.ObjectId,
    ref: "Service",
  },
  bookingType: {
    enum: ["personalizedMessage", "other"],
    type: String,
  },
  bookingReschedule: {
    type: Schema.Types.ObjectId,
    ref: "BookingReschedule",
  },
  bookingPrice: {
    type: Number,
  },

  status: {
    enum: ["pending", "confirm", "cancel", "past"],
    type: String,
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  artistCopy: {
    type: Object,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  userCopy: {
    type: Object,
  },
  personalizedVideo: {
    type: Schema.Types.ObjectId,
    ref: "PersonalizeVideo",
  },

  personalizedMessage: {
    type: String,
  },
  eventDuration: {
    type: Number,
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
  OtherDetails: {
    type: String,
  },
  eventType: {
    type: Schema.Types.ObjectId,
    ref: "Event",
  },
  eventTime: {
    type: Date,
  },
  timestamp: {
    type: Date,
    default: new Date(),
  },
  personalizedMsgDate: {
    type: Date,
  },
  isPayment: {
    type: Boolean,
    default: false,
  },
  isDeletesId: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  cancelBy: {
    enum: ["artist", "user"],
    type: String,
  },
  cancelDate: {
    type: Date,
  },

  reason: {
    type: String,
  },
  payment: {
    type: Schema.Types.ObjectId,
    ref: "Payment",
  },
});
const BookingSchema = model<BookingModels>("Booking", bookingSchema);
export default BookingSchema;
