import { ObjectId } from "mongoose";

export default interface ReviewModel extends Document {
  artistRef: ObjectId;
  userReview: [
    {
      userRef: ObjectId;
      title: string;
      description: string;
      ratings: number;
      timestamp: Date;
    }
  ];
}
