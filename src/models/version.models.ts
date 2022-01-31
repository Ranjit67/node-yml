import { Document, Schema, model } from "mongoose";

export interface serviceModel extends Document {
  title: string;
  timestamp: Date;
  description: string;
  version: number;
  isDismissible: boolean;
}

const versionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: new Date(),
  },
  description: {
    type: String,
    required: true,
  },
  version: {
    type: Number,
    required: true,
    default: 1,
  },
  isDismissible: {
    type: Boolean,
  },
});
const VersionSchema = model<serviceModel>("Version", versionSchema);
export default VersionSchema;
