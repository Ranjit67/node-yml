import { Router } from "express";
import { BookingController } from "../controllers";

class BookingRouter {
  public router = Router();
  public path = "/booking";
  private bookingController = new BookingController();
  constructor() {
    this.routes();
  }
  private routes() {
    this.router.post("/create", this.bookingController.create);
    // this.router.get("/all",this.getAll);
    // this.router.get("/:requestId",this.getRequest);
    // this.router.put("/update",this.update);
    // this.router.delete("/delete",this.delete);
  }
}
export default BookingRouter;
