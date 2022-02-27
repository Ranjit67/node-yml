"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var visitorSchema = new mongoose_1.Schema({
    users: [
        {
            user: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "User",
            },
            spentTime: {
                type: Number,
                default: 1,
            },
            lastTimeVisit: {
                type: Date,
                default: new Date().toString(),
            },
            count: {
                type: Number,
                default: 1,
            },
        },
    ],
    artist: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
});
var VisitorSchema = (0, mongoose_1.model)("Visitor", visitorSchema);
exports.default = VisitorSchema;
//# sourceMappingURL=visitor.models.js.map