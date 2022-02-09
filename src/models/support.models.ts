import { Schema, model } from "mongoose";
import { SupportModel } from "../types";

const supportSchema = new Schema<SupportModel>({
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
    default: new Date(),
  },
});
const SupportSchema = model<SupportModel>("Support", supportSchema);
export default SupportSchema;
