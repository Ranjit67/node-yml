import { Document, Schema, model, ObjectId } from "mongoose";

export interface CategoryModels extends Document {
  title: string;
  subCategoryRefs: ObjectId[];
  genresRefs: ObjectId[];
  timestamp: Date;
}

const categorySchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  subCategoryRefs: [
    {
      type: Schema.Types.ObjectId,
      ref: "SubCategory",
    },
  ],
  genresRefs: [
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
