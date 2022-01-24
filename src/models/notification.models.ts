import { Document, Schema, model, ObjectId } from "mongoose";

type notificationType = "newBooking" | "bookingRequest";
export interface NotificationModel extends Document {
  type: notificationType;
  sendTo: ObjectId;
  receiveFrom: ObjectId;
  description: string;
  title: string;
  isRead: boolean;
}

const notificationSchema = new Schema({
  type: {
    enum: ["newBooking", "bookingRequest"],
    type: String,
  },
  sendTo: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  receiveFrom: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  description: {
    type: String,
  },
  title: {
    type: String,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
});
const NotificationSchema = model<NotificationModel>(
  "Notification",
  notificationSchema
);
export default NotificationSchema;
