import { Router } from "express";
import { VisitorController } from "../controllers";
class VisitorRoute {
  public router = Router();
  public path = "/visitor";
  private visitorController = new VisitorController();
  constructor() {
    this.routes();
  }
  private routes() {
    this.router.post("/create", this.visitorController.create);
    this.router.get(
      "/all-visitor-artist/:artistId",
      this.visitorController.getVisitorsList
    );
  }
}
export default VisitorRoute;
