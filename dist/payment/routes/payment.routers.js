"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controller_1 = require("../controller");
var PaymentRoutes = (function () {
    function PaymentRoutes() {
        this.router = (0, express_1.Router)();
        this.path = "/payment";
        this.paymentController = new controller_1.PaymentController();
        this.routes();
    }
    PaymentRoutes.prototype.routes = function () {
        this.router.post("/refund", this.paymentController.refund);
    };
    return PaymentRoutes;
}());
exports.default = PaymentRoutes;
//# sourceMappingURL=payment.routers.js.map