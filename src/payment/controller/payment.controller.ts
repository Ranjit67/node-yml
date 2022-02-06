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
      const sandBox =
        "https://api.payfast.co.za/subscriptions/​[token]/[action]?testing=true";
      // const string =
      //   "merchant-id=19020314&passphrase=Sky-rise1902&..&version=v1";
      const signature = md5(
        `merchant-id=${`19020314`}&merchant_key=${"vqnknn5s7pkro"}&amount=890&item_name=my item&..&version=${"v1"}`
      );
      const token = new Date().getTime();
      // console.log("signature", signature);
      // const body = {
      //   merchant_id: "19020314",
      //   merchant_key: "vqnknn5s7pkro",
      //   return_url: "www.google.com",
      //   cancel_url: "www.facebook.com",
      //   notify_url: "www.instagram.com",
      //   name_first: "Ranok",
      //   name_last: "Saha",
      //   email_address: "sahooranjit5B19@gmail.com",
      //   m_payment_id: "123456789",
      //   amount: 11,
      //   item_name: "mona brata",
      //   item_description: "my brata",
      //   email_confirmation: "sahooranjit519@gmail.com",
      //   confirmation_address: "ts-hello",
      // };
      const body = {
        amount: 890,
        item_name: "my item",
        item_description: "my item description",
      };

      const result = await axios.post(
        `https://api.payfast.co.za/subscriptions/​2a4c1e23-e3cb-4b2c-9710-74a282e3bac9/adhoc?testing=true`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
            "merchant-id": "19020314",
            version: "v1",
            timestamp: new Date().toISOString(),
            signature: signature,
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
