import { Document, Schema, model } from "mongoose";

export interface serviceModel extends Document {
  serviceName: string;
  timestamp: Date;
  iconUrl: string;
  iconFile: string;
  imageUrl: string;
  imageFile: string;
}
const serviceSchema = new Schema({
  serviceName: {
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
const ServiceSchema = model<serviceModel>("Service", serviceSchema);
export default ServiceSchema;
