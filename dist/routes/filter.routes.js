"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../controllers");
var FilterRoutes = (function () {
    function FilterRoutes() {
        this.path = "/filter";
        this.filterController = new controllers_1.FilterController();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    FilterRoutes.prototype.routes = function () {
        this.router.post("/", this.filterController.getFilterData);
        this.router.post("/:skip/:limit", this.filterController.getFilterData);
    };
    return FilterRoutes;
}());
exports.default = FilterRoutes;
//# sourceMappingURL=filter.routes.js.map