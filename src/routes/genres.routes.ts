import { Router } from "express";
import { GenresController } from "../controllers";

class GenresRoutes {
  public router = Router();
  public path = "/genres";
  private genresController = new GenresController();

  constructor() {
    this.routes();
  }
  private routes() {
    this.router.post("/create", this.genresController.create);
    this.router.post(
      "/sub-category-genres",
      this.genresController.genresUnderSubCategory
    );
    this.router.put("/update", this.genresController.update);
    // this.router.delete("/delete", this.genresController.delete);
  }
}
export default GenresRoutes;
