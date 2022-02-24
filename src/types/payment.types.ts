import { Document, ObjectId } from "mongoose";

export default interface PaymentModel extends Document {
  booking: ObjectId;
  artist: ObjectId;
  user: ObjectId;
  walletAmount: number;
  bankAmount: number;
  paymentData: Object;
  walletRefund: Boolean;
  bankRefund: Boolean;
  promoCode: Object;
  bankRefundAmount: number;
  promoCodeDisCountAmount: number;
  cancelDate: Date;
  timestamp: Date;
}
