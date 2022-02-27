"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../controllers");
var PricingRoutes = (function () {
    function PricingRoutes() {
        this.router = (0, express_1.Router)();
        this.path = "/pricing";
        this.pricingController = new controllers_1.PricingController();
        this.routes();
    }
    PricingRoutes.prototype.routes = function () {
        this.router.post("/create", this.pricingController.create);
        this.router.get("/all-pricing/:artistId", this.pricingController.getAll);
        this.router.put("/update", this.pricingController.update);
        this.router.post("/fake", this.pricingController.fake);
        this.router.put("/delete", this.pricingController.delete);
    };
    return PricingRoutes;
}());
exports.default = PricingRoutes;
//# sourceMappingURL=pricing.routes.js.map