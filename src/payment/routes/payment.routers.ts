import { Router } from "express";
import { PaymentController } from "../controller";
import md5 from "md5";
class PaymentRoutes {
  public router = Router();
  public path = "/payment";
  private paymentController = new PaymentController();

  constructor() {
    // console.log(
    //   "PaymentRoutes",
    //   md5("merchant-id=10000100&passphrase=​passphrase&..&version=v1")
    // );
    this.routes();
  }
  routes() {
    this.router.post("/check-out", this.paymentController.makePayment);
  }
}
export default PaymentRoutes;
