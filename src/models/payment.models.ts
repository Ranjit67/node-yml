import { Schema, model } from "mongoose";
import { PaymentModel } from "../types";
const paymentSchema = new Schema<PaymentModel>({
  booking: {
    type: Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  walletAmount: {
    type: Number,
    default: 0,
  },
  bankAmount: {
    type: Number,
    default: 0,
  },
  paymentData: {
    type: Object,
  },
  promoCode: {
    type: Object,
  },
  promoCodeDisCountAmount: {
    type: Number,
    default: 0,
  },
  timestamp: {
    type: Date,
  },
});

const PaymentSchema = model<PaymentModel>("Payment", paymentSchema);
export default PaymentSchema;
