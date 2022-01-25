import { Schema, model } from "mongoose";
import { DayModel } from "../types";

const daySchema = new Schema<DayModel>({
  days: [
    {
      timestamp: Date,
      day: Number,
    },
  ],
});

const DaySchema = model<DayModel>("Day", daySchema);

export default DaySchema;
