import { Schema, model } from "mongoose";
import { ReviewModel } from "../types";

const reviewSchema = new Schema({
  artist: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  // userReview: [
  //   {
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  ratings: {
    type: Number,
  },
  timestamp: {
    type: Date,
    default: new Date(),
  },
  artistID: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  //   },
  // ],
});

const ReviewSchema = model<ReviewModel>("Review", reviewSchema);
export default ReviewSchema;
