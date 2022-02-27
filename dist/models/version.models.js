"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var versionSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: new Date(),
    },
    description: {
        type: String,
        required: true,
    },
    version: {
        type: Number,
        required: true,
        default: 1,
    },
    isDismissible: {
        type: Boolean,
    },
});
var VersionSchema = (0, mongoose_1.model)("Version", versionSchema);
exports.default = VersionSchema;
//# sourceMappingURL=version.models.js.map