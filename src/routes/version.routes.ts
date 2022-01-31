import { Router } from "express";
import { VersionController } from "../controllers";

class VersionRouter {
  public router = Router();
  public path = "/version";
  private versionController = new VersionController();

  constructor() {
    this.routes();
  }
  private routes() {
    this.router.post("/create", this.versionController.create);
    this.router.get("/app-version", this.versionController.getSingle);
  }
}

export default VersionRouter;
