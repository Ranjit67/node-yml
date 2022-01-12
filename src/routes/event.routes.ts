import { Router } from "express";
import { EventController } from "../controllers";

class EventRoutes {
  public router = Router();
  public path = "/event";
  private eventController = new EventController();
  constructor() {
    this.routes();
  }
  private routes() {
    this.router.post("/create", this.eventController.create);
    this.router.get("/all-events", this.eventController.getAll);
    this.router.get("/all-events/:id", this.eventController.getOne);
    this.router.put("/update", this.eventController.update);
    this.router.delete("/delete", this.eventController.delete);
  }
}
export default EventRoutes;
