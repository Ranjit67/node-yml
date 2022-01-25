import { Document, Schema, model, ObjectId } from "mongoose";

export interface assignArtistModel extends Document {
  manager: ObjectId;
  artists: [
    {
      artist: ObjectId;
      timestamp: Date;
    }
  ];
}
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

const AssignArtistSchema = model<assignArtistModel>(
  "AssignArtist",
  assignArtistSchema
);
export default AssignArtistSchema;
