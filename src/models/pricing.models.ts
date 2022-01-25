import { Schema, model } from "mongoose";
import { PricingModel } from "../types";

const pricingSchema = new Schema({
  artist: {
    type: Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
  prices: [
    {
      numberOfDays: Number,
      pricePerHour: Number,
      maxCrowdSize: Number,
      minCrowdSize: Number,
      location: String,
      timestamp: {
        type: Date,
        default: new Date().toString(),
      },
    },
  ],
});

const PricingSchema = model<PricingModel>("Pricing", pricingSchema);

export default PricingSchema;
