"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var artistMediaSchema = new mongoose_1.Schema({
    artist: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        unique: true,
        required: true,
    },
    artistVideos: [
        {
            videoFile: String,
            videoUrl: String,
            timestamp: {
                type: Date,
                default: new Date(),
            },
        },
    ],
    artistPhotos: [
        {
            imageFile: String,
            imageUrl: String,
            timestamp: {
                type: Date,
                default: new Date(),
            },
        },
    ],
    youtubeVideos: [
        {
            youtubeUrl: String,
            timestamp: {
                type: Date,
                default: new Date(),
            },
        },
    ],
});
var ArtistMediaSchema = (0, mongoose_1.model)("ArtistMedia", artistMediaSchema);
exports.default = ArtistMediaSchema;
//# sourceMappingURL=artistMedia.models.js.map