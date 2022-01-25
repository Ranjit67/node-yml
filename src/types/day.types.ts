import { Document } from "mongoose";
export default interface DayModel extends Document {
  days: [
    {
      timestamp: Date;
      day: number;
    }
  ];
}
