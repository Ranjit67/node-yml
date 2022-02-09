import { Document, ObjectId } from "mongoose";

export interface ServiceModel extends Document {
  serviceName: string;
  timestamp: Date;
  iconUrl: string;
  iconFile: string;
  imageUrl: string;
  imageFile: string;
}
