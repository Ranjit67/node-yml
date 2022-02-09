import { Schema, model } from "mongoose";

import { ArtistBlockDateModel } from "../types";

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
