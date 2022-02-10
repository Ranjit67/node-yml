import { Router } from "express";
import { ArtistBlockDateController } from "../controllers";

class ArtistBlockDateRoutes {
  public router = Router();
  public path = "/artist-block-date";
  private artistBlockDate = new ArtistBlockDateController();
  constructor() {
    this.routes();
  }
  private routes() {
    this.router.post("/create", this.artistBlockDate.create);
    this.router.get(
      "/all-block-date/:artistId",
      this.artistBlockDate.getBlockDateByArtist
    );
    this.router.put("/delete", this.artistBlockDate.deleteBlockDateByArtist);
  }
}

export default ArtistBlockDateRoutes;
