import { ObjectId, Schema, Document, model } from "mongoose";

export interface SupportModel extends Document {
  userRef: ObjectId;
  message: string;
  timestamp: Date;
}

const supportSchema = new Schema({
  userRef: {
    type: Schema.Types.ObjectId,
    ref: "User",
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
