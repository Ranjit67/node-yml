import { ObjectId } from "mongoose";

export default interface PricingModel extends Document {
  artistRef: ObjectId;
  prices: [
    {
      numberOfDays: number;
      pricePerHour: number;
      maxCrowdSize: number;
      minCrowdSize: number;
      location: string;
      timestamp: Date;
    }
  ];
}