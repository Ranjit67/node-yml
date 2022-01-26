import { Router } from "express";
import { NotificationController } from "../controllers";

class NotificationRoute {
  public router = Router();
  public path = "/notification";
  private notificationController = new NotificationController();
  constructor() {
    this.routes();
  }
  private routes() {
    this.router.post("/create", this.notificationController.create);
    // this.router.get("/all-notification", this.notificationController.getAll);
    // this.router.put("/update", this.notificationController.update);
    // this.router.delete("/delete", this.notificationController.delete);
    // this.router.get("/all-notification/:id", this.notificationController.getOne);
  }
}
