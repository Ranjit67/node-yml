"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../controllers");
var WalletRoute = (function () {
    function WalletRoute() {
        this.router = (0, express_1.Router)();
        this.path = "/wallet";
        this.walletController = new controllers_1.WalletController();
        this.routes();
    }
    WalletRoute.prototype.routes = function () {
        this.router.post("/create", this.walletController.create);
        this.router.get("/get-wallet-balance/:userId", this.walletController.getWallet);
        this.router.put("/update", this.walletController.walletUpdate);
    };
    return WalletRoute;
}());
exports.default = WalletRoute;
//# sourceMappingURL=wallet.routes.js.map