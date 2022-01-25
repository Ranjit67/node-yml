import { ObjectId, Document } from "mongoose";

export default interface WalletModel extends Document {
  user: ObjectId;
  balance: number;
  spent: number;
}
