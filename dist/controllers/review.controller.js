"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models");
var http_errors_1 = require("http-errors");
var resultMessage_1 = require("../resultMessage");
var emailContent_1 = require("../emailContent");
var services_1 = require("../services");
var notificationIcon_1 = require("../notificationIcon");
var ReviewController = (function () {
    function ReviewController() {
    }
    ReviewController.prototype.create = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, artistId, userId, title, description, ratings, findArtist, emailContentTitle, emailContentDescription, createReview, findAllByArtist, ratingTotal, ratingAverage, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        _a = req.body, artistId = _a.artistId, userId = _a.userId, title = _a.title, description = _a.description, ratings = _a.ratings;
                        if (!artistId || !userId || !title)
                            throw new http_errors_1.BadRequest(resultMessage_1.reviewMessage.error.allField);
                        return [4, models_1.UserSchema.findOne({ _id: artistId })];
                    case 1:
                        findArtist = _b.sent();
                        if (!findArtist)
                            throw new http_errors_1.NotFound(resultMessage_1.reviewMessage.error.artistNotFound);
                        emailContentTitle = new emailContent_1.ReviewContent().newReview(findArtist).subject;
                        emailContentDescription = new emailContent_1.ReviewContent().newReview(findArtist).text;
                        return [4, new services_1.NotificationServices().notificationGenerate(artistId, userId, emailContentTitle, emailContentDescription, notificationIcon_1.artistReviewIcon, {
                                subject: emailContentTitle,
                                text: emailContentDescription,
                            }, {
                                title: emailContentTitle,
                                body: emailContentDescription,
                                sound: "default",
                            })];
                    case 2:
                        _b.sent();
                        return [4, models_1.ReviewSchema.create({
                                artist: artistId,
                                user: userId,
                                title: title,
                                description: description,
                                ratings: +ratings,
                                timestamp: new Date(),
                                artistID: artistId,
                            })];
                    case 3:
                        createReview = _b.sent();
                        if (!createReview)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.reviewMessage.error.notSave);
                        return [4, models_1.ReviewSchema.find({ artist: artistId })];
                    case 4:
                        findAllByArtist = _b.sent();
                        if (!(findAllByArtist === null || findAllByArtist === void 0 ? void 0 : findAllByArtist.length)) return [3, 6];
                        ratingTotal = findAllByArtist.reduce(function (accumulate, currentValue) {
                            return accumulate + currentValue.ratings;
                        }, 0);
                        if (!(ratingTotal > 0)) return [3, 6];
                        ratingAverage = ratingTotal / findAllByArtist.length;
                        return [4, models_1.UserSchema.findOneAndUpdate({ _id: artistId }, { ratings: ratingAverage })];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6: return [2, res.json({
                            success: {
                                message: resultMessage_1.reviewMessage.success.created,
                            },
                        })];
                    case 7:
                        error_1 = _b.sent();
                        next(error_1);
                        return [3, 8];
                    case 8: return [2];
                }
            });
        });
    };
    ReviewController.prototype.getArtistReview = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var artistId, findReview, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        artistId = req.params.artistId;
                        return [4, models_1.ReviewSchema.find({
                                artist: artistId,
                            }).populate("user")];
                    case 1:
                        findReview = _a.sent();
                        return [2, res.json({
                                success: {
                                    data: findReview,
                                },
                            })];
                    case 2:
                        error_2 = _a.sent();
                        next(error_2);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    ReviewController.prototype.getReviewDetails = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var reviewId, findReview, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        reviewId = req.params.reviewId;
                        return [4, models_1.ReviewSchema.findOne({
                                _id: reviewId,
                            })];
                    case 1:
                        findReview = _a.sent();
                        if (!findReview)
                            throw new http_errors_1.NotFound(resultMessage_1.reviewMessage.error.notFound);
                        return [2, res.json({
                                success: {
                                    data: findReview,
                                },
                            })];
                    case 2:
                        error_3 = _a.sent();
                        next(error_3);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    ReviewController.prototype.getAllReview = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var findReview, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, models_1.ReviewSchema.find({})
                                .populate("user")
                                .populate("artist")];
                    case 1:
                        findReview = _a.sent();
                        res.json({ success: { data: findReview } });
                        return [3, 3];
                    case 2:
                        error_4 = _a.sent();
                        next(error_4);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    ReviewController.prototype.delete = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, artistId, reviewIds, deleteReview, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, artistId = _a.artistId, reviewIds = _a.reviewIds;
                        if (!artistId || !reviewIds.length)
                            throw new http_errors_1.BadRequest(resultMessage_1.reviewMessage.error.allField);
                        return [4, models_1.ReviewSchema.deleteMany({
                                _id: { $in: reviewIds },
                                artist: artistId,
                            })];
                    case 1:
                        deleteReview = _b.sent();
                        if (!deleteReview)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.reviewMessage.error.notDelete);
                        return [2, res.json({
                                success: {
                                    message: resultMessage_1.reviewMessage.success.deleted,
                                },
                            })];
                    case 2:
                        error_5 = _b.sent();
                        next(error_5);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    return ReviewController;
}());
exports.default = ReviewController;
//# sourceMappingURL=review.controller.js.map