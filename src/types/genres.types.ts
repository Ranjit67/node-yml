import { Document, ObjectId } from "mongoose";

export default interface GenresModels extends Document {
  title: string;
  iconUrl: string;
  parentId: ObjectId;
  iconFile: string;
  timestamp: Date;
}
