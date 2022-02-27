"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var categorySchema = new mongoose_1.Schema({
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
    subcategories: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "SubCategory",
        },
    ],
    genres: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Genre",
        },
    ],
    imageUrl: {
        type: String,
    },
    imageFile: {
        type: String,
    },
    timestamp: {
        type: Date,
        default: new Date().toString(),
    },
});
var CategorySchema = (0, mongoose_1.model)("Category", categorySchema);
exports.default = CategorySchema;
//# sourceMappingURL=category.models.js.map