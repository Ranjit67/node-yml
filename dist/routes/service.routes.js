"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../controllers");
var ServiceRoute = (function () {
    function ServiceRoute() {
        this.router = (0, express_1.Router)();
        this.path = "/service";
        this.serviceController = new controllers_1.ServiceController();
        this.routes();
    }
    ServiceRoute.prototype.routes = function () {
        this.router.post("/create", this.serviceController.create);
        this.router.get("/all-services", this.serviceController.getAll);
        this.router.get("/all-services/:id", this.serviceController.getOne);
        this.router.put("/update", this.serviceController.update);
        this.router.delete("/delete", this.serviceController.delete);
    };
    return ServiceRoute;
}());
exports.default = ServiceRoute;
//# sourceMappingURL=service.routes.js.map