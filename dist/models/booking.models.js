"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var bookingSchema = new mongoose_1.Schema({
    eventDate: {
        start: Date,
        end: Date,
    },
    eventLocation: {
        type: String,
    },
    location: {
        lat: {
            type: Number,
            default: 0,
        },
        lng: {
            type: Number,
            default: 0,
        },
        country: {
            type: String,
        },
    },
    crowdSize: {
        type: Number,
    },
    serviceType: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Service",
    },
    bookingType: {
        enum: ["personalizedMessage", "other"],
        type: String,
    },
    bookingReschedule: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "BookingReschedule",
    },
    bookingPrice: {
        type: Number,
    },
    status: {
        enum: ["pending", "confirm", "cancel", "past"],
        type: String,
    },
    artist: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    artistCopy: {
        type: Object,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    userCopy: {
        type: Object,
    },
    personalizedVideo: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "PersonalizeVideo",
    },
    personalizedMessage: {
        type: String,
    },
    eventDuration: {
        type: Number,
    },
    isComplete: {
        type: Boolean,
        default: false,
    },
    OtherDetails: {
        type: String,
    },
    eventType: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Event",
    },
    eventTime: {
        type: Date,
    },
    timestamp: {
        type: Date,
        default: new Date(),
    },
    personalizedMsgDate: {
        type: Date,
    },
    isPayment: {
        type: Boolean,
        default: false,
    },
    isDeletesId: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    cancelBy: {
        enum: ["artist", "user"],
        type: String,
    },
    cancelDate: {
        type: Date,
    },
    reason: {
        type: String,
    },
    payment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Payment",
    },
});
var BookingSchema = (0, mongoose_1.model)("Booking", bookingSchema);
exports.default = BookingSchema;
//# sourceMappingURL=booking.models.js.map