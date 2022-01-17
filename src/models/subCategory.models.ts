import { Schema, model } from "mongoose";
import { SubCategoryModels } from "../types";

const subCategorySchema = new Schema({
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
  genresRefs: [
    {
      type: Schema.Types.ObjectId, // update when  genres are added
      ref: "Genre",
    },
  ],
  timestamp: {
    type: Date,
    default: new Date().toString(),
  },
});

const SubCategorySchema = model<SubCategoryModels>(
  "SubCategory",
  subCategorySchema
);
export default SubCategorySchema;
