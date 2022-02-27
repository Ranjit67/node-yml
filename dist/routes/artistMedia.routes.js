"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../controllers");
var ArtistMediaRoute = (function () {
    function ArtistMediaRoute() {
        this.router = (0, express_1.Router)();
        this.path = "/artist-media";
        this.artistMediaController = new controllers_1.ArtistMediaController();
        this.routes();
    }
    ArtistMediaRoute.prototype.routes = function () {
        this.router.post("/create-video", this.artistMediaController.videoCreate);
        this.router.post("/create-photo", this.artistMediaController.photoCreate);
        this.router.get("/videos/:artistId", this.artistMediaController.getArtistVideo);
        this.router.get("/photos/:artistId", this.artistMediaController.getArtistPhoto);
        this.router.post("/delete-video", this.artistMediaController.videoDelete);
        this.router.post("/delete-photo", this.artistMediaController.photoDelete);
    };
    return ArtistMediaRoute;
}());
exports.default = ArtistMediaRoute;
//# sourceMappingURL=artistMedia.routes.js.map