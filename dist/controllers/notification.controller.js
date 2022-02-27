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
var NotificationController = (function () {
    function NotificationController() {
    }
    NotificationController.prototype.create = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, sendToId, selfId, title, description, iconUrl, sendNotification, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, sendToId = _a.sendToId, selfId = _a.selfId, title = _a.title, description = _a.description, iconUrl = _a.iconUrl;
                        if (!sendToId || !selfId || !title || !description || !iconUrl)
                            throw new http_errors_1.BadRequest(resultMessage_1.notificationMessage.error.allField);
                        return [4, new services_1.NotificationServices().notificationGenerate(sendToId, selfId, title, description, iconUrl, {
                                subject: title,
                                text: description,
                            }, {
                                title: title,
                                body: description,
                                sound: "default",
                            })];
                    case 1:
                        sendNotification = _b.sent();
                        return [2, res.json({
                                success: { message: resultMessage_1.notificationMessage.success.create },
                            })];
                    case 2:
                        error_1 = _b.sent();
                        next(error_1);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    NotificationController.prototype.getSelectedUserNotification = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, getNotification, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = req.params.userId;
                        if (!userId)
                            throw new http_errors_1.BadRequest(resultMessage_1.notificationMessage.error.allField);
                        return [4, models_1.NotificationSchema.findOne({
                                user: userId,
                            })];
                    case 1:
                        getNotification = _a.sent();
                        if (!getNotification)
                            return [2, res.json({
                                    success: {
                                        data: [],
                                    },
                                })];
                        return [2, res.json({
                                success: {
                                    data: getNotification.notification,
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
    NotificationController.prototype.makeRead = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var notificationIds, makeRead, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        notificationIds = req.body.notificationIds;
                        if (!notificationIds.length)
                            throw new http_errors_1.BadRequest(resultMessage_1.notificationMessage.error.allField);
                        return [4, models_1.NotificationSchema.updateOne({ "notification._id": { $in: notificationIds } }, {
                                "notification.$[elem].isRead": true,
                            }, {
                                arrayFilters: [{ "elem._id": { $in: notificationIds } }],
                                upsert: true,
                            })];
                    case 1:
                        makeRead = _a.sent();
                        if (makeRead.modifiedCount === 0)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.notificationMessage.error.notUpdate);
                        return [2, res.json({
                                success: {
                                    message: resultMessage_1.notificationMessage.success.makeRed,
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
    NotificationController.prototype.delete = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var notificationIds, deleteNotification, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        notificationIds = req.body.notificationIds;
                        if (!notificationIds.length)
                            throw new http_errors_1.BadRequest(resultMessage_1.notificationMessage.error.allField);
                        return [4, models_1.NotificationSchema.updateMany({ "notification._id": { $in: notificationIds } }, {
                                $pull: {
                                    notification: {
                                        _id: { $in: notificationIds },
                                    },
                                },
                            })];
                    case 1:
                        deleteNotification = _a.sent();
                        if (!deleteNotification.modifiedCount)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.notificationMessage.error.notDelete);
                        return [2, res.json({
                                success: {
                                    message: resultMessage_1.notificationMessage.success.deleted,
                                },
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
    return NotificationController;
}());
exports.default = NotificationController;
//# sourceMappingURL=notification.controller.js.map