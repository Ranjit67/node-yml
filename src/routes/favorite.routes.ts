import { Router } from "express";
import { FavoriteController } from "../controllers";

class FavoriteRoute {
  public router = Router();
  public path = "/favorite";
  private favoriteController = new FavoriteController();
  constructor() {
    this.routes();
  }
  private routes() {
    this.router.post("/create", this.favoriteController.create);
    this.router.get(
      "/all-favorite-artist/:artistId",
      this.favoriteController.viewUserList
    );
    this.router.get(
      "/all-favorite-user/:userId",
      this.favoriteController.viewArtistList
    );
  }
}
export default FavoriteRoute;
