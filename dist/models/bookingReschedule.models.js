"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
("../types");
var bookingRescheduleSchema = new mongoose_1.Schema({
    artist: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    rescheduleBy: {
        enum: ["artist", "user"],
        type: String,
    },
    booking: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Booking",
    },
    rescheduleDate: {
        start: {
            type: Date,
        },
        end: {
            type: Date,
        },
    },
    personalizedMsgDate: {
        type: Date,
    },
    timestamp: {
        type: Date,
    },
});
var BookingRescheduleSchema = (0, mongoose_1.model)("BookingReschedule", bookingRescheduleSchema);
exports.default = BookingRescheduleSchema;
//# sourceMappingURL=bookingReschedule.models.js.map