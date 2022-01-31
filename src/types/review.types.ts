import { ObjectId } from "mongoose";

export default interface ReviewModel extends Document {
  artist: ObjectId;
  // userReview: [
  //   {
  user: ObjectId;
  title: string;
  description: string;
  ratings: number;
  timestamp: Date;
  artistID: ObjectId;
  //   }
  // ];
}
