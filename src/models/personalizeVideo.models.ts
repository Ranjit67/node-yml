import { Schema, model } from "mongoose";
import { PersonalizeModel } from "../types";

const personalizeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  userCopy: {
    type: Object,
  },
  artistCopy: {
    type: Object,
  },
  booking: {
    type: Schema.Types.ObjectId,
    ref: "Booking",
  },
  videoUrl: {
    type: String,
  },
  videoFile: {
    type: String,
  },
  isDeletesId: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  timestamp: {
    type: Date,
  },
});

const PersonalizeVideoSchema = model<PersonalizeModel>(
  "PersonalizeVideo",
  personalizeSchema
);

export default PersonalizeVideoSchema;
