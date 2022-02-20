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
    this.router.post("/", this.filterController.getFilterData2);
    this.router.post("/:skip/:limit", this.filterController.getFilterData2);
  }
}
export default FilterRoutes;
