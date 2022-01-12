import { Document, Schema, model, ObjectId } from "mongoose";

export interface assignArtistModel extends Document {
  managerRef: ObjectId;
  artistRefs: [
    {
      artistRef: ObjectId;
      timestamp: Date;
    }
  ];
}
const assignArtistSchema = new Schema({
  managerRef: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  artistRefs: [
    {
      artistRef: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
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
