"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../controllers");
var PersonalizeVideoRoute = (function () {
    function PersonalizeVideoRoute() {
        this.router = (0, express_1.Router)();
        this.path = "/personalize-video";
        this.personalizeVideoController = new controllers_1.PersonalizeVideoController();
        this.routes();
    }
    PersonalizeVideoRoute.prototype.routes = function () {
        this.router.post("/create", this.personalizeVideoController.create);
        this.router.get("/all-personalize-video/user/:userId", this.personalizeVideoController.getPersonalizedVideoUser);
        this.router.get("/all-personalize-video/artist/:artistId", this.personalizeVideoController.getPersonalizedVideoArtist);
        this.router.put("/delete", this.personalizeVideoController.deletePersonalizedVideo);
    };
    return PersonalizeVideoRoute;
}());
exports.default = PersonalizeVideoRoute;
//# sourceMappingURL=personalizeVideo.routes.js.map