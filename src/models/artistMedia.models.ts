import { Document, Schema, model, ObjectId } from "mongoose";

export interface ArtistMediaModel extends Document {
  artist: ObjectId;
  artistVideos: [
    {
      videoFile: string;
      videoUrl: string;
      timestamp: Date;
    }
  ];
  artistPhotos: [
    {
      imageFile: string;
      imageUrl: string;
      timestamp: Date;
    }
  ];
  youtubeVideos: [
    {
      youtubeUrl: string;
      timestamp: Date;
    }
  ];
}

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
