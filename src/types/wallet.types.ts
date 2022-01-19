import { ObjectId, Document } from "mongoose";

export default interface WalletModel extends Document {
  userRef: ObjectId;
  balance: number;
  spent: number;
}
