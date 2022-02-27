"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../controllers");
var CrowdRoutes = (function () {
    function CrowdRoutes() {
        this.router = (0, express_1.Router)();
        this.path = "/crowd";
        this.crowdController = new controllers_1.CrowdController();
        this.routes();
    }
    CrowdRoutes.prototype.routes = function () {
        this.router.post("/create", this.crowdController.create);
        this.router.get("/all-crowd", this.crowdController.getAllCrowd);
        this.router.put("/update", this.crowdController.update);
        this.router.delete("/delete", this.crowdController.delete);
    };
    return CrowdRoutes;
}());
exports.default = CrowdRoutes;
//# sourceMappingURL=crowd.routes.js.map