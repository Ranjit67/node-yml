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
    this.router.get(
      "/all-personalize-video/user/:userId",
      this.personalizeVideoController.getPersonalizedVideoUser
    );
    this.router.get(
      "/all-personalize-video/artist/:artistId",
      this.personalizeVideoController.getPersonalizedVideoArtist
    );
    // this.router.get("/all-personalize-video", this.personalizeVideoController.getAll);
    // this.router.put("/update", this.personalizeVideoController.update);
    this.router.put(
      "/delete",
      this.personalizeVideoController.deletePersonalizedVideo
    );
    // this.router.get("/all-personalize-video/:id", this.personalizeVideoController.getOne);
  }
}
export default PersonalizeVideoRoute;
