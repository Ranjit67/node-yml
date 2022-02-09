import { Document, ObjectId } from "mongoose";

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
