"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var personalizeSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    artist: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    userCopy: {
        type: Object,
    },
    artistCopy: {
        type: Object,
    },
    booking: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Booking",
    },
    videoUrl: {
        type: String,
    },
    videoFile: {
        type: String,
    },
    isDeletesId: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    timestamp: {
        type: Date,
    },
});
var PersonalizeVideoSchema = (0, mongoose_1.model)("PersonalizeVideo", personalizeSchema);
exports.default = PersonalizeVideoSchema;
//# sourceMappingURL=personalizeVideo.models.js.map