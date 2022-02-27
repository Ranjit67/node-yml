"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../controllers");
var PromoCodeRoutes = (function () {
    function PromoCodeRoutes() {
        this.router = (0, express_1.Router)();
        this.path = "/promo-code";
        this.promoCodeController = new controllers_1.PromoCodeController();
        this.routes();
    }
    PromoCodeRoutes.prototype.routes = function () {
        this.router.post("/create", this.promoCodeController.create);
        this.router.get("/all-promo-code", this.promoCodeController.getAll);
        this.router.get("/all-promo-code/:secretString", this.promoCodeController.getThroughSecretString);
        this.router.put("/update", this.promoCodeController.update);
        this.router.delete("/delete", this.promoCodeController.delete);
        this.router.put("/apply", this.promoCodeController.promoCodeApply);
    };
    return PromoCodeRoutes;
}());
exports.default = PromoCodeRoutes;
//# sourceMappingURL=promoCode.routes.js.map