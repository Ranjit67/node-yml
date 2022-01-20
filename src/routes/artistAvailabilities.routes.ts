import { Router } from "express";
import { ArtistAvailabilitiesController } from "../controllers";

class ArtistAvailabilitiesRoutes {
  public router = Router();
  public path = "/artist-availability";
  private artistAvailabilities = new ArtistAvailabilitiesController();
  constructor() {
    this.routes();
  }
  private routes() {
    this.router.post("/create", this.artistAvailabilities.create);
  }
}

export default ArtistAvailabilitiesRoutes;
