"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../controllers");
var VisitorRoute = (function () {
    function VisitorRoute() {
        this.router = (0, express_1.Router)();
        this.path = "/visitor";
        this.visitorController = new controllers_1.VisitorController();
        this.routes();
    }
    VisitorRoute.prototype.routes = function () {
        this.router.post("/create", this.visitorController.create);
        this.router.get("/all-visitor-artist/:artistId", this.visitorController.getVisitorsList);
    };
    return VisitorRoute;
}());
exports.default = VisitorRoute;
//# sourceMappingURL=visitor.routes.js.map