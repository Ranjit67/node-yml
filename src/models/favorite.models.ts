import { Document, Schema, model, ObjectId } from "mongoose";
import { FavoritesModel } from "../types";

const FavoritesSchema = new Schema({
  artist: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  favorites: [
    {
      timestamp: {
        type: Date,
        default: new Date(),
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
});

const FavoriteSchema = model<FavoritesModel>("Favorite", FavoritesSchema);
export default FavoriteSchema;
