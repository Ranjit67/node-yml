import { Schema, model } from "mongoose";

import { BookingModels } from "../types";

const bookingSchema = new Schema({
  eventDate: {
    start: Date,
    end: Date,
  },
  cityName: {
    type: String,
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
  bankAmount: {
    type: Number,
  },
  walletAmount: {
    type: Number,
  },
  promoCodeAmount: {
    type: Number,
  },
  promoCodeData: {
    type: Object,
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
  //   requestType: {
  //     type: String,
  //   },
  personalizedMessage: {
    type: String,
  },
  eventDuration: {
    type: String,
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

  orderId: {
    type: String,
  },
  paymentId: {
    type: String,
  },
  paymentStatus: {
    enum: ["fail", "success"],
    type: String,
  },
  reason: {
    type: String,
  },
});
const BookingSchema = model<BookingModels>("Booking", bookingSchema);
export default BookingSchema;
