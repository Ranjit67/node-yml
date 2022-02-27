"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var walletSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        unique: true,
    },
    balance: {
        type: Number,
        default: 0,
    },
    spent: {
        type: Number,
        default: 0,
    },
});
var WalletSchema = (0, mongoose_1.model)("Wallet", walletSchema);
exports.default = WalletSchema;
//# sourceMappingURL=wallet.models.js.map