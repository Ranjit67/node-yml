import { Document, ObjectId } from "mongoose";

export interface SupportModel extends Document {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  countryCode: string;
  email: string;
  message: string;
  timestamp: Date;
  user: ObjectId;
}
