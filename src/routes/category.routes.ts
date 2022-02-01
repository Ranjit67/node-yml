import { Router } from "express";
import { CategoryController } from "../controllers";

class CategoryRoutes {
  public router = Router();
  public path = "/category";
  private categoryController = new CategoryController();
  constructor() {
    this.routes();
  }
  private routes() {
    this.router.post("/create", this.categoryController.create);
    this.router.get("/all-category", this.categoryController.getAllCategory);
    this.router.get(
      "/all-category/:categoryId",
      this.categoryController.getOne
    );
    this.router.put("/update", this.categoryController.update);
    this.router.delete("/delete", this.categoryController.delete);
  }
}
export default CategoryRoutes;
