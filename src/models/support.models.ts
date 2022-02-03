import { ObjectId, Schema, Document, model } from "mongoose";

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

const supportSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  countryCode: {
    type: String,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: new Date().toString(),
  },
});
const SupportSchema = model<SupportModel>("Support", supportSchema);
export default SupportSchema;
