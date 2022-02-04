import {
  paymentBaseUrl,
  merchantID,
  merchantKey,
  passphrase,
  version,
} from "../config";
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
      const signature = md5(
        `merchant-id=${`19020314`}&passphrase=${passphrase}&..&version=${"v1"}`
      );
      const token = new Date().getTime();
      console.log("signature", signature);

      const result = await axios.get(
        `https://api.payfast.co.za/ping?testing=true`,

        {
          headers: {
            "merchant-id": "19020314",
            version: "v1",
            timestamp: new Date().toISOString(),
            signature,
          },
        }
      );
      console.log(result);
      res.json({
        success: {
          data: result.data,
        },
      });
    } catch (error) {
      res.status(400).json({
        error,
      });
    }
  }
}
export default PaymentController;
