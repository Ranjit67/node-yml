"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var walletHistorySchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        unique: true,
    },
    transactionHistory: [
        {
            type: {
                type: String,
                enum: ["Debit", "Credit"],
            },
            amount: {
                type: Number,
            },
            title: {
                type: String,
            },
            description: {
                type: String,
            },
            timestamp: {
                type: Date,
                default: new Date(),
            },
        },
    ],
});
var WalletHistorySchema = (0, mongoose_1.model)("WalletHistory", walletHistorySchema);
exports.default = WalletHistorySchema;
//# sourceMappingURL=walletHistory.models.js.map