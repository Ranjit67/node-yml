import { Document, Schema, model, ObjectId } from "mongoose";
import { RequestModel } from "../types";

const requestSchema = new Schema<RequestModel>({
  reschedule: {
    type: Schema.Types.ObjectId,

    ref: "BookingReschedule",
  },
  requestType: {
    type: String,
    enum: [
      "manager",
      "pricing",
      "rescheduledCustomer",
      "rescheduledArtist",
      "personalize",
      "payment",
      "managerRemove",
    ],
  },
  senderUser: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiverUser: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  booking: {
    type: Schema.Types.ObjectId,
    ref: "Booking",
  },
  details: {
    type: Object,
  },
  status: {
    type: String,
    enum: ["pending", "accept", "reject"],
    default: "pending",
  },
  isCancel: {
    type: Boolean,
    default: false,
  },
  reason: {
    type: String,
  },
  deletedUsers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  timestamp: {
    type: Date,
  },
});

const RequestSchema = model<RequestModel>("Request", requestSchema);
export default RequestSchema;
