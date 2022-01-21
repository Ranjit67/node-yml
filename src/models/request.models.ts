import { Document, Schema, model, ObjectId } from "mongoose";
import { requestType, requestStatus } from "../types";
export interface Request extends Document {
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
    enum: [
      "manager",
      "pricing",
      "reschduled-customer",
      "reschudel-artist",
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
    enum: ["pending", "accept", "reject"],
  },
  reason: {
    type: String,
  },
});

const RequestSchema = model<Request>("Request", requestSchema);
export default RequestSchema;
