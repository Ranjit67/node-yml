import { Schema, model } from "mongoose";
import { ReviewModel } from "../types";

const reviewSchema = new Schema({
  artistRef: {
    type: Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
  userReview: [
    {
      userRef: {
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
        default: new Date().toString(),
      },
    },
  ],
});

const ReviewSchema = model<ReviewModel>("Review", reviewSchema);
export default ReviewSchema;
