"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var reviewSchema = new mongoose_1.Schema({
    artist: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    ratings: {
        type: Number,
    },
    timestamp: {
        type: Date,
        default: new Date(),
    },
    artistID: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
});
var ReviewSchema = (0, mongoose_1.model)("Review", reviewSchema);
exports.default = ReviewSchema;
//# sourceMappingURL=review.models.js.map