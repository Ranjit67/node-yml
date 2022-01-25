import { Document, Schema, model, ObjectId } from "mongoose";

export interface ArtistBlockDateModel extends Document {
  artist: ObjectId;
  blockedDates: [
    {
      date: number;
      timestamp: Date;
    }
  ];
}

const artistBlockDateSchema = new Schema({
  artist: {
    type: Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
  blockedDates: [
    {
      date: Number,
      timestamp: Date,
    },
  ],
});
const ArtistBlockDateSchema = model<ArtistBlockDateModel>(
  "ArtistBlockDate",
  artistBlockDateSchema
);
export default ArtistBlockDateSchema;
