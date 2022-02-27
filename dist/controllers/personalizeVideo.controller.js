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
var http_errors_1 = require("http-errors");
var models_1 = require("../models");
var resultMessage_1 = require("../resultMessage");
var services_1 = require("../services");
var emailContent_1 = require("../emailContent");
var notificationIcon_1 = require("../notificationIcon");
var PersonalizedVideoController = (function () {
    function PersonalizedVideoController() {
        this.dir = "personalizeVideo";
    }
    PersonalizedVideoController.prototype.create = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var bookingId, video, findBooking, awsS3Services, uploadVideo, createPersonalizeVideo, updateBooking, personalizeMessageContent, title, description, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        bookingId = req.body.bookingId;
                        video = req.files.video;
                        if (!bookingId || !video)
                            throw new http_errors_1.BadRequest(resultMessage_1.personalizeVideoMessage.error.allField);
                        return [4, models_1.BookingSchema.findById(bookingId).populate("user")];
                    case 1:
                        findBooking = _a.sent();
                        if (!findBooking)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.personalizeVideoMessage.error.noBookingFound);
                        awsS3Services = new services_1.AwsS3Services();
                        return [4, awsS3Services.upload(video, "personalizeVideo")];
                    case 2:
                        uploadVideo = _a.sent();
                        return [4, models_1.PersonalizeVideoSchema.create({
                                user: findBooking.user._id.toString(),
                                artist: findBooking.artist.toString(),
                                booking: bookingId,
                                videoUrl: uploadVideo.Location,
                                videoFile: uploadVideo.Key,
                                timestamp: new Date(),
                            })];
                    case 3:
                        createPersonalizeVideo = _a.sent();
                        if (!createPersonalizeVideo)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.personalizeVideoMessage.error.notCreated);
                        return [4, models_1.BookingSchema.updateOne({ _id: bookingId }, { personalizedVideo: createPersonalizeVideo._id })];
                    case 4:
                        updateBooking = _a.sent();
                        if (updateBooking.matchedCount !== 1)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.personalizeVideoMessage.error.notUpdated);
                        personalizeMessageContent = new emailContent_1.PersonalizeMessageContent();
                        title = personalizeMessageContent.personalizeMessageReceived(findBooking.user).subject;
                        description = personalizeMessageContent.personalizeMessageReceived(findBooking.user).text;
                        return [4, new services_1.NotificationServices().notificationGenerate(findBooking.user._id.toString(), findBooking.artist.toString(), title, description, notificationIcon_1.personalizeMessageReceiving, {
                                subject: title,
                                text: description,
                            }, {
                                title: title,
                                body: description,
                                sound: "default",
                            })];
                    case 5:
                        _a.sent();
                        return [2, res.json({
                                success: {
                                    message: resultMessage_1.personalizeVideoMessage.success.created,
                                },
                            })];
                    case 6:
                        error_1 = _a.sent();
                        next(error_1);
                        return [3, 7];
                    case 7: return [2];
                }
            });
        });
    };
    PersonalizedVideoController.prototype.getPersonalizedVideoUser = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, findVideoUser, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = req.params.userId;
                        return [4, models_1.PersonalizeVideoSchema.find({
                                user: userId,
                                isDeletesId: { $ne: userId },
                            })
                                .populate({
                                path: "artist",
                                select: "-password -__v -fcmToken",
                            })
                                .populate({
                                path: "booking",
                                populate: [
                                    {
                                        path: "eventType",
                                        model: "Event",
                                    },
                                    {
                                        path: "serviceType",
                                        model: "Service",
                                    },
                                ],
                            })];
                    case 1:
                        findVideoUser = _a.sent();
                        res.json({
                            success: {
                                data: findVideoUser,
                            },
                        });
                        return [3, 3];
                    case 2:
                        error_2 = _a.sent();
                        next(error_2);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    PersonalizedVideoController.prototype.getPersonalizedVideoArtist = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var artistId, findVideoUser, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        artistId = req.params.artistId;
                        return [4, models_1.PersonalizeVideoSchema.find({
                                artist: artistId,
                                isDeletesId: { $ne: artistId },
                            })
                                .populate({
                                path: "user",
                                select: "-password -__v -fcmToken",
                            })
                                .populate({
                                path: "booking",
                                populate: [
                                    {
                                        path: "eventType",
                                        model: "Event",
                                    },
                                    {
                                        path: "serviceType",
                                        model: "Service",
                                    },
                                ],
                            })];
                    case 1:
                        findVideoUser = _a.sent();
                        res.json({
                            success: {
                                data: findVideoUser,
                            },
                        });
                        return [3, 3];
                    case 2:
                        error_3 = _a.sent();
                        next(error_3);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    PersonalizedVideoController.prototype.deletePersonalizedVideo = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, personalizeId, userId, findPersonalizeVideo, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, personalizeId = _a.personalizeId, userId = _a.userId;
                        if (!personalizeId || !userId)
                            throw new http_errors_1.BadRequest(resultMessage_1.personalizeVideoMessage.error.allField);
                        return [4, models_1.PersonalizeVideoSchema.updateOne({ _id: personalizeId }, {
                                $addToSet: {
                                    isDeletesId: userId,
                                },
                            })];
                    case 1:
                        findPersonalizeVideo = _b.sent();
                        if (!findPersonalizeVideo.matchedCount)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.personalizeVideoMessage.error.notFound);
                        if (!findPersonalizeVideo.modifiedCount)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.personalizeVideoMessage.error.nothingChange);
                        res.json({
                            success: {
                                message: resultMessage_1.personalizeVideoMessage.success.deleted,
                            },
                        });
                        return [3, 3];
                    case 2:
                        error_4 = _b.sent();
                        next(error_4);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    return PersonalizedVideoController;
}());
exports.default = PersonalizedVideoController;
//# sourceMappingURL=personalizeVideo.controller.js.map