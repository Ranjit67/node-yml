"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var genresSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    iconUrl: {
        type: String,
    },
    iconFile: {
        type: String,
    },
    parentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "SubCategory",
    },
    timestamp: {
        type: Date,
        default: new Date(),
    },
});
var GenresSchema = (0, mongoose_1.model)("Genres", genresSchema);
exports.default = GenresSchema;
//# sourceMappingURL=genres.models.js.map