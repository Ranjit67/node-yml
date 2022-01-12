import { Document, Schema, model } from "mongoose";

export interface eventModel extends Document {
  eventName: string;
  timestamp: Date;
}

const eventSchema = new Schema({
  eventName: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: new Date().toString(),
  },
});
const EventSchema = model<eventModel>("Event", eventSchema);
export default EventSchema;
