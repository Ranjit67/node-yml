import { ObjectId, Document } from "mongoose";

export interface CategoryModels extends Document {
  title: string;
  subcategories: ObjectId[];
  genres: ObjectId[];
  timestamp: Date;
  iconUrl: string;
  iconFile: string;
  imageUrl: string;
  imageFile: string;
}
