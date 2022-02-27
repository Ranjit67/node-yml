"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var eventSchema = new mongoose_1.Schema({
    eventName: {
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
        default: new Date().toString(),
    },
});
var EventSchema = (0, mongoose_1.model)("Event", eventSchema);
exports.default = EventSchema;
//# sourceMappingURL=event.models.js.map