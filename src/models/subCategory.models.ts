import { Schema, model } from "mongoose";
import { SubCategoryModels } from "../types";

const subCategorySchema = new Schema<SubCategoryModels>({
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
  parentId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  genres: [
    {
      type: Schema.Types.ObjectId, // update when  genres are added
      ref: "Genre",
    },
  ],
  timestamp: {
    type: Date,
    default: new Date(),
  },
});

const SubCategorySchema = model<SubCategoryModels>(
  "SubCategory",
  subCategorySchema
);
export default SubCategorySchema;
