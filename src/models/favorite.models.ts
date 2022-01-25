import { Document, Schema, model, ObjectId } from "mongoose";

export interface FavoritesModel extends Document {
  artist: ObjectId;
  favorites: [
    {
      timestamp: Date;
      user: ObjectId;
    }
  ];
}

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
        default: new Date().toString(),
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
