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

class PaymentController {
  async makePayment(req: Request, res: Response, next: NextFunction) {
    try {
      // const sandBox =
      //   "https://api.payfast.co.za/subscriptions/​[token]/[action]?testing=true";
      // const string =
      //   "merchant-id=19020314&passphrase=Sky-rise1902&..&version=v1";
      // const signature = md5(
      //   `merchant-id=${`19020314`}&passphrase=Sky-rise1902&version=${"v1"}`
      // );

      const token = String(new Date().getTime());
      const params = new URLSearchParams({
        merchant_id: "10025141",

        passphrase: "Sky-rise9937",
        amount: "2500",
        item_name: "Stuff",
        m_payment_id: "INV_001370",
        version: "v1",
      });

      const MD5Signature = md5(params.toString());
      const body = {
        merchant_id: "10025141",
        merchant_key: "jvo55t1ikkiii",
        amount: "100.00",
        item_name: "Test Product",
        signature: MD5Signature,
      };

      var urlencoded = new URLSearchParams();
      urlencoded.append("amount", "2500");
      urlencoded.append("item_name", "Stuff");
      urlencoded.append("m_payment_id", "INV_001370");
      // urlencoded.append("split_payment", "{\"merchant_id\":10000105,\"percentage\":10,\"amount\":1000,\"min\":100,\"max\":100000}");
      const result = await axios.post(
        `https://api.payfast.co.za/subscriptions/${MD5Signature}/adhoc?testing=true`,
        {
          body: urlencoded,
        },

        {
          headers: {
            // "Content-Type": "application/json",
            "merchant-id": "10025141",
            version: "v1",
            timestamp: new Date().toISOString(),
            signature: MD5Signature,
          },
        }
      );
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
