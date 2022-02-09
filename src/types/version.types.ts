import { Document } from "mongoose";

export interface VersionModel extends Document {
  title: string;
  timestamp: Date;
  description: string;
  version: number;
  isDismissible: boolean;
}
