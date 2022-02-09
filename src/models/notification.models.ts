import { Schema, model } from "mongoose";

import { NotificationModel } from "../types";

const notificationSchema = new Schema<NotificationModel>({
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
