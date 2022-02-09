import { ObjectId, Document } from "mongoose";

export type rescheduleBy = "artist" | "user";
export interface BookingRescheduleModule extends Document {
  artist: ObjectId;
  user: ObjectId;
  rescheduleBy: rescheduleBy;
  booking: ObjectId;
  rescheduleDate: {
    start: Date;
    end: Date;
  };
  personalizedMsgDate: Date;
  timestamp: Date;
}
