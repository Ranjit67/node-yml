import { Router } from "express";
import { OrderController } from "../controllers";

class OrderRoutes {
  public router = Router();
  public path = "/order";
  private languageController = new OrderController();
  constructor() {
    this.routes();
  }
  private routes() {
    this.router.post("/create", this.languageController.create);
    this.router.put("/update", this.languageController.update);
    // this.router.delete("/", this.languageController.delete);
    this.router.get(
      "/booking/:bookingId",
      this.languageController.getByBookingId
    );
  }
}

export default OrderRoutes;
