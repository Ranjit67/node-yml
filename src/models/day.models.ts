import { Schema, model } from "mongoose";
import { DayModel } from "../types";

const daySchema = new Schema<DayModel>({
  days: [Number],
});

const DaySchema = model<DayModel>("Day", daySchema);

export default DaySchema;
