import { NextFunction } from "express";
import { Document, Schema, model, ObjectId } from "mongoose";

type orderStatus = "pending" | "confirm" | "cancel" | "failed";

export interface OrderModels extends Document {
  booking: ObjectId;
  status: orderStatus;
}

const orderSchema = new Schema({
  booking: {
    type: Schema.Types.ObjectId,
    ref: "Booking",
  },

  status: {
    enum: ["pending", "confirm", "cancel", "failed"],
    type: String,
    default: "pending",
  },
});

const OrderSchema = model<OrderModels>("Order", orderSchema);
export default OrderSchema;
