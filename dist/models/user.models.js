"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    profileImageRef: String,
    artistMedia: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "ArtistMedia",
    },
    events: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Event",
        },
    ],
    services: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Service",
        },
    ],
    subcategories: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "SubCategory",
        },
    ],
    genres: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Genres",
        },
    ],
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
    },
    languages: {
        type: [
            {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Language",
            },
        ],
    },
    countryCode: {
        type: String,
    },
    phoneNumber: {
        unique: true,
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    bio: {
        type: String,
    },
    email: {
        required: true,
        unique: true,
        type: String,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
    },
    status: {
        type: String,
        default: "not-verify",
    },
    gender: {
        type: String,
    },
    location: {
        lat: {
            type: Number,
        },
        lng: {
            type: Number,
        },
        address: {
            type: String,
        },
        country: {
            type: String,
        },
    },
    profileImageUrl: {
        type: String,
    },
    yearsOfExperience: {
        type: String,
    },
    fcmToken: {
        type: String,
    },
    Dob: {
        type: Date,
    },
    inTopSearches: {
        type: Boolean,
        default: false,
    },
    inTopTrending: {
        type: Boolean,
        default: false,
    },
    ratings: {
        type: Number,
        default: 0,
    },
    minPrice: {
        type: Number,
    },
    maxPrice: {
        type: Number,
    },
    pricing: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Pricing",
    },
    timestamp: {
        type: Date,
        default: new Date(),
    },
});
var UserSchema = (0, mongoose_1.model)("User", userSchema);
exports.default = UserSchema;
//# sourceMappingURL=user.models.js.map