"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../controllers");
var DayRoutes = (function () {
    function DayRoutes() {
        this.router = (0, express_1.Router)();
        this.path = "/day";
        this.dayController = new controllers_1.DayController();
        this.routes();
    }
    DayRoutes.prototype.routes = function () {
        this.router.post("/create", this.dayController.create);
        this.router.get("/all-day", this.dayController.getAllDay);
        this.router.put("/update", this.dayController.update);
        this.router.put("/delete", this.dayController.delete);
    };
    return DayRoutes;
}());
exports.default = DayRoutes;
//# sourceMappingURL=day.routes.js.map