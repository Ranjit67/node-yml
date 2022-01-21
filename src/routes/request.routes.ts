import { Router } from "express";
import { RequestController } from "../controllers";

class RequestRouter {
  public router = Router();
  public path = "/request";
  private requestController = new RequestController();
  constructor() {
    this.routes();
  }
  private routes() {
    this.router.post("/create", this.requestController.requestList);
    // this.router.get("/all",this.getAll);
    // this.router.get("/:requestId",this.getRequest);
    // this.router.put("/update",this.update);
    // this.router.delete("/delete",this.delete);
  }
}
export default RequestRouter;
