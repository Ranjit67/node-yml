import { ObjectId, Document } from "mongoose";

export interface FavoritesModel extends Document {
  artist: ObjectId;
  favorites: [
    {
      timestamp: Date;
      user: ObjectId;
    }
  ];
}
