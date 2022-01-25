import { Router } from "express";

import { PersonalizeVideoController } from "../controllers";

class PersonalizeVideoRoute {
  public router = Router();
  public path = "/personalize-video";
  private personalizeVideoController = new PersonalizeVideoController();
  constructor() {
    this.routes();
  }
  private routes() {
    this.router.post("/create", this.personalizeVideoController.create);
    // this.router.get("/all-personalize-video", this.personalizeVideoController.getAll);
    // this.router.put("/update", this.personalizeVideoController.update);
    // this.router.delete("/delete", this.personalizeVideoController.delete);
    // this.router.get("/all-personalize-video/:id", this.personalizeVideoController.getOne);
  }
}
export default PersonalizeVideoRoute;
