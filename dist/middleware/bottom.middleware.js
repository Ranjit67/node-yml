"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_errors_1 = require("http-errors");
var errorHandler_1 = require("../errorHandler");
var BottomMiddleware = (function () {
    function BottomMiddleware() {
    }
    BottomMiddleware.prototype.routeNotFoundErrorHandler = function (req, res, next) {
        next(new http_errors_1.NotFound("No route found, Please check your url2."));
    };
    BottomMiddleware.prototype.fromRouteErrorHandler = function (err, req, res, next) {
        var _a, _b, _c, _d, _e;
        res.status(err.status || 500);
        if (((_a = err === null || err === void 0 ? void 0 : err.keyPattern) === null || _a === void 0 ? void 0 : _a["manager"]) === 1)
            return new errorHandler_1.AssignArtistErrorHandler().allAlreadyAssign(res);
        if (((_b = err === null || err === void 0 ? void 0 : err.keyPattern) === null || _b === void 0 ? void 0 : _b["serviceName"]) === 1)
            return new errorHandler_1.ServiceErrorHandler().allAlreadyExists(res);
        if (((_c = err === null || err === void 0 ? void 0 : err.keyPattern) === null || _c === void 0 ? void 0 : _c["eventName"]) === 1)
            return new errorHandler_1.EventErrorHandler().alreadyExistsName(res);
        if (((_d = err === null || err === void 0 ? void 0 : err.keyPattern) === null || _d === void 0 ? void 0 : _d["email"]) === 1)
            return new errorHandler_1.UserErrorHandler().emailAlreadyExists(res);
        if (((_e = err === null || err === void 0 ? void 0 : err.keyPattern) === null || _e === void 0 ? void 0 : _e["phoneNumber"]) === 1)
            return new errorHandler_1.UserErrorHandler().phoneAlreadyExists(res);
        if ((err === null || err === void 0 ? void 0 : err.path) === "artist" || (err === null || err === void 0 ? void 0 : err.path) === "user")
            return new errorHandler_1.FavoriteErrorHandler().objectId(res);
        res.json({
            error: {
                message: err.message,
            },
        });
    };
    return BottomMiddleware;
}());
exports.default = BottomMiddleware;
//# sourceMappingURL=bottom.middleware.js.map