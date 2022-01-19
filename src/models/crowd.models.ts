import { Schema, model } from "mongoose";
import { CrowdModel } from "../types";
import { NextFunction } from "express";

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
});

// crowdSchema.pre("findOneAndUpdate", function (next: NextFunction): void {
//   console.log(this.min);
//   next();
// });
const CrowdSchema = model<CrowdModel>("Crowd", crowdSchema);

export default CrowdSchema;
