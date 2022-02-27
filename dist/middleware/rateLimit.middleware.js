"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
var RateLimitMiddleware = (function () {
    function RateLimitMiddleware() {
    }
    RateLimitMiddleware.prototype.forgerPassword = function (req, res, next) {
        return (0, express_rate_limit_1.default)({
            windowMs: 4 * 60 * 1000,
            max: 1,
            standardHeaders: true,
            legacyHeaders: false,
        });
    };
    RateLimitMiddleware.prototype.register = function (req, res, next) { };
    RateLimitMiddleware.prototype.login = function (req, res, next) { };
    return RateLimitMiddleware;
}());
exports.default = RateLimitMiddleware;
//# sourceMappingURL=rateLimit.middleware.js.map