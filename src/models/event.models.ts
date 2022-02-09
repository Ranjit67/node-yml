import { Document, Schema, model } from "mongoose";
import { EventModel } from "../types";

const eventSchema = new Schema({
  eventName: {
    type: String,
    required: true,
    unique: true,
  },
  iconUrl: {
    type: String,
  },
  iconFile: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  imageFile: {
    type: String,
  },

  timestamp: {
    type: Date,
    default: new Date().toString(),
  },
});
const EventSchema = model<EventModel>("Event", eventSchema);
export default EventSchema;
