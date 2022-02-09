import { ObjectId, Schema, Document, model } from "mongoose";

import { VisitorModel } from "../types";

const visitorSchema = new Schema<VisitorModel>({
  users: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      spentTime: {
        type: Number,
        default: 1,
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
