"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var eventDurationSchema = new mongoose_1.Schema({
    timestamp: Date,
    eventDuration: Number,
});
var EventDurationSchema = (0, mongoose_1.model)("EventDuration", eventDurationSchema);
exports.default = EventDurationSchema;
//# sourceMappingURL=eventDuration.models.js.map