import { Schema, model } from "mongoose";
import { CrowdModel } from "../types";

const crowdSchema = new Schema<CrowdModel>({
  max: {
    type: Number,
    required: true,
    unique: true,
  },
  min: {
    type: Number,
    required: true,
    unique: true,
  },
  timestamp: {
    type: Date,
  },
});

const CrowdSchema = model<CrowdModel>("Crowd", crowdSchema);

export default CrowdSchema;
