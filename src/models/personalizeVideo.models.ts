import { Document, Schema, model, ObjectId } from "mongoose";

export interface PersonalizeModel extends Document {
  user: ObjectId;
  artist: ObjectId;
  booking: ObjectId;
  videoUrl: string;
  videoFile: string;
  timestamp: Date;
}

const personalizeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: "User",
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
  timestamp: {
    type: Date,
  },
});

const PersonalizeVideoSchema = model<PersonalizeModel>(
  "PersonalizeVideo",
  personalizeSchema
);

export default PersonalizeVideoSchema;
