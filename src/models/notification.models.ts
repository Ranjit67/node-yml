import { Document, Schema, model, ObjectId } from "mongoose";

type notificationType = "newBooking" | "bookingRequest";
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

const notificationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  notification: [
    {
      iconUrl: {
        type: String,
      },
      receiveFrom: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      description: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },

      isRead: {
        type: Boolean,
        default: false,
      },
      timestamp: {
        type: Date,
        default: new Date(),
      },
    },
  ],
});
const NotificationSchema = model<NotificationModel>(
  "Notification",
  notificationSchema
);
export default NotificationSchema;
