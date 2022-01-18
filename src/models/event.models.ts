import { Document, Schema, model } from "mongoose";

export interface eventModel extends Document {
  eventName: string;
  timestamp: Date;
  iconUrl: string;
  iconFile: string;
  imageUrl: string;
  imageFile: string;
}

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
const EventSchema = model<eventModel>("Event", eventSchema);
export default EventSchema;
