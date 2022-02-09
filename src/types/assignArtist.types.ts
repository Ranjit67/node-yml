import { ObjectId, Document } from "mongoose";

export interface AssignArtistModel extends Document {
  manager: ObjectId;
  artists: [
    {
      artist: ObjectId;
      timestamp: Date;
    }
  ];
}
