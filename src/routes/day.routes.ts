import { Router } from "express";
import { DayController } from "../controllers";

class DayRoutes {
  public router = Router();
  public path = "/day";
  private dayController = new DayController();
  constructor() {
    this.routes();
  }
  private routes() {
    this.router.post("/create", this.dayController.create);
    this.router.get("/all-day", this.dayController.getAllDay);

    this.router.put("/update", this.dayController.update);
    this.router.put("/delete", this.dayController.delete);
  }
}

export default DayRoutes;
