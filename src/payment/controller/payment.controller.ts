import { paymentBaseUrl, merchantID, merchantKey } from "../config";
import { Request, Response, NextFunction } from "express";
import axios from "axios";

class PaymentController {
  async makePayment(req: Request, res: Response, next: NextFunction) {
    try {
      const { return_url, cancel_url, notify_url, amount, item_name } =
        req.body;
      const body = {
        merchant_id: merchantID,
        merchant_key: merchantKey,
        // return_url,
        // cancel_url,
        // notify_url,
        amount,
        item_name,
      };
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      const result = await axios.post(paymentBaseUrl + "/eng/process", body, {
        headers,
      });
      console.log(result);
      res.json({
        success: {
          data: result.data,
        },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
export default PaymentController;
