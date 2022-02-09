import { Schema, model } from "mongoose";
import { PromoCodeModel } from "../types";

const promoCodeSchema = new Schema<PromoCodeModel>({
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

  startingDate: {
    type: Date,
    default: new Date(),
  },
  endingDate: {
    type: Date,
    default: new Date(new Date().getTime() + 86400000 * 2),
  },

  timestamp: {
    type: Date,
    default: new Date(),
  },
  appliedUser: [
    {
      user: {
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
