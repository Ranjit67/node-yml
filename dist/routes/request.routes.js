"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../controllers");
var RequestRouter = (function () {
    function RequestRouter() {
        this.router = (0, express_1.Router)();
        this.path = "/request";
        this.requestController = new controllers_1.RequestController();
        this.routes();
    }
    RequestRouter.prototype.routes = function () {
        this.router.post("/create", this.requestController.create);
        this.router.get("/all-request-receiver/:receiverUserId", this.requestController.getRequestReceiver);
        this.router.get("/all-request-sender/:senderUserId", this.requestController.getRequestSender);
        this.router.post("/accept-price-set", this.requestController.acceptPriceSet);
        this.router.post("/payment-booking-accept-reject-artist", this.requestController.paymentBookingAcceptRejectArtist);
        this.router.post("/manager-remove", this.requestController.createMangerRemoveRequest);
        this.router.put("/accept-reject", this.requestController.acceptRejectRequest);
        this.router.put("/reject-and-accept", this.requestController.requestTracker);
        this.router.post("/delete", this.requestController.delete);
    };
    return RequestRouter;
}());
exports.default = RequestRouter;
//# sourceMappingURL=request.routes.js.map