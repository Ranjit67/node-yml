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
    this.router.get(
      "/list-of-bookings-artist/:artistId",
      this.bookingController.getAllBookingArtist
    );
    this.router.get(
      "/list-of-bookings-user/:userId",
      this.bookingController.getAllBookingUser
    );
    this.router.post("/booking-payment", this.bookingController.bookingPayment);
    this.router.post(
      "/booking-past-confirmation",
      this.bookingController.bookingPastConfirmation
    );
    this.router.post(
      "/booking-cancel-wallet",
      this.bookingController.bookingCancelWallet
    );
  }
}
export default BookingRouter;
