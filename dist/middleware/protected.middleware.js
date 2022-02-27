"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_errors_1 = require("http-errors");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = require("../config");
var ProtectedMiddleware = (function () {
    function ProtectedMiddleware() {
    }
    ProtectedMiddleware.prototype.protected = function (req, res, next) {
        if (!req.headers["authorization"])
            return next(new http_errors_1.Unauthorized());
        var token = req.headers["authorization"].split(" ")[1];
        jsonwebtoken_1.default.verify(token, config_1.accessTokenString, function (err, payload) {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return next(new http_errors_1.Unauthorized());
                }
                else {
                    return next(new http_errors_1.Unauthorized("You need to logIn"));
                }
            }
            req.payload = payload;
            next();
        });
    };
    return ProtectedMiddleware;
}());
exports.default = ProtectedMiddleware;
//# sourceMappingURL=protected.middleware.js.map