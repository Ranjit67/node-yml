import { Router } from "express";
import { CrowdController } from "../controllers";

class CrowdRoutes {
  public router = Router();
  public path = "/crowd";
  private crowdController = new CrowdController();
  constructor() {
    this.routes();
  }
  private routes() {
    this.router.post("/create", this.crowdController.create);
    this.router.get("/all-crowd", this.crowdController.getAllCrowd);

    this.router.put("/update", this.crowdController.update);
    this.router.delete("/delete", this.crowdController.delete);
  }
}
export default CrowdRoutes;
