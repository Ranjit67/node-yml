"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../controllers");
var FavoriteRoute = (function () {
    function FavoriteRoute() {
        this.router = (0, express_1.Router)();
        this.path = "/favorite";
        this.favoriteController = new controllers_1.FavoriteController();
        this.routes();
    }
    FavoriteRoute.prototype.routes = function () {
        this.router.post("/add", this.favoriteController.addFavorite);
        this.router.post("/remove", this.favoriteController.favoriteRemove);
        this.router.get("/all-favorite-artist/:artistId", this.favoriteController.viewUserList);
        this.router.get("/all-favorite-user/:userId", this.favoriteController.viewArtistList);
    };
    return FavoriteRoute;
}());
exports.default = FavoriteRoute;
//# sourceMappingURL=favorite.routes.js.map