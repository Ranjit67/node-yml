import { ObjectId } from "mongoose";

export default interface PricingModel extends Document {
  artist: ObjectId;
  prices: [
    {
      numberOfDays: number;
      pricePerHour: number;
      maxCrowdSize: number;
      minCrowdSize: number;
      location: {
        lat: number;
        lng: number;
        address: string;
        country: string;
      };
      timestamp: Date;
    }
  ];
}
