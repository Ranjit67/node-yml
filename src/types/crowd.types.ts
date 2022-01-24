import { Document } from "mongoose";
export default interface CrowdModel extends Document {
  max: number;
  min: number;
  timestamp: Date;
}
