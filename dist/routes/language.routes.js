"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../controllers");
var LanguageRoute = (function () {
    function LanguageRoute() {
        this.router = (0, express_1.Router)();
        this.path = "/language";
        this.languageController = new controllers_1.LanguageController();
        this.routes();
    }
    LanguageRoute.prototype.routes = function () {
        this.router.post("/create", this.languageController.create);
        this.router.get("/all-language", this.languageController.getAll);
        this.router.put("/update", this.languageController.update);
        this.router.delete("/delete", this.languageController.delete);
        this.router.get("/all-language/:id", this.languageController.getOne);
    };
    return LanguageRoute;
}());
exports.default = LanguageRoute;
//# sourceMappingURL=language.routes.js.map