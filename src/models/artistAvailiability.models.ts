import { Schema, model } from "mongoose";
import { ArtistAvailabilityModel } from "../types";

const artistAvailabilitySchema = new Schema({
  artistRef: {
    type: Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
  availabilities: [
    {
      isBlocked: {
        type: Boolean,
        default: false,
      },
      date: {
        type: Date,
      },
    },
  ],
});
const ArtistAvailabilitySchema = model<ArtistAvailabilityModel>(
  "ArtistAvailability",
  artistAvailabilitySchema
);
export default ArtistAvailabilitySchema;
