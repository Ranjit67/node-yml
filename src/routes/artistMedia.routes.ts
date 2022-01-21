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
    this.router.post("/create-photo", this.artistMediaController.photoCreate);
    this.router.get(
      "/all-artist-media-video/:artistId",
      this.artistMediaController.getArtistVideo
    );
    this.router.get(
      "/all-artist-media-photo/:artistId",
      this.artistMediaController.getArtistPhoto
    );
    this.router.post("/delete-video", this.artistMediaController.videoDelete);
    this.router.post("/delete-photo", this.artistMediaController.photoDelete);
  }
}
export default ArtistMediaRoute;
