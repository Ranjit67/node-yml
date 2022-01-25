import { Document, ObjectId } from "mongoose";

export default interface SubCategoryModels extends Document {
  title: string;
  iconUrl: string;
  parentId: ObjectId;
  genres: ObjectId[];
  iconFile: string;
  timestamp: Date;
}
