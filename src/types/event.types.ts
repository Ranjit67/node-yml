import { Document } from "mongoose";

export interface EventModel extends Document {
  eventName: string;
  timestamp: Date;
  iconUrl: string;
  iconFile: string;
  imageUrl: string;
  imageFile: string;
}
