"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var crowdSchema = new mongoose_1.Schema({
    max: {
        type: Number,
        required: true,
        unique: true,
    },
    min: {
        type: Number,
        required: true,
        unique: true,
    },
    timestamp: {
        type: Date,
    },
});
var CrowdSchema = (0, mongoose_1.model)("Crowd", crowdSchema);
exports.default = CrowdSchema;
//# sourceMappingURL=crowd.models.js.map