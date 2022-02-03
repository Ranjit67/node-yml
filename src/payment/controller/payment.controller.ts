import { paymentBaseUrl, merchantID, merchantKey, passphrase } from "../config";
import { Request, Response, NextFunction } from "express";
import axios from "axios";
import md5 from "md5";
// console.log(
//   "PaymentRoutes",
//   md5("merchant-id=10000100&passphrase=​passphrase&..&version=v1")
// );
class PaymentController {
  async makePayment(req: Request, res: Response, next: NextFunction) {
    try {
      const { return_url, cancel_url, notify_url, amount, item_name } =
        req.body;
      //   const string = `email_address=`
      const signature = `merchant-id=${merchantID}&passphrase=​passphrase&..&version=v1`;
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
