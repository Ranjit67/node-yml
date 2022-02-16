import { ObjectId, Document } from "mongoose";

export type bookingStatus = "pending" | "confirm" | "cancel" | "past";
export type cancelBy = "artist" | "user";
export type bookingType = "personalizedMessage" | "other";
export type paymentStatus = "fail" | "success";

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
  location: {
    lat: number;
    lng: number;
    country: string;
  };
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
  reason: string;
  paymentStatus: paymentStatus;
  // orderId: ObjectId;
  orderId: String;
  paymentId: String;
  isDeletesId: ObjectId[];
}
