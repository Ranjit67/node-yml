"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var artistBlockDateSchema = new mongoose_1.Schema({
    artist: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        unique: true,
    },
    blockedDates: [
        {
            date: Number,
            dateDayFormat: String,
            timestamp: Date,
        },
    ],
});
var ArtistBlockDateSchema = (0, mongoose_1.model)("ArtistBlockDate", artistBlockDateSchema);
exports.default = ArtistBlockDateSchema;
//# sourceMappingURL=artistBlockDate.models.js.map