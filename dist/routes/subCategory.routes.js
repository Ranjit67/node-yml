"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../controllers");
var SubCategoryRouter = (function () {
    function SubCategoryRouter() {
        this.router = (0, express_1.Router)();
        this.path = "/sub-category";
        this.userController = new controllers_1.SubCategoryController();
        this.routes();
    }
    SubCategoryRouter.prototype.routes = function () {
        this.router.post("/create", this.userController.create);
        this.router.get("/category-sub-category/:categoryId", this.userController.categoryUnderSubCategory);
        this.router.put("/update", this.userController.update);
        this.router.delete("/delete", this.userController.delete);
    };
    return SubCategoryRouter;
}());
exports.default = SubCategoryRouter;
//# sourceMappingURL=subCategory.routes.js.map