import { Schema, model } from "mongoose";
import { EventDurationModel } from "../types";
const eventDurationSchema = new Schema<EventDurationModel>({
  timestamp: Date,
  eventDuration: Number,
});

const EventDurationSchema = model<EventDurationModel>(
  "EventDuration",
  eventDurationSchema
);

export default EventDurationSchema;
