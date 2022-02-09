import { Schema, model } from "mongoose";
import { ArtistMediaModel } from "../types";

const artistMediaSchema = new Schema({
  artist: {
    type: Schema.Types.ObjectId,
    ref: "User",
    unique: true,
    required: true,
  },
  artistVideos: [
    {
      videoFile: String,
      videoUrl: String,
      timestamp: {
        type: Date,
        default: new Date(),
      },
    },
  ],
  artistPhotos: [
    {
      imageFile: String,
      imageUrl: String,
      timestamp: {
        type: Date,
        default: new Date(),
      },
    },
  ],
  youtubeVideos: [
    {
      youtubeUrl: String,
      timestamp: {
        type: Date,
        default: new Date(),
      },
    },
  ],
});

const ArtistMediaSchema = model<ArtistMediaModel>(
  "ArtistMedia",
  artistMediaSchema
);
export default ArtistMediaSchema;
