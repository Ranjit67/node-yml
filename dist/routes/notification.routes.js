"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../controllers");
var NotificationRoute = (function () {
    function NotificationRoute() {
        this.router = (0, express_1.Router)();
        this.path = "/notification";
        this.notificationController = new controllers_1.NotificationController();
        this.routes();
    }
    NotificationRoute.prototype.routes = function () {
        this.router.post("/create", this.notificationController.create);
        this.router.get("/all-notification/:userId", this.notificationController.getSelectedUserNotification);
        this.router.put("/make-read", this.notificationController.makeRead);
        this.router.put("/delete", this.notificationController.delete);
    };
    return NotificationRoute;
}());
exports.default = NotificationRoute;
//# sourceMappingURL=notification.routes.js.map