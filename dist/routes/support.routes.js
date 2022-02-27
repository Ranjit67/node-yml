"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../controllers");
var SupportRouter = (function () {
    function SupportRouter() {
        this.router = (0, express_1.Router)();
        this.path = "/support";
        this.supportController = new controllers_1.SupportController();
        this.routes();
    }
    SupportRouter.prototype.routes = function () {
        this.router.post("/create", this.supportController.create);
        this.router.get("/all-supports", this.supportController.getAllSupportList);
        this.router.get("/all-supports/:supportId", this.supportController.getOne);
        this.router.delete("/delete", this.supportController.delete);
        this.router.post("/support-email/:userId", this.supportController.supportEmail);
    };
    return SupportRouter;
}());
exports.default = SupportRouter;
//# sourceMappingURL=support.routes.js.map