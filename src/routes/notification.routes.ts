import { Router } from "express";
import { NotificationController } from "../controllers";
// import { ProtectedMiddleware } from "../middleware";

class NotificationRoute {
  public router = Router();
  public path = "/notification";
  private notificationController = new NotificationController();
  constructor() {
    this.routes();
  }
  private routes() {
    this.router.post("/create", this.notificationController.create);
    this.router.get(
      "/all-notification/:userId",
      this.notificationController.getSelectedUserNotification
    );
    this.router.put("/make-read", this.notificationController.makeRead);
    this.router.put("/delete", this.notificationController.delete);
  }
}
export default NotificationRoute;
