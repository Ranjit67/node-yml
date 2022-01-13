import { Router } from "express";
import { PromoCodeController } from "../controllers";

class PromoCodeRoutes {
  public router = Router();
  public path = "/promo-code";
  private promoCodeController = new PromoCodeController();
  constructor() {
    this.routes();
  }
  private routes() {
    this.router.post("/create", this.promoCodeController.create);
    this.router.get("/all-promo-code", this.promoCodeController.getAll);
    this.router.get(
      "/all-promo-code/:secretString",
      this.promoCodeController.getThroughSecretString
    );
    this.router.put("/update", this.promoCodeController.update);
    this.router.delete("/delete", this.promoCodeController.delete);
    this.router.put("/apply", this.promoCodeController.promoCodeApply);
  }
}
export default PromoCodeRoutes;
