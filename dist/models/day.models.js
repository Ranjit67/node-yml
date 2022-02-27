"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var daySchema = new mongoose_1.Schema({
    days: [
        {
            timestamp: Date,
            day: Number,
        },
    ],
});
var DaySchema = (0, mongoose_1.model)("Day", daySchema);
exports.default = DaySchema;
//# sourceMappingURL=day.models.js.map