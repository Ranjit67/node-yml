import { Schema, model } from "mongoose";
import { CategoryModels } from "../types";

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
  imageUrl: {
    type: String,
  },
  imageFile: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: new Date().toString(),
  },
});
const CategorySchema = model<CategoryModels>("Category", categorySchema);
export default CategorySchema;
