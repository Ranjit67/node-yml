import { Document, Schema, model, ObjectId } from "mongoose";
import { requestType, requestStatus } from "../types";
export interface RequestModel extends Document {
  reschedule: ObjectId;
  requestType: requestType;
  senderUser: ObjectId;
  receiverUser: ObjectId;
  booking: ObjectId;
  details: object;
  timestamp: Date;
  isCancel: boolean;
  status: requestStatus;
  reason: string;
}

const requestSchema = new Schema({
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
  timestamp: {
    type: Date,
  },
});

const RequestSchema = model<RequestModel>("Request", requestSchema);
export default RequestSchema;
