import { ObjectId, Document } from "mongoose";
export interface PersonalizeModel extends Document {
  user: ObjectId;
  artist: ObjectId;
  booking: ObjectId;
  videoUrl: string;
  videoFile: string;
  timestamp: Date;
  userCopy: Object;
  artistCopy: Object;
  isDeletesId: ObjectId[];
}
