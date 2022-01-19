import { Schema, model } from "mongoose";
import { CrowdModel } from "../types";
import { NextFunction } from "express";

const crowdSchema: any = new Schema<CrowdModel>({
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

const CrowdSchema = model<CrowdModel>("Crowd", crowdSchema);

export default CrowdSchema;
