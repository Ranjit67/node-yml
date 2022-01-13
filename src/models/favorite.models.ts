import { Document, Schema, model, ObjectId } from "mongoose";

export interface FavoritesModel extends Document {
  artistRef: ObjectId;
  favorites: [
    {
      timestamp: Date;
      userRef: ObjectId;
    }
  ];
}

const FavoritesSchema = new Schema({
  artistRef: {
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
      userRef: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
});

const FavoriteSchema = model<FavoritesModel>("Favorite", FavoritesSchema);
export default FavoriteSchema;
