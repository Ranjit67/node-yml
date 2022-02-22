import { Document, ObjectId } from "mongoose";

export default interface PaymentModel extends Document {
  booking: ObjectId;
  artist: ObjectId;
  user: ObjectId;
  walletAmount: number;
  bankAmount: number;
  paymentData: Object;
  promoCode: Object;
  promoCodeDisCountAmount: number;
  timestamp: Date;
}
