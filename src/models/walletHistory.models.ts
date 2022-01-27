import { Schema, model } from "mongoose";
import { WalletHistoryModel } from "../types";

const walletHistorySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
  transactionHistory: [
    {
      type: {
        type: String,
        enum: ["Debit", "Credit"],
      },
      amount: {
        type: Number,
      },
      title: {
        type: String,
      },
      description: {
        type: String,
      },
      // transactionId: {
      //   type: String,
      // },
      timestamp: {
        type: Date,
        default: new Date(),
      },
    },
  ],
});

const WalletHistorySchema = model<WalletHistoryModel>(
  "WalletHistory",
  walletHistorySchema
);

export default WalletHistorySchema;
