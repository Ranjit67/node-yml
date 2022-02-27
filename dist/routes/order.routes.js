"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../controllers");
var OrderRoutes = (function () {
    function OrderRoutes() {
        this.router = (0, express_1.Router)();
        this.path = "/order";
        this.languageController = new controllers_1.OrderController();
        this.routes();
    }
    OrderRoutes.prototype.routes = function () {
        this.router.post("/create", this.languageController.create);
        this.router.put("/update", this.languageController.update);
        this.router.get("/booking/:bookingId", this.languageController.getByBookingId);
    };
    return OrderRoutes;
}());
exports.default = OrderRoutes;
//# sourceMappingURL=order.routes.js.map