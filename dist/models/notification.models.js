"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var notificationSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    notification: [
        {
            iconUrl: {
                type: String,
            },
            receiveFrom: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "User",
            },
            description: {
                type: String,
                required: true,
            },
            title: {
                type: String,
                required: true,
            },
            isRead: {
                type: Boolean,
                default: false,
            },
            timestamp: {
                type: Date,
                default: new Date(),
            },
        },
    ],
});
var NotificationSchema = (0, mongoose_1.model)("Notification", notificationSchema);
exports.default = NotificationSchema;
//# sourceMappingURL=notification.models.js.map