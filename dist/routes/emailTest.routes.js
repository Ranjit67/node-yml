"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../controllers");
var EmailTestRoute = (function () {
    function EmailTestRoute() {
        this.path = "/email";
        this.emailTokenController = new controllers_1.EmailController();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    EmailTestRoute.prototype.routes = function () {
        this.router.post("/email", this.emailTokenController.sendEmail);
    };
    return EmailTestRoute;
}());
exports.default = EmailTestRoute;
//# sourceMappingURL=emailTest.routes.js.map