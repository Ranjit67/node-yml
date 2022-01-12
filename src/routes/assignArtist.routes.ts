import { Router } from "express";
import { AssignArtistController } from "../controllers";
class AssignArtistRoutes {
  public router = Router();
  public path = "/assignArtist";
  private assignArtist = new AssignArtistController();
  constructor() {
    this.routes();
  }
  private routes() {
    this.router.post("/assign-artist", this.assignArtist.assignArtist);
  }
}
export default AssignArtistRoutes;
