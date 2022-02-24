import {
  testSecretKey,
  testPublicKey,
  livePublicKey,
  liveSecretKey,
  baseUrl,
} from "../config";
import { Request, Response, NextFunction } from "express";
import https from "https";
import { NotAcceptable, BadRequest, NotFound } from "http-errors";
import { BookingSchema, PaymentSchema } from "../../models";
import { paymentMessage } from "../../resultMessage";

class PaymentController {
  async refund(reqs: Request, ress: Response, next: NextFunction) {
    try {
      const { transactionId, bookingId } = reqs.body;
      if (!transactionId || !bookingId)
        throw new BadRequest(paymentMessage.error.allField);
      const booking: any = await BookingSchema.findById(bookingId).populate(
        "payment"
      );
      if (!booking) throw new NotFound(paymentMessage.error.bookingNotFound);
      if (!booking?.payment?._id?.toString())
        throw new NotAcceptable(paymentMessage.error.paymentNot);
      if (!booking?.payment?.bankAmount)
        throw new NotAcceptable(paymentMessage.error.noAnyAmount);
      if (booking?.payment?.bankRefund)
        throw new NotAcceptable(paymentMessage.error.paymentActionRefunded);
      const updatePaymentStatus = await PaymentSchema.findByIdAndUpdate(
        booking?.payment?._id,
        { bankRefund: true, refundDate: new Date() }
      );
      if (!updatePaymentStatus)
        throw new NotAcceptable(paymentMessage.error.paymentNotUpdated);

      const params = JSON.stringify({
        transaction: transactionId,
        amount: booking?.payment?.bankAmount,
      });
      const options = {
        hostname: baseUrl,
        port: 443,
        path: "/refund",
        method: "POST",
        headers: {
          Authorization: `Bearer ${testSecretKey}`,
          "Content-Type": "application/json",
        },
      };
      const req = https
        .request(options, (res) => {
          let data = "";
          res.on("data", (chunk) => {
            data += chunk;
          });
          res.on("end", () => {
            ress.json({
              success: {
                message: paymentMessage.success.paymentRefunded,
                data: JSON.parse(data),
              },
            });
          });
        })
        .on("error", (error) => {
          throw error;
        });
      req.write(params);
      req.end();
    } catch (error) {
      next(error);
    }
  }
}
export default PaymentController;
