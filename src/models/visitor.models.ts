import { ObjectId, Schema, Document, model } from "mongoose";

export interface VisitorModel extends Document {
  userRefs: [
    {
      spentTime: string;
      lastTimeVisit: Date;
      userRef: ObjectId;
      count: number;
    }
  ];
  artistRef: ObjectId;
}

const visitorSchema = new Schema({
  userRefs: [
    {
      userRef: {
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
  artistRef: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
const VisitorSchema = model<VisitorModel>("Visitor", visitorSchema);
export default VisitorSchema;
