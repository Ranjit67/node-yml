"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../controllers");
var ArtistBlockDateRoutes = (function () {
    function ArtistBlockDateRoutes() {
        this.router = (0, express_1.Router)();
        this.path = "/artist-block-date";
        this.artistBlockDate = new controllers_1.ArtistBlockDateController();
        this.routes();
    }
    ArtistBlockDateRoutes.prototype.routes = function () {
        this.router.post("/create", this.artistBlockDate.create);
        this.router.get("/all-block-date/:artistId", this.artistBlockDate.getBlockDateByArtist);
        this.router.put("/delete", this.artistBlockDate.deleteBlockDateByArtist);
    };
    return ArtistBlockDateRoutes;
}());
exports.default = ArtistBlockDateRoutes;
//# sourceMappingURL=artistBlockDate.routes.js.map