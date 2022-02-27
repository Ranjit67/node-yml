"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var assignArtistSchema = new mongoose_1.Schema({
    manager: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    artists: [
        {
            artist: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "User",
            },
            timestamp: {
                type: Date,
                default: new Date().toString(),
            },
        },
    ],
});
var AssignArtistSchema = (0, mongoose_1.model)("AssignArtist", assignArtistSchema);
exports.default = AssignArtistSchema;
//# sourceMappingURL=assignArtist.models.js.map