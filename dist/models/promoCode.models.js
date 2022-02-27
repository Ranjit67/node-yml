"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var promoCodeSchema = new mongoose_1.Schema({
    numberOfTimeUsed: {
        type: String,
    },
    secretString: {
        type: String,
        required: true,
        unique: true,
    },
    percentage: {
        type: String,
        required: true,
    },
    maxCashBack: {
        type: String,
    },
    startingDate: {
        type: Date,
        default: new Date(),
    },
    endingDate: {
        type: Date,
        default: new Date(new Date().getTime() + 86400000 * 2),
    },
    timestamp: {
        type: Date,
        default: new Date(),
    },
    appliedUser: [
        {
            user: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "User",
            },
            numberOfTimeUsed: [
                {
                    date: {
                        type: Date,
                        default: new Date().toString(),
                    },
                    benefitAmount: String,
                },
            ],
        },
    ],
});
var PromoCodeSchema = (0, mongoose_1.model)("PromoCode", promoCodeSchema);
exports.default = PromoCodeSchema;
//# sourceMappingURL=promoCode.models.js.map