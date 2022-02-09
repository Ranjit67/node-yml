import { Schema, model } from "mongoose";
import { GenresModels } from "../types";

const genresSchema = new Schema<GenresModels>({
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
    ref: "SubCategory",
  },
  timestamp: {
    type: Date,
    default: new Date(),
  },
});
const GenresSchema = model<GenresModels>("Genres", genresSchema);
export default GenresSchema;
