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
    this.router.get("/all-booking", this.bookingController.getAllBooking);
    this.router.get(
      "/all-booking/artist/:artistId",
      this.bookingController.getAllBookingArtist
    );
    this.router.get(
      "/all-booking/user/:userId",
      this.bookingController.getAllBookingUser
    );
    this.router.post("/booking-payment", this.bookingController.bookingPayment);
    this.router.post(
      "/booking-past-confirmation",
      this.bookingController.bookingPastConfirmation
    );

    this.router.post("/booking-cancel", this.bookingController.bookingCancel);
    this.router.get(
      "/booking-details/:bookingId",
      this.bookingController.bookingDetails
    );
    this.router.put("/delete", this.bookingController.removeBooking);
    this.router.put(
      "/booking-confirm",
      this.bookingController.bookingPaymentConfirm
    );

    this.router.put("/booking-fail", this.bookingController.bookingFail);
    this.router.post("/booking-test", this.bookingController.bookingTest);
  }
}
export default BookingRouter;
