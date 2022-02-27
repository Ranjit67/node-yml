"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../controllers");
var GenresRoutes = (function () {
    function GenresRoutes() {
        this.router = (0, express_1.Router)();
        this.path = "/genres";
        this.genresController = new controllers_1.GenresController();
        this.routes();
    }
    GenresRoutes.prototype.routes = function () {
        this.router.post("/create", this.genresController.create);
        this.router.post("/genres", this.genresController.getAllGenresUnderSubCategories);
        this.router.post("/sub-category-genres", this.genresController.genresUnderSubCategory);
        this.router.put("/update", this.genresController.update);
        this.router.delete("/delete", this.genresController.delete);
    };
    return GenresRoutes;
}());
exports.default = GenresRoutes;
//# sourceMappingURL=genres.routes.js.map