"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../controllers");
var BookingRouter = (function () {
    function BookingRouter() {
        this.router = (0, express_1.Router)();
        this.path = "/booking";
        this.bookingController = new controllers_1.BookingController();
        this.routes();
    }
    BookingRouter.prototype.routes = function () {
        this.router.post("/create", this.bookingController.create);
        this.router.get("/all-booking", this.bookingController.getAllBooking);
        this.router.get("/all-booking/artist/:artistId", this.bookingController.getAllBookingArtist);
        this.router.get("/all-booking/user/:userId", this.bookingController.getAllBookingUser);
        this.router.post("/booking-payment", this.bookingController.bookingPayment);
        this.router.post("/booking-past-confirmation", this.bookingController.bookingPastConfirmation);
        this.router.post("/booking-cancel", this.bookingController.bookingCancel);
        this.router.get("/booking-details/:bookingId", this.bookingController.bookingDetails);
        this.router.put("/delete", this.bookingController.removeBooking);
        this.router.put("/booking-confirm", this.bookingController.bookingPaymentConfirm);
        this.router.put("/booking-fail", this.bookingController.bookingFail);
        this.router.post("/booking-test", this.bookingController.bookingTest);
    };
    return BookingRouter;
}());
exports.default = BookingRouter;
//# sourceMappingURL=booking.routes.js.map