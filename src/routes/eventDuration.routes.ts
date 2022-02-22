import { Router } from "express";
import { EventDurationController } from "../controllers";

class EventDurationRoutes {
  public router = Router();
  public path = "/event-duration";
  private eventController = new EventDurationController();
  constructor() {
    this.routes();
  }
  private routes() {
    this.router.post("/create", this.eventController.create);
    this.router.get("/all-event-duration", this.eventController.getAll);

    this.router.put("/update", this.eventController.update);
    this.router.delete("/delete", this.eventController.delete);
  }
}

export default EventDurationRoutes;
