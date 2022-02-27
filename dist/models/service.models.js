"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var serviceSchema = new mongoose_1.Schema({
    serviceName: {
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
    imageUrl: {
        type: String,
    },
    imageFile: {
        type: String,
    },
    timestamp: {
        type: Date,
        default: new Date(),
    },
});
var ServiceSchema = (0, mongoose_1.model)("Service", serviceSchema);
exports.default = ServiceSchema;
//# sourceMappingURL=service.models.js.map