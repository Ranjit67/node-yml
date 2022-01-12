import { Document, Schema, model } from "mongoose";

export interface serviceModel extends Document {
  serviceName: string;
  timestamp: Date;
}
const serviceSchema = new Schema({
  serviceName: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: new Date().toString(),
  },
});
const ServiceSchema = model<serviceModel>("Service", serviceSchema);
export default ServiceSchema;
