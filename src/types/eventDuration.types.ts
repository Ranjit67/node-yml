import { Document } from "mongoose";

export default interface EventDurationModel extends Document {
  timestamp: Date;
  eventDuration: number;
}
