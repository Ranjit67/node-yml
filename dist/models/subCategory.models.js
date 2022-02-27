"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var subCategorySchema = new mongoose_1.Schema({
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
        ref: "Category",
    },
    genres: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Genre",
        },
    ],
    timestamp: {
        type: Date,
        default: new Date(),
    },
});
var SubCategorySchema = (0, mongoose_1.model)("SubCategory", subCategorySchema);
exports.default = SubCategorySchema;
//# sourceMappingURL=subCategory.models.js.map