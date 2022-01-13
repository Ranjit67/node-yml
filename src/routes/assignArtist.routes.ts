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
    this.router.put("/remove-artist", this.assignArtist.removeArtist);
    this.router.get(
      "/assign-artist/:managerId",
      this.assignArtist.managerUnderArtist
    );
    this.router.get("/", this.assignArtist.getManagerByArtist);
  }
}
export default AssignArtistRoutes;
