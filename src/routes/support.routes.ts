import { Router } from "express";
import { SupportController } from "../controllers";
class SupportRouter {
  public router = Router();
  public path = "/support";
  private supportController = new SupportController();

  constructor() {
    this.routes();
  }
  private routes() {
    this.router.post("/create", this.supportController.create);
    this.router.get("/all-supports", this.supportController.getAllSupportList);
    this.router.get("/all-supports/:supportId", this.supportController.getOne);
    this.router.delete("/delete", this.supportController.delete);
    this.router.post(
      "/support-email/:userId",
      this.supportController.supportEmail
    );
  }
}
export default SupportRouter;
