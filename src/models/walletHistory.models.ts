import { Schema, model } from "mongoose";
import { WalletHistoryModel } from "../types";

const walletHistorySchema = new Schema({
  userRef: {
    type: Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
  transactionHistory: [
    {
      type: {
        type: String,
        enum: ["DB", "CR"],
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
      timestamp: {
        type: Date,
        default: new Date().toString(),
      },
    },
  ],
});

const WalletHistorySchema = model<WalletHistoryModel>(
  "WalletHistory",
  walletHistorySchema
);

export default WalletHistorySchema;
