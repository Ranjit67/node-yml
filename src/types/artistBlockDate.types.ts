import { ObjectId, Document } from "mongoose";
export interface ArtistBlockDateModel extends Document {
  artist: ObjectId;
  blockedDates: [
    {
      date: number;
      dateDayFormat: string;
      timestamp: Date;
    }
  ];
}
