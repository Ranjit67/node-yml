"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../controllers");
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
var AuthRoutes = (function () {
    function AuthRoutes() {
        this.path = "/auth";
        this.userController = new controllers_1.UserController();
        this.emailTokenController = new controllers_1.EmailTokenController();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    AuthRoutes.prototype.routes = function () {
        this.router.post("/register", this.userController.create);
        this.router.post("/login", this.userController.signIn);
        var limiter = (0, express_rate_limit_1.default)({
            windowMs: 15 * 60 * 1000,
            max: 1,
            standardHeaders: true,
            legacyHeaders: false,
        });
        this.router.put("/set-password/:stringData", this.userController.setPassword);
        this.router.post("/send-reset-link", this.emailTokenController.emailVerify);
    };
    return AuthRoutes;
}());
exports.default = AuthRoutes;
//# sourceMappingURL=auth.routes.js.map