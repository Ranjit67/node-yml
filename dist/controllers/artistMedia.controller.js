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
var resultMessage_1 = require("../resultMessage");
var services_1 = require("../services");
var models_1 = require("../models");
var ArtistMediaController = (function () {
    function ArtistMediaController() {
        this.dir = "artistMedia";
    }
    ArtistMediaController.prototype.videoCreate = function (req, res, next) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var _d, artistId, links, videoObject, timestamp_1, linkArray, videoArray, awsS3, _i, videoObject_1, a, videoUrl, firstUpdate, saveData, userUpdate, firstUpdate, saveData, userUpdate, error_1;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 13, , 14]);
                        _d = req.body, artistId = _d.artistId, links = _d.links;
                        if (!artistId)
                            throw new http_errors_1.BadRequest(resultMessage_1.artistMediaMessage.error.artistIdRequired);
                        videoObject = Array.isArray((_a = req === null || req === void 0 ? void 0 : req.files) === null || _a === void 0 ? void 0 : _a.video)
                            ? (_b = req === null || req === void 0 ? void 0 : req.files) === null || _b === void 0 ? void 0 : _b.video
                            : ((_c = req === null || req === void 0 ? void 0 : req.files) === null || _c === void 0 ? void 0 : _c.video)
                                ? [req.files.video]
                                : [];
                        timestamp_1 = new Date();
                        linkArray = Array.isArray(links)
                            ? links.map(function (element) { return ({
                                youtubeUrl: element,
                                timestamp: timestamp_1,
                            }); })
                            : links
                                ? [
                                    {
                                        youtubeUrl: links,
                                        timestamp: timestamp_1,
                                    },
                                ]
                                : [];
                        if (!videoObject) return [3, 8];
                        videoArray = [];
                        awsS3 = new services_1.AwsS3Services();
                        _i = 0, videoObject_1 = videoObject;
                        _e.label = 1;
                    case 1:
                        if (!(_i < videoObject_1.length)) return [3, 4];
                        a = videoObject_1[_i];
                        return [4, awsS3.upload(a, "artistMedia")];
                    case 2:
                        videoUrl = _e.sent();
                        videoArray.push({
                            videoUrl: videoUrl === null || videoUrl === void 0 ? void 0 : videoUrl.Location,
                            videoFile: videoUrl === null || videoUrl === void 0 ? void 0 : videoUrl.key,
                            timestamp: timestamp_1,
                        });
                        _e.label = 3;
                    case 3:
                        _i++;
                        return [3, 1];
                    case 4: return [4, models_1.ArtistMediaSchema.updateOne({ artist: artistId }, {
                            $push: {
                                artistVideos: {
                                    $each: videoArray,
                                },
                                youtubeVideos: {
                                    $each: linkArray,
                                },
                            },
                        })];
                    case 5:
                        firstUpdate = _e.sent();
                        if (firstUpdate.matchedCount === 1)
                            return [2, res.json({
                                    success: {
                                        message: resultMessage_1.artistMediaMessage.success.artistMediaUpdated,
                                    },
                                })];
                        return [4, models_1.ArtistMediaSchema.create({
                                artist: artistId,
                                artistVideos: videoArray,
                                youtubeVideos: linkArray,
                            })];
                    case 6:
                        saveData = _e.sent();
                        if (!saveData)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.artistMediaMessage.error.notCreated);
                        return [4, models_1.UserSchema.findByIdAndUpdate(artistId, {
                                artistMedia: saveData._id,
                            })];
                    case 7:
                        userUpdate = _e.sent();
                        res.json({
                            success: {
                                message: resultMessage_1.artistMediaMessage.success.artistMediaUpdated,
                            },
                        });
                        return [3, 12];
                    case 8: return [4, models_1.ArtistMediaSchema.updateOne({ artist: artistId }, {
                            $push: {
                                youtubeVideos: {
                                    $each: linkArray,
                                },
                            },
                        })];
                    case 9:
                        firstUpdate = _e.sent();
                        if (firstUpdate.matchedCount === 1)
                            return [2, res.json({
                                    success: {
                                        message: resultMessage_1.artistMediaMessage.success.artistMediaUpdated,
                                    },
                                })];
                        return [4, models_1.ArtistMediaSchema.create({
                                artist: artistId,
                                youtubeVideos: linkArray,
                            })];
                    case 10:
                        saveData = _e.sent();
                        if (!saveData)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.artistMediaMessage.error.notCreated);
                        return [4, models_1.UserSchema.findByIdAndUpdate(artistId, {
                                artistMedia: saveData._id,
                            })];
                    case 11:
                        userUpdate = _e.sent();
                        return [2, res.json({
                                success: {
                                    message: resultMessage_1.artistMediaMessage.success.artistMediaUpdated,
                                },
                            })];
                    case 12: return [3, 14];
                    case 13:
                        error_1 = _e.sent();
                        next(error_1);
                        return [3, 14];
                    case 14: return [2];
                }
            });
        });
    };
    ArtistMediaController.prototype.photoCreate = function (req, res, next) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var artistId, images, awsS3, imageArray, timestamp, _i, images_1, a, imageUrl, firstUpdate, saveData, userUpdate, error_2;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 8, , 9]);
                        artistId = req.body.artistId;
                        images = Array.isArray((_a = req === null || req === void 0 ? void 0 : req.files) === null || _a === void 0 ? void 0 : _a.images)
                            ? (_b = req === null || req === void 0 ? void 0 : req.files) === null || _b === void 0 ? void 0 : _b.images
                            : ((_c = req === null || req === void 0 ? void 0 : req.files) === null || _c === void 0 ? void 0 : _c.images)
                                ? [req.files.images]
                                : [];
                        if (!artistId || !images.length)
                            throw new http_errors_1.BadRequest(resultMessage_1.artistMediaMessage.error.allField);
                        awsS3 = new services_1.AwsS3Services();
                        imageArray = [];
                        timestamp = new Date();
                        _i = 0, images_1 = images;
                        _d.label = 1;
                    case 1:
                        if (!(_i < images_1.length)) return [3, 4];
                        a = images_1[_i];
                        return [4, awsS3.upload(a, "artistMedia")];
                    case 2:
                        imageUrl = _d.sent();
                        imageArray.push({
                            imageUrl: imageUrl === null || imageUrl === void 0 ? void 0 : imageUrl.Location,
                            imageFile: imageUrl === null || imageUrl === void 0 ? void 0 : imageUrl.key,
                            timestamp: timestamp,
                        });
                        _d.label = 3;
                    case 3:
                        _i++;
                        return [3, 1];
                    case 4: return [4, models_1.ArtistMediaSchema.updateOne({ artist: artistId }, {
                            $push: {
                                artistPhotos: {
                                    $each: imageArray,
                                },
                            },
                        })];
                    case 5:
                        firstUpdate = _d.sent();
                        if (firstUpdate.matchedCount === 1)
                            return [2, res.json({
                                    success: {
                                        message: resultMessage_1.artistMediaMessage.success.artistPhotoUpdated,
                                    },
                                })];
                        return [4, models_1.ArtistMediaSchema.create({
                                artist: artistId,
                                artistPhotos: imageArray,
                            })];
                    case 6:
                        saveData = _d.sent();
                        if (!saveData)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.artistMediaMessage.error.photoNotCreated);
                        return [4, models_1.UserSchema.findByIdAndUpdate(artistId, {
                                artistMedia: saveData._id,
                            })];
                    case 7:
                        userUpdate = _d.sent();
                        return [2, res.json({
                                success: {
                                    message: resultMessage_1.artistMediaMessage.success.artistPhotoUpdated,
                                },
                            })];
                    case 8:
                        error_2 = _d.sent();
                        next(error_2);
                        return [3, 9];
                    case 9: return [2];
                }
            });
        });
    };
    ArtistMediaController.prototype.getArtistVideo = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var artistId, findData, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        artistId = req.params.artistId;
                        if (!artistId)
                            throw new http_errors_1.BadRequest(resultMessage_1.artistMediaMessage.error.artistIdRequired);
                        return [4, models_1.ArtistMediaSchema.findOne({
                                artist: artistId,
                            }).select("artistVideos youtubeVideos -_id")];
                    case 1:
                        findData = _a.sent();
                        if (!findData)
                            return [2, res.json({
                                    success: {
                                        data: {
                                            artistVideos: [],
                                            youtubeVideos: [],
                                        },
                                    },
                                })];
                        return [2, res.json({ success: { data: findData } })];
                    case 2:
                        error_3 = _a.sent();
                        next(error_3);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    ArtistMediaController.prototype.getArtistPhoto = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var artistId, findData, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        artistId = req.params.artistId;
                        if (!artistId)
                            throw new http_errors_1.BadRequest(resultMessage_1.artistMediaMessage.error.artistIdRequired);
                        return [4, models_1.ArtistMediaSchema.findOne({
                                artist: artistId,
                            }).select("artistPhotos -_id")];
                    case 1:
                        findData = _a.sent();
                        if (!(findData === null || findData === void 0 ? void 0 : findData.artistPhotos))
                            return [2, res.json({ success: { data: [] } })];
                        return [2, res.json({
                                success: { data: findData.artistPhotos },
                            })];
                    case 2:
                        error_4 = _a.sent();
                        next(error_4);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    ArtistMediaController.prototype.videoDelete = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, artistId, videoIds_1, findVideos, getVideoItems, awsS3, _i, getVideoItems_1, a, deleteVideo, update, error_5;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 7, , 8]);
                        _b = req.body, artistId = _b.artistId, videoIds_1 = _b.videoIds;
                        if (!artistId || !(videoIds_1 === null || videoIds_1 === void 0 ? void 0 : videoIds_1.length))
                            throw new http_errors_1.BadRequest(resultMessage_1.artistMediaMessage.error.allField);
                        return [4, models_1.ArtistMediaSchema.findOne({
                                artist: artistId,
                            }).select("artistVideos")];
                    case 1:
                        findVideos = _c.sent();
                        getVideoItems = ((_a = findVideos === null || findVideos === void 0 ? void 0 : findVideos.artistVideos) === null || _a === void 0 ? void 0 : _a.filter(function (element) {
                            return videoIds_1.find(function (id) { return id === element._id.toString(); });
                        })) || [];
                        awsS3 = new services_1.AwsS3Services();
                        _i = 0, getVideoItems_1 = getVideoItems;
                        _c.label = 2;
                    case 2:
                        if (!(_i < getVideoItems_1.length)) return [3, 5];
                        a = getVideoItems_1[_i];
                        return [4, awsS3.delete(a.videoFile, "artistMedia")];
                    case 3:
                        deleteVideo = _c.sent();
                        _c.label = 4;
                    case 4:
                        _i++;
                        return [3, 2];
                    case 5: return [4, models_1.ArtistMediaSchema.updateOne({ artist: artistId }, {
                            $pull: {
                                artistVideos: {
                                    _id: {
                                        $in: videoIds_1,
                                    },
                                },
                                youtubeVideos: {
                                    _id: {
                                        $in: videoIds_1,
                                    },
                                },
                            },
                        })];
                    case 6:
                        update = _c.sent();
                        if (update.matchedCount !== 1)
                            throw new http_errors_1.NotFound(resultMessage_1.artistMediaMessage.error.notDataFound);
                        return [2, res.json({
                                success: { message: resultMessage_1.artistMediaMessage.success.videoDeleted },
                            })];
                    case 7:
                        error_5 = _c.sent();
                        if (error_5.path === "_id")
                            return [2, res.status(400).json({
                                    error: {
                                        message: resultMessage_1.artistMediaMessage.error.videoNotFound,
                                    },
                                })];
                        next(error_5);
                        return [3, 8];
                    case 8: return [2];
                }
            });
        });
    };
    ArtistMediaController.prototype.photoDelete = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, imageDataIds_1, artistId, findPhotos, getPhotoItems, awsS3, _i, getPhotoItems_1, a, deletePhoto, update, error_6;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 7, , 8]);
                        _b = req.body, imageDataIds_1 = _b.imageDataIds, artistId = _b.artistId;
                        if (!artistId || !Array.isArray(imageDataIds_1))
                            throw new http_errors_1.BadRequest(resultMessage_1.artistMediaMessage.error.allField);
                        return [4, models_1.ArtistMediaSchema.findOne({
                                artist: artistId,
                            }).select("artistPhotos")];
                    case 1:
                        findPhotos = _c.sent();
                        getPhotoItems = (_a = findPhotos === null || findPhotos === void 0 ? void 0 : findPhotos.artistPhotos) === null || _a === void 0 ? void 0 : _a.filter(function (element) {
                            return imageDataIds_1.find(function (id) { return id === element._id.toString(); });
                        });
                        if (!(getPhotoItems === null || getPhotoItems === void 0 ? void 0 : getPhotoItems.length))
                            throw new http_errors_1.NotFound(resultMessage_1.artistMediaMessage.error.noDataFoundForDelete);
                        awsS3 = new services_1.AwsS3Services();
                        _i = 0, getPhotoItems_1 = getPhotoItems;
                        _c.label = 2;
                    case 2:
                        if (!(_i < getPhotoItems_1.length)) return [3, 5];
                        a = getPhotoItems_1[_i];
                        return [4, awsS3.delete(a.imageFile, "artistMedia")];
                    case 3:
                        deletePhoto = _c.sent();
                        _c.label = 4;
                    case 4:
                        _i++;
                        return [3, 2];
                    case 5: return [4, models_1.ArtistMediaSchema.updateOne({ artist: artistId }, {
                            $pull: {
                                artistPhotos: {
                                    _id: {
                                        $in: imageDataIds_1,
                                    },
                                },
                            },
                        })];
                    case 6:
                        update = _c.sent();
                        if (update.matchedCount !== 1)
                            throw new http_errors_1.NotFound(resultMessage_1.artistMediaMessage.error.notDataFound);
                        return [2, res.json({
                                success: { message: resultMessage_1.artistMediaMessage.success.photoDeleted },
                            })];
                    case 7:
                        error_6 = _c.sent();
                        next(error_6);
                        return [3, 8];
                    case 8: return [2];
                }
            });
        });
    };
    return ArtistMediaController;
}());
exports.default = ArtistMediaController;
//# sourceMappingURL=artistMedia.controller.js.map