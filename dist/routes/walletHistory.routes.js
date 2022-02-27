"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../controllers");
var WalletHistoryRoute = (function () {
    function WalletHistoryRoute() {
        this.router = (0, express_1.Router)();
        this.path = "/wallet-history";
        this.walletHistory = new controllers_1.WalletHistory();
        this.routes();
    }
    WalletHistoryRoute.prototype.routes = function () {
        this.router.get("/all-wallet-history/:userId", this.walletHistory.getWalletHistory);
        this.router.post("/transaction-details", this.walletHistory.transactionDetails);
    };
    return WalletHistoryRoute;
}());
exports.default = WalletHistoryRoute;
//# sourceMappingURL=walletHistory.routes.js.map