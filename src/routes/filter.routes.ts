import { Router } from "express";
import { FilterController } from "../controllers";
class FilterRoutes {
  public router: Router;

  public path = "/filter";
  private filterController = new FilterController();

  constructor() {
    this.router = Router();
    this.routes();
  }
  private routes() {
    this.router.post("/:skip/:limit", this.filterController.getFilterData);
  }
}
export default FilterRoutes;
