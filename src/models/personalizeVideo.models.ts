import { Document, Schema, model, ObjectId } from "mongoose";

export interface PersonalizeModel extends Document {
  userRef: ObjectId;
  artistRef: ObjectId;
  bookingRef: ObjectId;
  videoUrl: string;
  videoFile: string;
  timestamp: Date;
}

const personalizeSchema = new Schema({
  userRef: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  artistRef: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  bookingRef: {
    type: Schema.Types.ObjectId,
    ref: "Booking",
  },
  videoUrl: {
    type: String,
  },
  videoFile: {
    type: String,
  },
  timestamp: {
    type: Date,
  },
});

const PersonalizeVideoSchema = model<PersonalizeModel>(
  "PersonalizeVideo",
  personalizeSchema
);

export default PersonalizeVideoSchema;
