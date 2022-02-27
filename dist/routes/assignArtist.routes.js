"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../controllers");
var AssignArtistRoutes = (function () {
    function AssignArtistRoutes() {
        this.router = (0, express_1.Router)();
        this.path = "/assign-artist";
        this.assignArtist = new controllers_1.AssignArtistController();
        this.routes();
    }
    AssignArtistRoutes.prototype.routes = function () {
        this.router.post("/create", this.assignArtist.assignArtist);
        this.router.put("/remove-artist", this.assignArtist.removeArtist);
        this.router.get("/managed-artists/:managerId", this.assignArtist.managerUnderArtist);
        this.router.get("/assigned-managers/:artistId", this.assignArtist.getManagerByArtist);
    };
    return AssignArtistRoutes;
}());
exports.default = AssignArtistRoutes;
//# sourceMappingURL=assignArtist.routes.js.map