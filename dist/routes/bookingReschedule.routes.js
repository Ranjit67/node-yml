"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../controllers");
var BookingRescheduledRoutes = (function () {
    function BookingRescheduledRoutes() {
        this.router = (0, express_1.Router)();
        this.path = "/booking-reschedule";
        this.bookingRescheduleController = new controllers_1.BookingRescheduleController();
        this.routes();
    }
    BookingRescheduledRoutes.prototype.routes = function () {
        this.router.post("/create", this.bookingRescheduleController.create);
        this.router.put("/permission", this.bookingRescheduleController.ReschedulePermission);
    };
    return BookingRescheduledRoutes;
}());
exports.default = BookingRescheduledRoutes;
//# sourceMappingURL=bookingReschedule.routes.js.map