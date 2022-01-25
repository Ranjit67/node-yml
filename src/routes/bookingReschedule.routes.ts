import { Router } from "express";
import { BookingRescheduleController } from "../controllers";

class BookingRescheduledRoutes {
  public router = Router();
  public path = "/booking-reschedule";
  private bookingRescheduleController = new BookingRescheduleController();
  constructor() {
    this.routes();
  }
  private routes() {
    this.router.post("/create", this.bookingRescheduleController.create);
    this.router.post(
      "/permission",
      this.bookingRescheduleController.ReschedulePermission
    );
  }
}

export default BookingRescheduledRoutes;
