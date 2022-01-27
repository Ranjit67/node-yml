import { ObjectId, Document } from "mongoose";

export type transaction = "Debit" | "Credit";

export default interface WalletHistoryModel extends Document {
  user: ObjectId;
  transactionHistory: [
    {
      type: transaction;
      amount: number;
      timestamp: Date;
      title: string;
      description: string;
      // transactionId: string;
    }
  ];
}
