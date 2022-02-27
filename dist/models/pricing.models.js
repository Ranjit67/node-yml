"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var pricingSchema = new mongoose_1.Schema({
    artist: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        unique: true,
    },
    prices: [
        {
            numberOfDays: Number,
            otherDay: {
                type: Boolean,
                default: false,
            },
            pricePerHour: Number,
            maxCrowdSize: Number,
            minCrowdSize: Number,
            otherCrowdSize: {
                type: Boolean,
                default: false,
            },
            location: {
                lat: {
                    type: Number,
                    default: 0,
                },
                lng: {
                    type: Number,
                    default: 0,
                },
                address: {
                    type: String,
                },
                country: {
                    type: String,
                },
            },
            timestamp: {
                type: Date,
                default: new Date(),
            },
        },
    ],
});
var PricingSchema = (0, mongoose_1.model)("Pricing", pricingSchema);
exports.default = PricingSchema;
//# sourceMappingURL=pricing.models.js.map