import { Schema, model } from "mongoose";
import { PricingModel } from "../types";

const pricingSchema = new Schema<PricingModel>({
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
      latLng: {
        lat: Number,
        lng: Number,
      },
      timestamp: {
        type: Date,
        default: new Date(),
      },
    },
  ],
});

const PricingSchema = model<PricingModel>("Pricing", pricingSchema);

export default PricingSchema;
