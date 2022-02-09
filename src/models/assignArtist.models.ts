import { Schema, model } from "mongoose";
import { AssignArtistModel } from "../types";

const assignArtistSchema = new Schema({
  manager: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  artists: [
    {
      artist: {
        type: Schema.Types.ObjectId,
        ref: "User",
        // required: true,
      },
      timestamp: {
        type: Date,
        default: new Date().toString(),
      },
    },
  ],
});

const AssignArtistSchema = model<AssignArtistModel>(
  "AssignArtist",
  assignArtistSchema
);
export default AssignArtistSchema;
