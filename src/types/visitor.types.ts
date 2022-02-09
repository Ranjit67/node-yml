import { Document, ObjectId } from "mongoose";

export interface VisitorModel extends Document {
  users: [
    {
      spentTime: number;
      lastTimeVisit: Date;
      user: ObjectId;
      count: number;
    }
  ];
  artist: ObjectId;
}
