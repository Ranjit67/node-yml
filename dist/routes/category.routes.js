"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../controllers");
var CategoryRoutes = (function () {
    function CategoryRoutes() {
        this.router = (0, express_1.Router)();
        this.path = "/category";
        this.categoryController = new controllers_1.CategoryController();
        this.routes();
    }
    CategoryRoutes.prototype.routes = function () {
        this.router.post("/create", this.categoryController.create);
        this.router.get("/all-category", this.categoryController.getAllCategory);
        this.router.get("/all-category/:categoryId", this.categoryController.getOne);
        this.router.put("/update", this.categoryController.update);
        this.router.delete("/delete", this.categoryController.delete);
    };
    return CategoryRoutes;
}());
exports.default = CategoryRoutes;
//# sourceMappingURL=category.routes.js.map