"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var FavoritesSchema = new mongoose_1.Schema({
    artist: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    favorites: [
        {
            timestamp: {
                type: Date,
                default: new Date(),
            },
            user: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "User",
            },
        },
    ],
});
var FavoriteSchema = (0, mongoose_1.model)("Favorite", FavoritesSchema);
exports.default = FavoriteSchema;
//# sourceMappingURL=favorite.models.js.map