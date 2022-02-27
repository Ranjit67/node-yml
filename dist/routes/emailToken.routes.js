"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../controllers");
var EmailTokenRoutes = (function () {
    function EmailTokenRoutes() {
        this.path = "/email-token";
        this.emailTokenController = new controllers_1.EmailTokenController();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    EmailTokenRoutes.prototype.routes = function () {
        this.router.get("/list-of-email-token", this.emailTokenController.getAll);
    };
    return EmailTokenRoutes;
}());
exports.default = EmailTokenRoutes;
//# sourceMappingURL=emailToken.routes.js.map