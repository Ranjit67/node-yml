"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var orderSchema = new mongoose_1.Schema({
    booking: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Booking",
    },
    status: {
        enum: ["pending", "confirm", "cancel", "failed"],
        type: String,
        default: "pending",
    },
});
var OrderSchema = (0, mongoose_1.model)("Order", orderSchema);
exports.default = OrderSchema;
//# sourceMappingURL=order.models.js.map