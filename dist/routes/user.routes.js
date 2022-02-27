"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../controllers");
var middleware_1 = require("../middleware");
var UserRoutes = (function () {
    function UserRoutes() {
        this.path = "/user";
        this.userController = new controllers_1.UserController();
        this.router = (0, express_1.Router)();
        this.routes();
    }
    UserRoutes.prototype.routes = function () {
        this.router.get("/accounts", this.userController.getAll);
        this.router.get("/accounts-active/artist/:limit/:skip", this.userController.activeArtist);
        this.router.get("/accounts-active/artist", this.userController.activeArtist);
        this.router.get("/accounts-self", new middleware_1.ProtectedMiddleware().protected, this.userController.getSelf);
        this.router.get("/accounts/:id", this.userController.getOne);
        this.router.put("/account-update/:id", this.userController.update);
        this.router.post("/account-status", this.userController.blockUnblockUser);
        this.router.patch("/account-update-category", this.userController.categoryUpdate);
        this.router.get("/top-search/artists/:limit/:country", this.userController.topSearchArtist);
        this.router.get("/top-search/artists/:limit", this.userController.topSearchArtist2);
        this.router.delete("/accounts-delete/:id", this.userController.delete);
        this.router.get("/accounts-fake", this.userController.fakeDataUpdate);
    };
    return UserRoutes;
}());
exports.default = UserRoutes;
//# sourceMappingURL=user.routes.js.map