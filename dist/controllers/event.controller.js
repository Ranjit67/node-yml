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
var services_1 = require("../services");
var resultMessage_1 = require("../resultMessage");
var EventController = (function () {
    function EventController() {
        this.dir = "event";
    }
    EventController.prototype.create = function (req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var eventName, iconPicture, imagePicture, awsS3, iconImage, imageImage, saveEvent, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 4, , 5]);
                        eventName = req.body.eventName;
                        iconPicture = (_a = req === null || req === void 0 ? void 0 : req.files) === null || _a === void 0 ? void 0 : _a.icon;
                        imagePicture = (_b = req === null || req === void 0 ? void 0 : req.files) === null || _b === void 0 ? void 0 : _b.image;
                        if (!eventName || !iconPicture || !imagePicture)
                            throw new http_errors_1.BadRequest(resultMessage_1.eventMessage.error.allFieldsRequired);
                        awsS3 = new services_1.AwsS3Services();
                        return [4, awsS3.upload(iconPicture, "event")];
                    case 1:
                        iconImage = _c.sent();
                        if (!iconImage)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.eventMessage.error.iconImageUploadFail);
                        return [4, awsS3.upload(imagePicture, "event")];
                    case 2:
                        imageImage = _c.sent();
                        if (!imageImage)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.eventMessage.error.imageImageUploadFail);
                        return [4, models_1.EventSchema.create({
                                eventName: eventName,
                                iconUrl: iconImage.Location,
                                iconFile: iconImage.Key,
                                imageUrl: imageImage.Location,
                                imageFile: imageImage.Key,
                                timestamp: new Date(),
                            })];
                    case 3:
                        saveEvent = _c.sent();
                        if (!saveEvent)
                            throw new http_errors_1.InternalServerError(resultMessage_1.eventMessage.error.notCreated);
                        res.json({
                            success: {
                                message: resultMessage_1.eventMessage.success.created,
                            },
                        });
                        return [3, 5];
                    case 4:
                        error_1 = _c.sent();
                        next(error_1);
                        return [3, 5];
                    case 5: return [2];
                }
            });
        });
    };
    EventController.prototype.getAll = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var findAllEvent, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, models_1.EventSchema.find({})];
                    case 1:
                        findAllEvent = _a.sent();
                        res.json({
                            success: {
                                data: findAllEvent,
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
    EventController.prototype.getOne = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, findOneEvent, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        return [4, models_1.EventSchema.findById(id)];
                    case 1:
                        findOneEvent = _a.sent();
                        res.json({
                            success: {
                                data: findOneEvent,
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
    EventController.prototype.update = function (req, res, next) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function () {
            var _g, eventId, eventName, iconPicture, imagePicture, iconImage, imageImage, findOneEvent, awsS3, deleteOlder, _h, awsS3, deleteOlder, _j, findOneAndUpdateEvent, error_4;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        _k.trys.push([0, 13, , 14]);
                        _g = req.body, eventId = _g.eventId, eventName = _g.eventName;
                        iconPicture = (_a = req === null || req === void 0 ? void 0 : req.files) === null || _a === void 0 ? void 0 : _a.icon;
                        imagePicture = (_b = req === null || req === void 0 ? void 0 : req.files) === null || _b === void 0 ? void 0 : _b.image;
                        iconImage = void 0;
                        imageImage = void 0;
                        return [4, models_1.EventSchema.findById(eventId)];
                    case 1:
                        findOneEvent = _k.sent();
                        if (!iconPicture) return [3, 6];
                        awsS3 = new services_1.AwsS3Services();
                        if (!(findOneEvent === null || findOneEvent === void 0 ? void 0 : findOneEvent.iconFile)) return [3, 3];
                        return [4, awsS3.delete(findOneEvent === null || findOneEvent === void 0 ? void 0 : findOneEvent.iconFile, "event")];
                    case 2:
                        _h = _k.sent();
                        return [3, 4];
                    case 3:
                        _h = "";
                        _k.label = 4;
                    case 4:
                        deleteOlder = _h;
                        return [4, awsS3.upload(iconPicture, "event")];
                    case 5:
                        iconImage = _k.sent();
                        if (!iconImage)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.eventMessage.error.iconImageUploadFail);
                        _k.label = 6;
                    case 6:
                        if (!imagePicture) return [3, 11];
                        awsS3 = new services_1.AwsS3Services();
                        if (!(findOneEvent === null || findOneEvent === void 0 ? void 0 : findOneEvent.imageFile)) return [3, 8];
                        return [4, awsS3.delete(findOneEvent === null || findOneEvent === void 0 ? void 0 : findOneEvent.imageFile, "event")];
                    case 7:
                        _j = _k.sent();
                        return [3, 9];
                    case 8:
                        _j = "";
                        _k.label = 9;
                    case 9:
                        deleteOlder = _j;
                        return [4, awsS3.upload(imagePicture, "event")];
                    case 10:
                        imageImage = _k.sent();
                        if (!imageImage)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.eventMessage.error.iconImageUploadFail);
                        _k.label = 11;
                    case 11: return [4, models_1.EventSchema.findByIdAndUpdate(eventId, {
                            eventName: eventName !== null && eventName !== void 0 ? eventName : findOneEvent.eventName,
                            iconUrl: (_c = iconImage === null || iconImage === void 0 ? void 0 : iconImage.Location) !== null && _c !== void 0 ? _c : findOneEvent.iconUrl,
                            iconFile: (_d = iconImage === null || iconImage === void 0 ? void 0 : iconImage.Key) !== null && _d !== void 0 ? _d : findOneEvent.iconFile,
                            imageUrl: (_e = imageImage === null || imageImage === void 0 ? void 0 : imageImage.Location) !== null && _e !== void 0 ? _e : findOneEvent.imageUrl,
                            imageFile: (_f = imageImage === null || imageImage === void 0 ? void 0 : imageImage.Key) !== null && _f !== void 0 ? _f : findOneEvent.imageFile,
                        })];
                    case 12:
                        findOneAndUpdateEvent = _k.sent();
                        if (!findOneAndUpdateEvent)
                            throw new http_errors_1.InternalServerError(resultMessage_1.eventMessage.error.notUpdated);
                        res.json({
                            success: {
                                message: resultMessage_1.eventMessage.success.updated,
                            },
                        });
                        return [3, 14];
                    case 13:
                        error_4 = _k.sent();
                        next(error_4);
                        return [3, 14];
                    case 14: return [2];
                }
            });
        });
    };
    EventController.prototype.delete = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var ids, findEvent, awsS3, _i, findEvent_1, item, deleteOlder, _a, deleteOlder2, _b, deleteEvent, error_5;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 12, , 13]);
                        ids = req.body.ids;
                        if (!(ids === null || ids === void 0 ? void 0 : ids.length))
                            throw new http_errors_1.BadRequest(resultMessage_1.eventMessage.error.allFieldsRequired);
                        return [4, models_1.EventSchema.find({ _id: { $in: ids } })];
                    case 1:
                        findEvent = _c.sent();
                        if (!(findEvent === null || findEvent === void 0 ? void 0 : findEvent.length))
                            throw new http_errors_1.BadRequest(resultMessage_1.eventMessage.error.notFound);
                        awsS3 = new services_1.AwsS3Services();
                        _i = 0, findEvent_1 = findEvent;
                        _c.label = 2;
                    case 2:
                        if (!(_i < findEvent_1.length)) return [3, 10];
                        item = findEvent_1[_i];
                        if (!(item === null || item === void 0 ? void 0 : item.iconFile)) return [3, 4];
                        return [4, awsS3.delete(item.iconFile, "event")];
                    case 3:
                        _a = _c.sent();
                        return [3, 5];
                    case 4:
                        _a = "";
                        _c.label = 5;
                    case 5:
                        deleteOlder = _a;
                        if (!(item === null || item === void 0 ? void 0 : item.imageFile)) return [3, 7];
                        return [4, awsS3.delete(item.imageFile, "event")];
                    case 6:
                        _b = _c.sent();
                        return [3, 8];
                    case 7:
                        _b = "";
                        _c.label = 8;
                    case 8:
                        deleteOlder2 = _b;
                        _c.label = 9;
                    case 9:
                        _i++;
                        return [3, 2];
                    case 10: return [4, models_1.EventSchema.deleteMany({ _id: { $in: ids } })];
                    case 11:
                        deleteEvent = _c.sent();
                        if (!deleteEvent)
                            throw new http_errors_1.InternalServerError(resultMessage_1.eventMessage.error.notDeleted);
                        res.json({
                            success: {
                                message: resultMessage_1.eventMessage.success.deleted,
                            },
                        });
                        return [3, 13];
                    case 12:
                        error_5 = _c.sent();
                        if (error_5.path === "_id") {
                            error_5.message = resultMessage_1.eventMessage.error.notFound;
                        }
                        next(error_5);
                        return [3, 13];
                    case 13: return [2];
                }
            });
        });
    };
    return EventController;
}());
exports.default = EventController;
//# sourceMappingURL=event.controller.js.map