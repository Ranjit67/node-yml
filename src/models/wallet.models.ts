import { Schema, model } from "mongoose";
import { WalletModel } from "../types";

const walletSchema = new Schema<WalletModel>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  spent: {
    type: Number,
    default: 0,
  },
});

const WalletSchema = model<WalletModel>("Wallet", walletSchema);
export default WalletSchema;
