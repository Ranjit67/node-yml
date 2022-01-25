import { ObjectId, Schema, Document, model } from "mongoose";

export interface VisitorModel extends Document {
  users: [
    {
      spentTime: string;
      lastTimeVisit: Date;
      user: ObjectId;
      count: number;
    }
  ];
  artist: ObjectId;
}

const visitorSchema = new Schema({
  users: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      spentTime: {
        type: String,
        default: "0 min",
      },
      lastTimeVisit: {
        type: Date,
        default: new Date().toString(),
      },

      count: {
        type: Number,
        default: 1,
      },
    },
  ],
  artist: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
const VisitorSchema = model<VisitorModel>("Visitor", visitorSchema);
export default VisitorSchema;
