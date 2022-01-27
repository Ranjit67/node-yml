import { Router } from "express";
import { AssignArtistController } from "../controllers";
class AssignArtistRoutes {
  public router = Router();
  public path = "/assign-artist";
  private assignArtist = new AssignArtistController();
  constructor() {
    this.routes();
  }
  private routes() {
    this.router.post("/create", this.assignArtist.assignArtist);
    this.router.put("/remove-artist", this.assignArtist.removeArtist);
    this.router.get(
      "/all-assign-artist/manager/:managerId",
      this.assignArtist.managerUnderArtist
    );
    this.router.get(
      "/all-assign-artist/artist/:artistId",
      this.assignArtist.getManagerByArtist
    );
  }
}
export default AssignArtistRoutes;
