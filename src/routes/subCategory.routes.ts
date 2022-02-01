import { Router } from "express";
import { SubCategoryController } from "../controllers";

class SubCategoryRouter {
  public router = Router();
  public path = "/sub-category";
  private userController = new SubCategoryController();

  constructor() {
    this.routes();
  }
  private routes() {
    this.router.post("/create", this.userController.create);

    this.router.get(
      "/category-sub-category/:categoryId",
      this.userController.categoryUnderSubCategory
    );
    this.router.put("/update", this.userController.update);

    this.router.delete("/delete", this.userController.delete);
  }
}
export default SubCategoryRouter;
