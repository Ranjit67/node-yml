// const bookingArtistInitialState = {
//     eventType: {
//       eventTypeId: 0,
//       eventTypeName: "",
//     },
//     serviceType: "",
//     eventDate: {
//       start: moment().toLocaleString(),
//       end: moment().add(1, "day").toLocaleString(),
//     },
//     eventTime: moment().toLocaleString(),
//     eventDuration: "",
//     crowedSize: "",
//     eventLocation: "",
//     cityName: "",
//     otherDetails: "",
//     personalizedMessage: "",
//     personalizedMsgDate: moment().toLocaleString(),
//   }

import { Document, Schema, model, ObjectId } from "mongoose";

type bookingStatus = "pending" | "confirm" | "cancel" | "past";
type cancelBy = "artist" | "user";
type bookingType = "personalizedMessage" | "other";
export interface BookingModels extends Document {
  eventDate: {
    start: Date;
    end: Date;
  };
  cityName: string;
  eventLocation: string;
  crowdSize: number;
  serviceType: ObjectId;
  bookingType: bookingType;
  bookingReschedule: ObjectId;
  bookingPrice: number;
  bankAmount: number;
  walletAmount: number;
  promoCodeAmount: number;
  promoCodeData: Object;
  status: bookingStatus;
  artist: ObjectId;
  user: ObjectId;
  personalizedVideo: ObjectId;
  //   requestType: string;
  personalizedMessage: string;
  eventDuration: string;
  isComplete: Boolean;
  OtherDetails: string;
  eventType: ObjectId;
  personalizedMsgDate: Date;
  isPayment: Boolean;
  cancelBy: cancelBy;
  userCopy: ObjectId;
  artistCopy: ObjectId;
  isDeletesId: ObjectId[];
}
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
});
const BookingSchema = model<BookingModels>("Booking", bookingSchema);
export default BookingSchema;
