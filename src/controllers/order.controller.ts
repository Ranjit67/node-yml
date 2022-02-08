import { Request, Response, NextFunction } from "express";
import { BadRequest, GatewayTimeout, NotAcceptable } from "http-errors";
import { BookingSchema, OrderSchema } from "../models";
import { orderMessage } from "../resultMessage";

class OrderController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { bookingId, status } = req.body;
      if (!bookingId || !status)
        throw new BadRequest(orderMessage.error.allField);
      const orderSave = await OrderSchema.create({
        booking: bookingId,
        status,
      });
      if (!orderSave) throw new GatewayTimeout(orderMessage.error.notCreated);
      res.json({
        success: {
          message: orderMessage.success.created,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { orderId, bookingId, status } = req.body;
      console.log(req.body);
      if (!orderId || !bookingId)
        throw new BadRequest(orderMessage.error.allField);
      const updateOrder = await OrderSchema.findOneAndUpdate(
        {
          _id: orderId,
          booking: bookingId,
          status: {
            $ne: "confirm",
          },
        },
        { status }
      );
      if (!updateOrder) throw new GatewayTimeout(orderMessage.error.notMatch);

      if (status === "cancel" || status === "failed") {
        const orderDelete = await OrderSchema.findOneAndDelete({
          _id: orderId,
        });
        if (!orderDelete)
          throw new GatewayTimeout(orderMessage.error.notDelete);
        const createOrder = await OrderSchema.create({
          booking: bookingId,
          status: status,
        });
        const bookingUpdate = await BookingSchema.findOneAndUpdate(
          {
            _id: bookingId,
          },
          {
            orderId: createOrder._id,
          }
        );
        if (!createOrder)
          throw new GatewayTimeout(orderMessage.error.newNotCreated);
      } else {
        const bookingUpdate = await BookingSchema.findOneAndUpdate(
          {
            _id: bookingId,
          },
          {
            orderId: orderId,
          }
        );
      }
      res.json({
        success: {
          message: orderMessage.success.paymentSuccess,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getByBookingId(req: Request, res: Response, next: NextFunction) {
    try {
      const { bookingId } = req.params;
      if (!bookingId) throw new BadRequest(orderMessage.error.allField);
      const findOrder = await OrderSchema.findOne({ booking: bookingId });
      if (!findOrder) throw new GatewayTimeout(orderMessage.error.notFound);
      res.json({
        success: {
          data: findOrder,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default OrderController;
