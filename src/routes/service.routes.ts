import { Router } from "express";
import { ServiceController } from "../controllers";

class ServiceRoute {
  public router = Router();
  public path = "/service";
  private serviceController = new ServiceController();
  constructor() {
    this.routes();
  }
  private routes() {
    this.router.post("/create", this.serviceController.create);
    this.router.get("/all-services", this.serviceController.getAll);
    this.router.get("/all-services/:id", this.serviceController.getOne);
    this.router.put("/update", this.serviceController.update);
    this.router.delete("/delete", this.serviceController.delete);
  }
}
