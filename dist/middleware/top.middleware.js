"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TopMiddleware = (function () {
    function TopMiddleware() {
    }
    TopMiddleware.prototype.allowCrossDomain = function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization");
        if (req.method === "OPTIONS") {
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
            return res.status(200).json({});
        }
        next();
    };
    return TopMiddleware;
}());
exports.default = TopMiddleware;
//# sourceMappingURL=top.middleware.js.map