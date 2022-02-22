import { ObjectId, Document } from "mongoose";
export interface EmailTokenModel extends Document {
  userRef: ObjectId;
  emailTokenString: string;
  timestamp: Date;
}
