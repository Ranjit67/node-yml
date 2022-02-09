import { ObjectId, Document } from "mongoose";

export type notificationType = "newBooking" | "bookingRequest";
export interface NotificationModel extends Document {
  user: ObjectId;
  notification: [
    {
      iconUrl: string;
      receiveFrom: ObjectId;
      description: string;
      title: string;
      isRead: boolean;
      timestamp: Date;
    }
  ];
}
