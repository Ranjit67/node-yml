import { Document } from "mongoose";
export default interface DayModel extends Document {
  days: number[];
}
