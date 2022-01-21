import { Document, Schema, model, ObjectId } from "mongoose";
import { requestType, requestStatus } from "../types";
export interface RequestModel extends Document {
  // rescheduleRef:ObjectId;
  requestType: requestType;
  senderUserRef: ObjectId;
  receiverUserRef: ObjectId;
  bookingRef: ObjectId;
  details: object;
  timestamp: Date;
  status: requestStatus;
  reason: string;
}

const requestSchema = new Schema({
  // rescheduleRef: {
  //     type: Schema.Types.ObjectId,
  //     required: true,
  //     ref: "Reschedule",
  // },
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
  senderUserRef: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiverUserRef: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  bookingRef: {
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
  reason: {
    type: String,
  },
  timestamp: {
    type: Date,
  },
});

const RequestSchema = model<RequestModel>("Request", requestSchema);
export default RequestSchema;
