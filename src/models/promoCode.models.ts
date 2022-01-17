import { Document, Schema, model, ObjectId } from "mongoose";

export interface PromoCodeModel extends Document {
  isExpired: boolean;
  numberOfTimeUsed: string;
  secretString: string;
  percentage: string;
  maxCashBack: string;
  minimumOrder: string;
  startingDate: Date;
  endingDate: Date;
  dedicatedSomeOne: ObjectId;
  appliedUser: [
    {
      userRef: ObjectId;
      numberOfTimeUsed: [
        {
          date: Date;
          benefitAmount: string;
        }
      ];
    }
  ];
}

const promoCodeSchema = new Schema({
  isExpired: {
    type: Boolean,
    default: false,
  },
  numberOfTimeUsed: {
    type: String,
  },
  secretString: {
    type: String,
    required: true,
    unique: true,
  },
  percentage: {
    type: String,
    required: true,
  },
  maxCashBack: {
    type: String,
  },
  minimumOrder: {
    type: String,
  },
  startingDate: {
    type: Date,
    default: new Date().toString(),
  },
  endingDate: {
    type: Date,
    default: new Date(new Date().getTime() + 86400000 * 2).toString(),
  },
  dedicatedSomeOne: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  appliedUser: [
    {
      userRef: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      numberOfTimeUsed: [
        {
          date: {
            type: Date,
            default: new Date().toString(),
          },
          benefitAmount: String,
        },
      ],
    },
  ],
});
const PromoCodeSchema = model<PromoCodeModel>("PromoCode", promoCodeSchema);
export default PromoCodeSchema;