"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../controllers");
var VersionRouter = (function () {
    function VersionRouter() {
        this.router = (0, express_1.Router)();
        this.path = "/version";
        this.versionController = new controllers_1.VersionController();
        this.routes();
    }
    VersionRouter.prototype.routes = function () {
        this.router.post("/create", this.versionController.create);
        this.router.get("/app-version", this.versionController.getSingle);
    };
    return VersionRouter;
}());
exports.default = VersionRouter;
//# sourceMappingURL=version.routes.js.map