import {
  testSecretKey,
  testPublicKey,
  livePublicKey,
  liveSecretKey,
  baseUrl,
} from "../config";
import { Request, Response, NextFunction } from "express";
import https from "https";

class PaymentController {
  async refund(reqs: Request, ress: Response, next: NextFunction) {
    try {
      const { transactionId, amount } = reqs.body;

      const params = JSON.stringify({
        transaction: transactionId,
        amount: amount,
      });
      const options = {
        hostname: "api.paystack.co",
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
            ress.json({ data: JSON.parse(data) });
            // console.log(JSON.parse(data));
          });
        })
        .on("error", (error) => {
          ress.json({ data: error });
        });
      req.write(params);
      req.end();
    } catch (error) {
      next(error);
    }
  }
}
export default PaymentController;
