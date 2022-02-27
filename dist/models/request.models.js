"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var requestSchema = new mongoose_1.Schema({
    reschedule: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "BookingReschedule",
    },
    requestType: {
        type: String,
        enum: [
            "manager",
            "pricing",
            "rescheduledCustomer",
            "rescheduledArtist",
            "personalize",
            "payment",
            "managerRemove",
        ],
    },
    senderUser: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiverUser: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    booking: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Booking",
    },
    details: {
        type: Object,
    },
    status: {
        type: String,
        enum: ["pending", "accept", "reject"],
        default: "pending",
    },
    isCancel: {
        type: Boolean,
        default: false,
    },
    reason: {
        type: String,
    },
    deletedUsers: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    timestamp: {
        type: Date,
    },
});
var RequestSchema = (0, mongoose_1.model)("Request", requestSchema);
exports.default = RequestSchema;
//# sourceMappingURL=request.models.js.map