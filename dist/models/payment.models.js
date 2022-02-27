"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var paymentSchema = new mongoose_1.Schema({
    booking: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Booking",
        required: true,
    },
    artist: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    walletAmount: {
        type: Number,
        default: 0,
    },
    bankRefundAmount: {
        type: Number,
    },
    walletRefund: {
        type: Boolean,
    },
    bankRefund: {
        type: Boolean,
    },
    bankAmount: {
        type: Number,
        default: 0,
    },
    cancelDate: {
        type: Date,
    },
    refundDate: {
        type: Date,
    },
    paymentData: {
        type: Object,
    },
    promoCode: {
        type: Object,
    },
    promoCodeDisCountAmount: {
        type: Number,
        default: 0,
    },
    timestamp: {
        type: Date,
    },
});
var PaymentSchema = (0, mongoose_1.model)("Payment", paymentSchema);
exports.default = PaymentSchema;
//# sourceMappingURL=payment.models.js.map