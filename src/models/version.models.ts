import { Schema, model } from "mongoose";

import { VersionModel } from "../types";

const versionSchema = new Schema<VersionModel>({
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
const VersionSchema = model<VersionModel>("Version", versionSchema);
export default VersionSchema;
