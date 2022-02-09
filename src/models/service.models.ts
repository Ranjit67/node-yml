import { Schema, model } from "mongoose";
import { ServiceModel } from "../types";

const serviceSchema = new Schema<ServiceModel>({
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
    default: new Date(),
  },
});
const ServiceSchema = model<ServiceModel>("Service", serviceSchema);
export default ServiceSchema;
