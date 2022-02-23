import { Router } from "express";
import { PricingController } from "../controllers";
class PricingRoutes {
  public router = Router();
  public path = "/pricing";
  private pricingController = new PricingController();
  constructor() {
    this.routes();
  }
  private routes() {
    this.router.post("/create", this.pricingController.create);
    this.router.get("/all-pricing/:artistId", this.pricingController.getAll);
    this.router.put("/update", this.pricingController.update);
    this.router.post("/fake", this.pricingController.fake);
    this.router.put("/delete", this.pricingController.delete);
  }
}
export default PricingRoutes;
