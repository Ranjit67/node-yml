"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var supportSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    email: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    countryCode: {
        type: String,
    },
    message: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: new Date(),
    },
});
var SupportSchema = (0, mongoose_1.model)("Support", supportSchema);
exports.default = SupportSchema;
//# sourceMappingURL=support.models.js.map