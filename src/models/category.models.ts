import { Document, Schema, model, ObjectId } from "mongoose";

export interface CategoryModels extends Document {
  title: string;
  subcategories: ObjectId[];
  genres: ObjectId[];
  timestamp: Date;
  iconUrl: string;
  iconFile: string;
}

const categorySchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  iconUrl: {
    type: String,
  },
  iconFile: {
    type: String,
  },
  subcategories: [
    {
      type: Schema.Types.ObjectId,
      ref: "SubCategory",
    },
  ],
  genres: [
    {
      type: Schema.Types.ObjectId,
      ref: "Genre",
    },
  ],
  timestamp: {
    type: Date,
    default: new Date().toString(),
  },
});
const CategorySchema = model<CategoryModels>("Category", categorySchema);
export default CategorySchema;
