import { Document, ObjectId } from "mongoose";
export type requestType =
  | "manager"
  | "pricing"
  | "rescheduledCustomer"
  | "rescheduledArtist"
  | "personalize"
  | "payment"
  | "managerRemove";

export type requestStatus = "pending" | "accept" | "reject";

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
  deletedUsers: ObjectId[];
}
