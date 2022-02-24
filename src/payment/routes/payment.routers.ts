import { Router } from "express";
import { PaymentController } from "../controller";
class PaymentRoutes {
  public router = Router();
  public path = "/payment";
  private paymentController = new PaymentController();

  constructor() {
    this.routes();
  }
  routes() {
    this.router.post("/refund", this.paymentController.refund);
  }
}
export default PaymentRoutes;
