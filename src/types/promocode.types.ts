import { Document, ObjectId } from "mongoose";

export interface PromoCodeModel extends Document {
  // isExpired: boolean;
  numberOfTimeUsed: string;
  secretString: string;
  percentage: string;
  maxCashBack: string;
  minimumOrder: string;
  startingDate: Date;
  endingDate: Date;
  dedicatedSomeOne: ObjectId;
  timestamp: Date;
  appliedUser: [
    {
      user: ObjectId;
      numberOfTimeUsed: [
        {
          date: Date;
          benefitAmount: string;
        }
      ];
    }
  ];
}
