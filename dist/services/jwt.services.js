"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = require("../config");
var JwtService = (function () {
    function JwtService() {
        this.emailTokenString = config_1.emailTokenString;
        this.accessTokenSecretString = config_1.accessTokenString;
    }
    JwtService.prototype.emailTokenGenerator = function (userId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var payload = {
                name: "Your trust.",
                iss: "sky-rise.com",
            };
            var secretKey = _this.emailTokenString;
            jsonwebtoken_1.default.sign(payload, secretKey, {
                audience: [userId],
            }, function (err, token) {
                if (err)
                    return reject(err);
                return resolve(token);
            });
        });
    };
    JwtService.prototype.emailTokenVerify = function (token) {
        var secretKey = this.emailTokenString;
        return jsonwebtoken_1.default.verify(token, secretKey, function (err, payload) {
            if (err)
                return err;
            return payload;
        });
    };
    JwtService.prototype.accessTokenGenerator = function (userId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var payload = {
                name: "Your trust.",
                iss: "sky-rise.com",
            };
            var secretKey = _this.accessTokenSecretString;
            jsonwebtoken_1.default.sign(payload, secretKey, {
                audience: [userId],
            }, function (err, token) {
                if (err)
                    return reject(err);
                return resolve(token);
            });
        });
    };
    JwtService.prototype.accessTokenVerify = function (token) {
        var secretKey = this.accessTokenSecretString;
        return jsonwebtoken_1.default.verify(token, secretKey, function (err, payload) {
            if (err)
                return err;
            return payload;
        });
    };
    return JwtService;
}());
exports.default = JwtService;
//# sourceMappingURL=jwt.services.js.map