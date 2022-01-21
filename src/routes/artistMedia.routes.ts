import { Router } from "express";
import { ArtistMediaController } from "../controllers";

class ArtistMediaRoute {
  public router = Router();
  public path = "/artist-media";
  private artistMediaController = new ArtistMediaController();
  constructor() {
    this.routes();
  }
  private routes() {
    this.router.post("/create-video", this.artistMediaController.videoCreate);
    // this.router.get("/all-pastEvent", this.pastEventController.getAll);
    // this.router.put("/update", this.pastEventController.update);
    // this.router.delete("/delete", this.pastEventController.delete);
    // this.router.get("/all-pastEvent/:id", this.pastEventController.getOne);
  }
}
export default ArtistMediaRoute;
