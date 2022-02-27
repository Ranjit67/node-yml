"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_errors_1 = require("http-errors");
var models_1 = require("../models");
var resultMessage_1 = require("../resultMessage");
var emailContent_1 = require("../emailContent");
var services_1 = require("../services");
var notificationIcon_1 = require("../notificationIcon");
var RequestHandler = (function () {
    function RequestHandler() {
    }
    RequestHandler.prototype.managerAccept = function (res, next, findRequest) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var artistId_1, managerId_1, findManager, findArtistData, findManagerData, assignArtistContent, title, description, updateAssignArtist, saveAssignArtist, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 7, , 8]);
                        artistId_1 = (_a = findRequest === null || findRequest === void 0 ? void 0 : findRequest.receiverUser) === null || _a === void 0 ? void 0 : _a._id;
                        managerId_1 = (_b = findRequest === null || findRequest === void 0 ? void 0 : findRequest.senderUser) === null || _b === void 0 ? void 0 : _b._id;
                        return [4, models_1.UserSchema.find({
                                _id: { $in: [artistId_1, managerId_1] },
                            })];
                    case 1:
                        findManager = _c.sent();
                        findArtistData = findManager.find(function (item) {
                            return item.role === "artist" && item._id.toString() === artistId_1.toString();
                        });
                        findManagerData = findManager.find(function (item) {
                            return item.role === "manager" &&
                                item._id.toString() === managerId_1.toString();
                        });
                        assignArtistContent = new emailContent_1.AssignArtistContent();
                        title = assignArtistContent.managerRequestAcceptedByArtist(findManagerData).subject;
                        description = assignArtistContent.managerRequestAcceptedByArtist(findManagerData).text;
                        if (!findArtistData || !findManagerData)
                            throw new http_errors_1.BadRequest(resultMessage_1.assignArtistMessage.error.invalidUser);
                        return [4, models_1.AssignArtistSchema.findOneAndUpdate({
                                manager: managerId_1,
                                "artists.artist": { $ne: artistId_1 },
                            }, {
                                $addToSet: {
                                    artists: {
                                        artist: artistId_1,
                                    },
                                },
                            })];
                    case 2:
                        updateAssignArtist = _c.sent();
                        return [4, new services_1.NotificationServices().notificationGenerate(managerId_1, artistId_1, title, description, notificationIcon_1.assignArtistToManager, {
                                subject: title,
                                text: description,
                            }, {
                                title: title,
                                body: description,
                                sound: "default",
                            })];
                    case 3:
                        _c.sent();
                        if (!!updateAssignArtist) return [3, 6];
                        return [4, models_1.AssignArtistSchema.create({
                                manager: managerId_1,
                                artists: [
                                    {
                                        artist: artistId_1,
                                        timestamp: new Date(),
                                    },
                                ],
                            })];
                    case 4:
                        saveAssignArtist = _c.sent();
                        if (!saveAssignArtist)
                            throw new http_errors_1.InternalServerError(resultMessage_1.assignArtistMessage.error.notAssign);
                        return [4, new services_1.NotificationServices().notificationGenerate(managerId_1, artistId_1, title, description, notificationIcon_1.assignArtistToManager, {
                                subject: title,
                                text: description,
                            }, {
                                title: title,
                                body: description,
                                sound: "default",
                            })];
                    case 5:
                        _c.sent();
                        _c.label = 6;
                    case 6: return [3, 8];
                    case 7:
                        error_1 = _c.sent();
                        throw error_1;
                    case 8: return [2];
                }
            });
        });
    };
    RequestHandler.prototype.managerReject = function (res, next, findRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var findManagerData, findArtistData, assignArtistContent, title, description, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        findManagerData = findRequest.senderUser;
                        findArtistData = findRequest.receiverUser;
                        assignArtistContent = new emailContent_1.AssignArtistContent();
                        title = assignArtistContent.managerRequestReject(findManagerData).subject;
                        description = assignArtistContent.managerRequestReject(findManagerData).text;
                        return [4, new services_1.NotificationServices().notificationGenerate(findManagerData === null || findManagerData === void 0 ? void 0 : findManagerData._id, findArtistData === null || findArtistData === void 0 ? void 0 : findArtistData._id, title, description, notificationIcon_1.assignArtistToManager, {
                                subject: title,
                                text: description,
                            }, {
                                title: title,
                                body: description,
                                sound: "default",
                            })];
                    case 1:
                        _a.sent();
                        return [3, 3];
                    case 2:
                        error_2 = _a.sent();
                        throw error_2;
                    case 3: return [2];
                }
            });
        });
    };
    RequestHandler.prototype.rescheduledCustomer = function (res, next, findRequest, permissionBoolean, reason) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        return __awaiter(this, void 0, void 0, function () {
            var bookingContent, bookingUpdate, deleteReschedule, title, description, updateBooking, title, description, error_3;
            return __generator(this, function (_q) {
                switch (_q.label) {
                    case 0:
                        _q.trys.push([0, 8, , 9]);
                        bookingContent = new emailContent_1.BookingContent();
                        if (!permissionBoolean) return [3, 4];
                        if (!((_a = findRequest === null || findRequest === void 0 ? void 0 : findRequest.reschedule) === null || _a === void 0 ? void 0 : _a.booking.toString()))
                            throw new http_errors_1.NotAcceptable(resultMessage_1.requestMessage.error.actionTaken);
                        return [4, models_1.BookingSchema.findByIdAndUpdate((_b = findRequest.reschedule) === null || _b === void 0 ? void 0 : _b.booking.toString(), {
                                eventDate: {
                                    start: (_e = (_d = (_c = findRequest.reschedule) === null || _c === void 0 ? void 0 : _c.rescheduleDate) === null || _d === void 0 ? void 0 : _d.start) !== null && _e !== void 0 ? _e : null,
                                    end: (_h = (_g = (_f = findRequest.reschedule) === null || _f === void 0 ? void 0 : _f.rescheduleDate) === null || _g === void 0 ? void 0 : _g.end) !== null && _h !== void 0 ? _h : null,
                                },
                                bookingReschedule: null,
                                reason: reason,
                                personalizedMsgDate: (_k = (_j = findRequest === null || findRequest === void 0 ? void 0 : findRequest.reschedule) === null || _j === void 0 ? void 0 : _j.personalizedMsgDate) !== null && _k !== void 0 ? _k : null,
                            })];
                    case 1:
                        bookingUpdate = _q.sent();
                        return [4, models_1.BookingRescheduleSchema.findByIdAndDelete((_l = findRequest.reschedule) === null || _l === void 0 ? void 0 : _l._id.toString())];
                    case 2:
                        deleteReschedule = _q.sent();
                        title = bookingContent.bookingPermissionAcceptedByArtist(findRequest.senderUser).subject;
                        description = bookingContent.bookingPermissionAcceptedByArtist(findRequest.senderUser).text;
                        return [4, new services_1.NotificationServices().notificationGenerate(findRequest.senderUser._id.toString(), findRequest.receiverUser._id.toString(), title, description, notificationIcon_1.bookingRescheduleAcceptedByArtistIcon, {
                                subject: title,
                                text: description,
                            }, {
                                title: title,
                                body: description,
                                sound: "default",
                            })];
                    case 3:
                        _q.sent();
                        return [3, 7];
                    case 4:
                        if (!((_m = findRequest === null || findRequest === void 0 ? void 0 : findRequest.reschedule) === null || _m === void 0 ? void 0 : _m.booking.toString()))
                            throw new http_errors_1.NotAcceptable(resultMessage_1.requestMessage.error.actionTaken);
                        return [4, models_1.BookingSchema.findByIdAndUpdate((_p = (_o = findRequest.reschedule) === null || _o === void 0 ? void 0 : _o.booking) === null || _p === void 0 ? void 0 : _p.toString(), {
                                bookingReschedule: null,
                                reason: reason,
                            })];
                    case 5:
                        updateBooking = _q.sent();
                        title = bookingContent.bookingPermissionRejectByArtist(findRequest.senderUser).subject;
                        description = bookingContent.bookingPermissionRejectByArtist(findRequest.senderUser).text;
                        return [4, new services_1.NotificationServices().notificationGenerate(findRequest.senderUser._id.toString(), findRequest.receiverUser._id.toString(), title, description, notificationIcon_1.bookingRescheduleAcceptedByArtistIcon, {
                                subject: title,
                                text: description,
                            }, {
                                title: title,
                                body: description,
                                sound: "default",
                            })];
                    case 6:
                        _q.sent();
                        _q.label = 7;
                    case 7: return [3, 9];
                    case 8:
                        error_3 = _q.sent();
                        throw error_3;
                    case 9: return [2];
                }
            });
        });
    };
    RequestHandler.prototype.rescheduledArtist = function (res, next, findRequest, permissionBoolean, reason) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        return __awaiter(this, void 0, void 0, function () {
            var bookingContent, bookingUpdate, deleteReschedule, findArtistManager, _i, _q, index, title, description, updateBooking, findArtistManager, _r, _s, index, title, description, error_4;
            return __generator(this, function (_t) {
                switch (_t.label) {
                    case 0:
                        _t.trys.push([0, 15, , 16]);
                        bookingContent = new emailContent_1.BookingContent();
                        if (!permissionBoolean) return [3, 8];
                        if (!((_a = findRequest === null || findRequest === void 0 ? void 0 : findRequest.reschedule) === null || _a === void 0 ? void 0 : _a.booking.toString()))
                            throw new http_errors_1.NotAcceptable(resultMessage_1.requestMessage.error.actionTaken);
                        return [4, models_1.BookingSchema.findByIdAndUpdate((_b = findRequest.reschedule) === null || _b === void 0 ? void 0 : _b.booking.toString(), {
                                eventDate: {
                                    start: (_e = (_d = (_c = findRequest.reschedule) === null || _c === void 0 ? void 0 : _c.rescheduleDate) === null || _d === void 0 ? void 0 : _d.start) !== null && _e !== void 0 ? _e : null,
                                    end: (_h = (_g = (_f = findRequest.reschedule) === null || _f === void 0 ? void 0 : _f.rescheduleDate) === null || _g === void 0 ? void 0 : _g.end) !== null && _h !== void 0 ? _h : null,
                                },
                                bookingReschedule: null,
                                reason: reason,
                                personalizedMsgDate: (_k = (_j = findRequest === null || findRequest === void 0 ? void 0 : findRequest.reschedule) === null || _j === void 0 ? void 0 : _j.personalizedMsgDate) !== null && _k !== void 0 ? _k : null,
                            })];
                    case 1:
                        bookingUpdate = _t.sent();
                        return [4, models_1.BookingRescheduleSchema.findByIdAndDelete((_l = findRequest.reschedule) === null || _l === void 0 ? void 0 : _l._id.toString())];
                    case 2:
                        deleteReschedule = _t.sent();
                        return [4, models_1.AssignArtistSchema.find({
                                "artists.artist": findRequest.senderUser._id.toString(),
                            }).select("manager -_id")];
                    case 3:
                        findArtistManager = _t.sent();
                        _i = 0, _q = __spreadArray([
                            findRequest.senderUser._id.toString()
                        ], findArtistManager.map(function (item) { return item.manager; }), true);
                        _t.label = 4;
                    case 4:
                        if (!(_i < _q.length)) return [3, 7];
                        index = _q[_i];
                        title = bookingContent.bookingPermissionAcceptedByUser(findRequest.senderUser).subject;
                        description = bookingContent.bookingPermissionAcceptedByUser(findRequest.senderUser).text;
                        return [4, new services_1.NotificationServices().notificationGenerate(index, findRequest.receiverUser._id.toString(), title, description, notificationIcon_1.bookingRescheduleAcceptedByArtistIcon, {
                                subject: title,
                                text: description,
                            }, {
                                title: title,
                                body: description,
                                sound: "default",
                            })];
                    case 5:
                        _t.sent();
                        _t.label = 6;
                    case 6:
                        _i++;
                        return [3, 4];
                    case 7: return [3, 14];
                    case 8:
                        if (!((_m = findRequest === null || findRequest === void 0 ? void 0 : findRequest.reschedule) === null || _m === void 0 ? void 0 : _m.booking.toString()))
                            throw new http_errors_1.NotAcceptable(resultMessage_1.requestMessage.error.actionTaken);
                        return [4, models_1.BookingSchema.findByIdAndUpdate((_p = (_o = findRequest.reschedule) === null || _o === void 0 ? void 0 : _o.booking) === null || _p === void 0 ? void 0 : _p.toString(), {
                                bookingReschedule: null,
                                reason: reason,
                            })];
                    case 9:
                        updateBooking = _t.sent();
                        return [4, models_1.AssignArtistSchema.find({
                                "artists.artist": findRequest.senderUser._id.toString(),
                            }).select("manager -_id")];
                    case 10:
                        findArtistManager = _t.sent();
                        _r = 0, _s = __spreadArray([
                            findRequest.senderUser._id.toString()
                        ], findArtistManager.map(function (item) { return item.manager; }), true);
                        _t.label = 11;
                    case 11:
                        if (!(_r < _s.length)) return [3, 14];
                        index = _s[_r];
                        title = bookingContent.bookingPermissionRejectedByUser(findRequest.senderUser).subject;
                        description = bookingContent.bookingPermissionRejectedByUser(findRequest.senderUser).text;
                        return [4, new services_1.NotificationServices().notificationGenerate(index, findRequest.receiverUser._id.toString(), title, description, notificationIcon_1.bookingRescheduleAcceptedByArtistIcon, {
                                subject: title,
                                text: description,
                            }, {
                                title: title,
                                body: description,
                                sound: "default",
                            })];
                    case 12:
                        _t.sent();
                        _t.label = 13;
                    case 13:
                        _r++;
                        return [3, 11];
                    case 14: return [3, 16];
                    case 15:
                        error_4 = _t.sent();
                        throw error_4;
                    case 16: return [2];
                }
            });
        });
    };
    RequestHandler.prototype.priceAccept = function (res, next, findRequest, price) {
        return __awaiter(this, void 0, void 0, function () {
            var userData, artistData, findUpdateBooking, title, description, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (!price)
                            throw new http_errors_1.BadRequest(resultMessage_1.requestMessage.error.priceImportant);
                        userData = findRequest.senderUser;
                        artistData = findRequest.receiverUser;
                        return [4, models_1.BookingSchema.findByIdAndUpdate(findRequest.booking, {
                                bookingPrice: +price,
                            })];
                    case 1:
                        findUpdateBooking = _a.sent();
                        if (!findUpdateBooking)
                            throw new http_errors_1.Conflict(resultMessage_1.requestMessage.error.bookingPriceNotUpdated);
                        title = new emailContent_1.BookingContent().bookingPriceSetByArtistSendToUser(userData).subject;
                        description = new emailContent_1.BookingContent().bookingPriceSetByArtistSendToUser(userData).text;
                        return [4, new services_1.NotificationServices().notificationGenerate(userData._id.toString(), artistData._id.toString(), title, description, notificationIcon_1.bookingPriceReceivedByUser, {
                                subject: title,
                                text: description,
                            }, {
                                title: title,
                                body: description,
                                sound: "default",
                            })];
                    case 2:
                        _a.sent();
                        return [3, 4];
                    case 3:
                        error_5 = _a.sent();
                        throw error_5;
                    case 4: return [2];
                }
            });
        });
    };
    RequestHandler.prototype.paymentAcceptReject = function (res, next, findRequest, isAccept, reason) {
        return __awaiter(this, void 0, void 0, function () {
            var bookingContent, bookingUpdate, findArtistManager, title, description, bookingUpdate, findSuperAdmin, _i, _a, index, title, description, cancelIcon, error_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 11, , 12]);
                        bookingContent = new emailContent_1.BookingContent();
                        if (!isAccept) return [3, 4];
                        return [4, models_1.BookingSchema.findByIdAndUpdate(findRequest.booking._id.toString(), {
                                status: "confirm",
                            })];
                    case 1:
                        bookingUpdate = _b.sent();
                        return [4, models_1.AssignArtistSchema.find({
                                "artists.artist": findRequest.receiverUser._id.toString(),
                            }).select("manager -_id")];
                    case 2:
                        findArtistManager = _b.sent();
                        title = bookingContent.bookingConfirmUser(findRequest.senderUser).subject;
                        description = bookingContent.bookingConfirmUser(findRequest.senderUser).text;
                        return [4, new services_1.NotificationServices().notificationGenerate(findRequest.senderUser._id.toString(), findRequest.receiverUser._id.toString(), title, description, notificationIcon_1.bookingConfirm, {
                                subject: title,
                                text: description,
                            }, {
                                title: title,
                                body: description,
                                sound: "default",
                            })];
                    case 3:
                        _b.sent();
                        return [3, 10];
                    case 4: return [4, models_1.BookingSchema.findByIdAndUpdate(findRequest.booking._id.toString(), {
                            status: "cancel",
                            cancelBy: "artist",
                        })];
                    case 5:
                        bookingUpdate = _b.sent();
                        return [4, models_1.UserSchema.find({ role: "admin" }).select("_id")];
                    case 6:
                        findSuperAdmin = _b.sent();
                        _i = 0, _a = __spreadArray([
                            findRequest.senderUser._id.toString()
                        ], findSuperAdmin.map(function (item) { return item._id; }), true);
                        _b.label = 7;
                    case 7:
                        if (!(_i < _a.length)) return [3, 10];
                        index = _a[_i];
                        title = index === findRequest.senderUser._id.toString()
                            ? bookingContent.bookingCancelArtist(findRequest.senderUser)
                                .subject
                            : bookingContent.bookingCancelNotifyToSuperAdmin().subject;
                        description = index === findRequest.senderUser._id.toString()
                            ? bookingContent.bookingCancelArtist(findRequest.senderUser).text
                            : bookingContent.bookingCancelNotifyToSuperAdmin().text;
                        cancelIcon = index === findRequest.senderUser._id.toString()
                            ? notificationIcon_1.bookingCancelByArtistIcon
                            : notificationIcon_1.bookingCancelByArtistIcon;
                        return [4, new services_1.NotificationServices().notificationGenerate(index, findRequest.receiverUser._id.toString(), title, description, cancelIcon, {
                                subject: title,
                                text: description,
                            }, {
                                title: title,
                                body: description,
                                sound: "default",
                            })];
                    case 8:
                        _b.sent();
                        _b.label = 9;
                    case 9:
                        _i++;
                        return [3, 7];
                    case 10: return [3, 12];
                    case 11:
                        error_6 = _b.sent();
                        throw error_6;
                    case 12: return [2];
                }
            });
        });
    };
    RequestHandler.prototype.managerRemoveAccept = function (res, next, findRequest, reason) {
        return __awaiter(this, void 0, void 0, function () {
            var managerId, artistId, findAndUpdate, findManger, assignArtistContent, title, description, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        managerId = findRequest.senderUser._id.toString();
                        artistId = findRequest.receiverUser._id.toString();
                        return [4, models_1.AssignArtistSchema.updateOne({ manager: managerId }, {
                                $pull: {
                                    artists: {
                                        artist: artistId,
                                    },
                                },
                            })];
                    case 1:
                        findAndUpdate = _a.sent();
                        if (!findAndUpdate.matchedCount)
                            throw new http_errors_1.NotFound(resultMessage_1.assignArtistMessage.error.managerNotFound);
                        if (!findAndUpdate.modifiedCount)
                            throw new http_errors_1.Conflict(resultMessage_1.assignArtistMessage.error.artistNotAssignManger);
                        return [4, models_1.UserSchema.findOne({ _id: managerId })];
                    case 2:
                        findManger = _a.sent();
                        assignArtistContent = new emailContent_1.AssignArtistContent();
                        title = assignArtistContent.artistAssignRemoveManagerSide(findManger).subject;
                        description = assignArtistContent.artistAssignRemoveManagerSide(findManger).text;
                        return [4, new services_1.NotificationServices().notificationGenerate(managerId, artistId, title, description, notificationIcon_1.assignArtistToManager, {
                                subject: title,
                                text: description,
                            }, {
                                title: title,
                                body: description,
                                sound: "default",
                            })];
                    case 3:
                        _a.sent();
                        return [3, 5];
                    case 4:
                        error_7 = _a.sent();
                        throw error_7;
                    case 5: return [2];
                }
            });
        });
    };
    RequestHandler.prototype.personalizeRejection = function (res, next, findRequest) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var bookingContent, title, description, error_8;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        bookingContent = new emailContent_1.BookingContent();
                        title = bookingContent.personalizeRejection(findRequest.senderUser).subject;
                        description = bookingContent.personalizeRejection(findRequest.senderUser).text;
                        return [4, new services_1.NotificationServices().notificationGenerate((_a = findRequest.senderUser) === null || _a === void 0 ? void 0 : _a._id.toString(), (_b = findRequest.receiverUser) === null || _b === void 0 ? void 0 : _b._id.toString(), title, description, notificationIcon_1.assignArtistToManager, {
                                subject: title,
                                text: description,
                            }, {
                                title: title,
                                body: description,
                                sound: "default",
                            })];
                    case 1:
                        _c.sent();
                        return [3, 3];
                    case 2:
                        error_8 = _c.sent();
                        throw error_8;
                    case 3: return [2];
                }
            });
        });
    };
    RequestHandler.prototype.priceSetRejectionByArtist = function (res, next, findRequest) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var bookingContent, title, description, error_9;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        bookingContent = new emailContent_1.BookingContent();
                        title = bookingContent.priceSetRejection(findRequest.senderUser).subject;
                        description = bookingContent.priceSetRejection(findRequest.senderUser).text;
                        return [4, new services_1.NotificationServices().notificationGenerate((_a = findRequest.senderUser) === null || _a === void 0 ? void 0 : _a._id.toString(), (_b = findRequest.receiverUser) === null || _b === void 0 ? void 0 : _b._id.toString(), title, description, notificationIcon_1.assignArtistToManager, {
                                subject: title,
                                text: description,
                            }, {
                                title: title,
                                body: description,
                                sound: "default",
                            })];
                    case 1:
                        _c.sent();
                        return [3, 3];
                    case 2:
                        error_9 = _c.sent();
                        throw error_9;
                    case 3: return [2];
                }
            });
        });
    };
    RequestHandler.prototype.managerRemoveReject = function (res, next, findRequest) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var bookingContent, title, description, error_10;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        bookingContent = new emailContent_1.UserContent();
                        title = bookingContent.managerRemoveRejection(findRequest.senderUser).subject;
                        description = bookingContent.managerRemoveRejection(findRequest.senderUser).text;
                        return [4, new services_1.NotificationServices().notificationGenerate((_a = findRequest.senderUser) === null || _a === void 0 ? void 0 : _a._id.toString(), (_b = findRequest.receiverUser) === null || _b === void 0 ? void 0 : _b._id.toString(), title, description, notificationIcon_1.assignArtistToManager, {
                                subject: title,
                                text: description,
                            }, {
                                title: title,
                                body: description,
                                sound: "default",
                            })];
                    case 1:
                        _c.sent();
                        return [3, 3];
                    case 2:
                        error_10 = _c.sent();
                        throw error_10;
                    case 3: return [2];
                }
            });
        });
    };
    return RequestHandler;
}());
var RequestController = (function (_super) {
    __extends(RequestController, _super);
    function RequestController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RequestController.prototype.requestTracker = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, isAccept, requestId, reason, price, findRequest, _b, _c, reasonManipulation, reasonManipulation, _d, reasonManipulation, reasonManipulation, _e, findRequestUpdate, error_11;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _f.trys.push([0, 29, , 30]);
                        _a = req.body, isAccept = _a.isAccept, requestId = _a.requestId, reason = _a.reason, price = _a.price;
                        if (!requestId)
                            throw new http_errors_1.BadRequest(resultMessage_1.requestMessage.error.allField);
                        return [4, models_1.RequestSchema.findById(requestId)
                                .populate("senderUser")
                                .populate("receiverUser")
                                .populate("reschedule")
                                .populate("booking")];
                    case 1:
                        findRequest = _f.sent();
                        if (!findRequest)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.requestMessage.error.noRequest);
                        if (!(findRequest.requestType === "manager")) return [3, 6];
                        if (!isAccept) return [3, 3];
                        return [4, _super.prototype.managerAccept.call(this, res, next, findRequest)];
                    case 2:
                        _b = _f.sent();
                        return [3, 5];
                    case 3: return [4, _super.prototype.managerReject.call(this, res, next, findRequest)];
                    case 4:
                        _b = _f.sent();
                        _f.label = 5;
                    case 5:
                        _b;
                        return [3, 27];
                    case 6:
                        if (!(findRequest.requestType === "pricing")) return [3, 11];
                        if (!isAccept) return [3, 8];
                        return [4, _super.prototype.priceAccept.call(this, res, next, findRequest, price)];
                    case 7:
                        _c = _f.sent();
                        return [3, 10];
                    case 8: return [4, _super.prototype.priceSetRejectionByArtist.call(this, res, next, findRequest)];
                    case 9:
                        _c = _f.sent();
                        _f.label = 10;
                    case 10:
                        _c;
                        return [3, 27];
                    case 11:
                        if (!(findRequest.requestType === "rescheduledCustomer")) return [3, 13];
                        reasonManipulation = reason !== null && reason !== void 0 ? reason : "";
                        return [4, _super.prototype.rescheduledCustomer.call(this, res, next, findRequest, isAccept, reasonManipulation)];
                    case 12:
                        _f.sent();
                        return [3, 27];
                    case 13:
                        if (!(findRequest.requestType === "rescheduledArtist")) return [3, 15];
                        reasonManipulation = reason !== null && reason !== void 0 ? reason : "";
                        return [4, _super.prototype.rescheduledArtist.call(this, res, next, findRequest, isAccept, reasonManipulation)];
                    case 14:
                        _f.sent();
                        return [3, 27];
                    case 15:
                        if (!(findRequest.requestType === "personalize")) return [3, 20];
                        if (!isAccept) return [3, 17];
                        return [4, _super.prototype.priceAccept.call(this, res, next, findRequest, price)];
                    case 16:
                        _d = _f.sent();
                        return [3, 19];
                    case 17: return [4, _super.prototype.personalizeRejection.call(this, res, next, findRequest)];
                    case 18:
                        _d = _f.sent();
                        _f.label = 19;
                    case 19:
                        _d;
                        return [3, 27];
                    case 20:
                        if (!(findRequest.requestType === "payment")) return [3, 22];
                        reasonManipulation = reason !== null && reason !== void 0 ? reason : "";
                        return [4, _super.prototype.paymentAcceptReject.call(this, res, next, findRequest, isAccept, reasonManipulation)];
                    case 21:
                        _f.sent();
                        return [3, 27];
                    case 22:
                        if (!(findRequest.requestType === "managerRemove")) return [3, 27];
                        reasonManipulation = reason !== null && reason !== void 0 ? reason : "";
                        if (!isAccept) return [3, 24];
                        return [4, _super.prototype.managerRemoveAccept.call(this, res, next, findRequest, reasonManipulation)];
                    case 23:
                        _e = _f.sent();
                        return [3, 26];
                    case 24: return [4, _super.prototype.managerRemoveReject.call(this, res, next, findRequest)];
                    case 25:
                        _e = _f.sent();
                        _f.label = 26;
                    case 26:
                        _e;
                        _f.label = 27;
                    case 27: return [4, models_1.RequestSchema.findByIdAndUpdate(requestId, {
                            status: isAccept ? "accept" : "reject",
                            reason: reason,
                        })];
                    case 28:
                        findRequestUpdate = _f.sent();
                        if (!findRequestUpdate)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.requestMessage.error.noRequest);
                        res.json({
                            success: {
                                message: isAccept
                                    ? resultMessage_1.requestMessage.success.requestAccept
                                    : resultMessage_1.requestMessage.success.rejectRequest,
                            },
                        });
                        return [3, 30];
                    case 29:
                        error_11 = _f.sent();
                        next(error_11);
                        return [3, 30];
                    case 30: return [2];
                }
            });
        });
    };
    RequestController.prototype.create = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, requestType, receiverUserId, senderUserId, details, reason, findRequestHaveOrNot, findRequestHaveOrNot, createRequest, error_12;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        _a = req.body, requestType = _a.requestType, receiverUserId = _a.receiverUserId, senderUserId = _a.senderUserId, details = _a.details, reason = _a.reason;
                        if (!receiverUserId || !senderUserId || !requestType)
                            throw new http_errors_1.BadRequest(resultMessage_1.requestMessage.error.allField);
                        if (!(requestType === "manager")) return [3, 2];
                        return [4, models_1.RequestSchema.findOne({
                                requestType: "manager",
                                status: { $in: ["pending", "accept"] },
                                receiverUser: receiverUserId,
                                senderUser: senderUserId,
                                deletedUsers: { $ne: receiverUserId },
                            })];
                    case 1:
                        findRequestHaveOrNot = _b.sent();
                        if ((findRequestHaveOrNot === null || findRequestHaveOrNot === void 0 ? void 0 : findRequestHaveOrNot.status) === "pending") {
                            throw new http_errors_1.Conflict(resultMessage_1.requestMessage.error.yourRequestPending);
                        }
                        else if ((findRequestHaveOrNot === null || findRequestHaveOrNot === void 0 ? void 0 : findRequestHaveOrNot.status) === "accept") {
                            throw new http_errors_1.Conflict(resultMessage_1.requestMessage.error.yourRequestAccept);
                        }
                        return [3, 4];
                    case 2:
                        if (!(requestType === "managerRemove")) return [3, 4];
                        return [4, models_1.RequestSchema.findOne({
                                requestType: "managerRemove",
                                status: { $in: ["pending"] },
                                receiverUser: receiverUserId,
                                senderUser: senderUserId,
                                deletedUsers: { $ne: receiverUserId },
                            })];
                    case 3:
                        findRequestHaveOrNot = _b.sent();
                        if ((findRequestHaveOrNot === null || findRequestHaveOrNot === void 0 ? void 0 : findRequestHaveOrNot.status) === "pending") {
                            throw new http_errors_1.Conflict(resultMessage_1.requestMessage.error.managerRemovePending);
                        }
                        _b.label = 4;
                    case 4: return [4, models_1.RequestSchema.create({
                            requestType: requestType,
                            receiverUser: receiverUserId,
                            senderUser: senderUserId,
                            details: details,
                            reason: reason,
                            timestamp: new Date(),
                        })];
                    case 5:
                        createRequest = _b.sent();
                        if (!createRequest)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.requestMessage.error.notCreated);
                        res.json({
                            success: {
                                message: resultMessage_1.requestMessage.success.created,
                            },
                        });
                        return [3, 7];
                    case 6:
                        error_12 = _b.sent();
                        next(error_12);
                        return [3, 7];
                    case 7: return [2];
                }
            });
        });
    };
    RequestController.prototype.getRequestReceiver = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var receiverUserId, requestReceiver, findUser, findAssignArtist, mapArtist, requestArtistReceiver, makeTogether, error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        receiverUserId = req.params.receiverUserId;
                        if (!receiverUserId)
                            throw new http_errors_1.BadRequest(resultMessage_1.requestMessage.error.allField);
                        return [4, models_1.RequestSchema.find({
                                receiverUser: receiverUserId,
                                deletedUsers: { $ne: receiverUserId },
                            })
                                .populate({
                                path: "senderUser",
                                select: "-password -fcmToken",
                                populate: [
                                    {
                                        path: "events",
                                        module: "Event",
                                    },
                                    {
                                        path: "category",
                                        module: "Category",
                                        select: "-subcategories",
                                    },
                                    {
                                        path: "languages",
                                        module: "Language",
                                    },
                                    {
                                        path: "genres",
                                        module: "Genres",
                                    },
                                    {
                                        path: "subcategories",
                                        module: "SubCategory",
                                    },
                                ],
                            })
                                .select("-deletedUsers")
                                .populate({
                                path: "booking",
                                populate: [
                                    {
                                        path: "serviceType",
                                        module: "Service",
                                    },
                                    {
                                        path: "personalizedVideo",
                                        module: "PersonalizeVideo",
                                    },
                                    {
                                        path: "eventType",
                                        module: "Event",
                                    },
                                ],
                            })
                                .populate({
                                path: "reschedule",
                                select: "rescheduleDate rescheduleBy",
                            })];
                    case 1:
                        requestReceiver = _a.sent();
                        return [4, models_1.UserSchema.findById(receiverUserId)];
                    case 2:
                        findUser = _a.sent();
                        if (!((findUser === null || findUser === void 0 ? void 0 : findUser.role) === "manager")) return [3, 5];
                        return [4, models_1.AssignArtistSchema.findOne({
                                manager: receiverUserId,
                            }).select("artists.artist -_id")];
                    case 3:
                        findAssignArtist = _a.sent();
                        mapArtist = findAssignArtist === null || findAssignArtist === void 0 ? void 0 : findAssignArtist.artists.map(function (artist) { return artist.artist; });
                        return [4, models_1.RequestSchema.find({
                                receiverUser: { $in: mapArtist },
                                requestType: { $ne: "manager" },
                                deletedUsers: { $ne: receiverUserId },
                            })
                                .populate("senderUser")
                                .populate("receiverUser")];
                    case 4:
                        requestArtistReceiver = _a.sent();
                        makeTogether = __spreadArray(__spreadArray([], requestReceiver, true), requestArtistReceiver, true);
                        return [2, res.json({
                                success: {
                                    data: makeTogether,
                                },
                            })];
                    case 5: return [2, res.json({
                            success: {
                                data: requestReceiver,
                            },
                        })];
                    case 6:
                        error_13 = _a.sent();
                        if ((error_13 === null || error_13 === void 0 ? void 0 : error_13.path) === "receiverUser")
                            return [2, res.json({
                                    success: {
                                        data: [],
                                    },
                                })];
                        next(error_13);
                        return [3, 7];
                    case 7: return [2];
                }
            });
        });
    };
    RequestController.prototype.getRequestSender = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var senderUserId, requestSender, error_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        senderUserId = req.params.senderUserId;
                        if (!senderUserId)
                            throw new http_errors_1.BadRequest(resultMessage_1.requestMessage.error.allField);
                        return [4, models_1.RequestSchema.find({
                                senderUser: senderUserId,
                                deletedUsers: { $ne: senderUserId },
                            })
                                .populate({
                                path: "receiverUser",
                                select: "-password -fcmToken",
                                populate: [
                                    {
                                        path: "events",
                                        module: "Event",
                                    },
                                    {
                                        path: "category",
                                        module: "Category",
                                        select: "-subcategories",
                                    },
                                    {
                                        path: "languages",
                                        module: "Language",
                                    },
                                    {
                                        path: "genres",
                                        module: "Genres",
                                    },
                                    {
                                        path: "subcategories",
                                        module: "SubCategory",
                                    },
                                ],
                            })
                                .populate({
                                path: "booking",
                                populate: [
                                    {
                                        path: "serviceType",
                                        module: "Service",
                                    },
                                    {
                                        path: "personalizedVideo",
                                        module: "PersonalizeVideo",
                                    },
                                    {
                                        path: "eventType",
                                        module: "Event",
                                    },
                                ],
                            })
                                .populate({
                                path: "reschedule",
                                select: "rescheduleDate rescheduleBy",
                            })
                                .select("-deletedUsers")];
                    case 1:
                        requestSender = _a.sent();
                        res.json({
                            success: {
                                data: requestSender,
                            },
                        });
                        return [3, 3];
                    case 2:
                        error_14 = _a.sent();
                        if ((error_14 === null || error_14 === void 0 ? void 0 : error_14.path) === "senderUser")
                            return [2, res.json({
                                    success: {
                                        data: [],
                                    },
                                })];
                        next(error_14);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    RequestController.prototype.acceptPriceSet = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, requestId, price, findRequest, findUpdateBooking, deleteRequest, bookingContent, findBooking, title, description, error_15;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        _a = req.body, requestId = _a.requestId, price = _a.price;
                        if (!requestId || !price)
                            throw new http_errors_1.BadRequest(resultMessage_1.requestMessage.error.allField);
                        return [4, models_1.RequestSchema.findById(requestId)];
                    case 1:
                        findRequest = _b.sent();
                        if (!findRequest)
                            throw new http_errors_1.Conflict(resultMessage_1.requestMessage.error.requestNotFound);
                        return [4, models_1.BookingSchema.findByIdAndUpdate(findRequest.booking, {
                                bookingPrice: price,
                            })];
                    case 2:
                        findUpdateBooking = _b.sent();
                        if (!findUpdateBooking)
                            throw new http_errors_1.Conflict(resultMessage_1.requestMessage.error.bookingPriceNotUpdated);
                        return [4, models_1.RequestSchema.findByIdAndUpdate(requestId, {
                                status: "accept",
                            })];
                    case 3:
                        deleteRequest = _b.sent();
                        if (!deleteRequest)
                            throw new http_errors_1.Conflict(resultMessage_1.requestMessage.error.requestNotDeleted);
                        bookingContent = new emailContent_1.BookingContent();
                        return [4, models_1.BookingSchema.findById(findRequest.booking)
                                .populate("artist")
                                .populate("user")];
                    case 4:
                        findBooking = _b.sent();
                        title = new emailContent_1.BookingContent().bookingPriceSetByArtistSendToUser(findBooking.user).subject;
                        description = new emailContent_1.BookingContent().bookingPriceSetByArtistSendToUser(findBooking.user).text;
                        return [4, new services_1.NotificationServices().notificationGenerate(findBooking.user._id.toString(), findBooking.artist._id.toString(), title, description, notificationIcon_1.bookingPriceReceivedByUser, {
                                subject: title,
                                text: description,
                            }, {
                                title: title,
                                body: description,
                                sound: "default",
                            })];
                    case 5:
                        _b.sent();
                        res.json({
                            success: {
                                message: resultMessage_1.requestMessage.success.acceptPriceSet,
                            },
                        });
                        return [3, 7];
                    case 6:
                        error_15 = _b.sent();
                        next(error_15);
                        return [3, 7];
                    case 7: return [2];
                }
            });
        });
    };
    RequestController.prototype.paymentBookingAcceptRejectArtist = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, isAccept, requestId, reason, findRequest, bookingContent, updateRequest, bookingUpdate, findArtistManager, title, description, updateRequest, bookingUpdate, findSuperAdmin, _i, _b, index, title, description, cancelIcon, error_16;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 14, , 15]);
                        _a = req.body, isAccept = _a.isAccept, requestId = _a.requestId, reason = _a.reason;
                        if (!requestId)
                            throw new http_errors_1.BadRequest(resultMessage_1.requestMessage.error.allField);
                        return [4, models_1.RequestSchema.findById(requestId)
                                .populate("senderUser")
                                .populate("receiverUser")];
                    case 1:
                        findRequest = _c.sent();
                        bookingContent = new emailContent_1.BookingContent();
                        if (!findRequest)
                            throw new http_errors_1.Conflict(resultMessage_1.requestMessage.error.requestNotFound);
                        if (!isAccept) return [3, 6];
                        return [4, models_1.RequestSchema.findByIdAndUpdate(requestId, {
                                status: "accept",
                            })];
                    case 2:
                        updateRequest = _c.sent();
                        return [4, models_1.BookingSchema.findByIdAndUpdate(findRequest.booking.toString(), {
                                status: "confirm",
                            })];
                    case 3:
                        bookingUpdate = _c.sent();
                        return [4, models_1.AssignArtistSchema.find({
                                "artists.artist": findRequest.receiverUser._id.toString(),
                            }).select("manager -_id")];
                    case 4:
                        findArtistManager = _c.sent();
                        title = bookingContent.bookingConfirmUser(findRequest.senderUser).subject;
                        description = bookingContent.bookingConfirmUser(findRequest.senderUser).text;
                        return [4, new services_1.NotificationServices().notificationGenerate(findRequest.senderUser._id.toString(), findRequest.receiverUser._id.toString(), title, description, notificationIcon_1.bookingConfirm, {
                                subject: title,
                                text: description,
                            }, {
                                title: title,
                                body: description,
                                sound: "default",
                            })];
                    case 5:
                        _c.sent();
                        return [3, 13];
                    case 6: return [4, models_1.RequestSchema.findByIdAndUpdate(requestId, {
                            status: "reject",
                            reason: reason,
                        })];
                    case 7:
                        updateRequest = _c.sent();
                        return [4, models_1.BookingSchema.findByIdAndUpdate(findRequest.booking.toString(), {
                                status: "cancel",
                                cancelBy: "artist",
                            })];
                    case 8:
                        bookingUpdate = _c.sent();
                        return [4, models_1.UserSchema.find({ role: "admin" }).select("_id")];
                    case 9:
                        findSuperAdmin = _c.sent();
                        _i = 0, _b = __spreadArray([
                            findRequest.senderUser._id.toString()
                        ], findSuperAdmin.map(function (item) { return item._id; }), true);
                        _c.label = 10;
                    case 10:
                        if (!(_i < _b.length)) return [3, 13];
                        index = _b[_i];
                        title = index === findRequest.senderUser._id.toString()
                            ? bookingContent.bookingCancelArtist(findRequest.senderUser)
                                .subject
                            : bookingContent.bookingCancelNotifyToSuperAdmin().subject;
                        description = index === findRequest.senderUser._id.toString()
                            ? bookingContent.bookingCancelArtist(findRequest.senderUser).text
                            : bookingContent.bookingCancelNotifyToSuperAdmin().text;
                        cancelIcon = index === findRequest.senderUser._id.toString()
                            ? notificationIcon_1.bookingCancelByArtistIcon
                            : notificationIcon_1.bookingCancelByArtistIcon;
                        return [4, new services_1.NotificationServices().notificationGenerate(index, findRequest.receiverUser._id.toString(), title, description, cancelIcon, {
                                subject: title,
                                text: description,
                            }, {
                                title: title,
                                body: description,
                                sound: "default",
                            })];
                    case 11:
                        _c.sent();
                        _c.label = 12;
                    case 12:
                        _i++;
                        return [3, 10];
                    case 13:
                        res.json({
                            success: {
                                message: isAccept
                                    ? resultMessage_1.requestMessage.success.bookingAccept
                                    : resultMessage_1.requestMessage.success.bookingReject,
                            },
                        });
                        return [3, 15];
                    case 14:
                        error_16 = _c.sent();
                        next(error_16);
                        return [3, 15];
                    case 15: return [2];
                }
            });
        });
    };
    RequestController.prototype.acceptRejectRequest = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, requestId, reason, details, isAccept, updateRequest, error_17;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, requestId = _a.requestId, reason = _a.reason, details = _a.details, isAccept = _a.isAccept;
                        if (!requestId)
                            throw new http_errors_1.BadRequest(resultMessage_1.requestMessage.error.allField);
                        return [4, models_1.RequestSchema.findOneAndUpdate({ _id: requestId }, {
                                status: isAccept ? "accept" : "reject",
                                reason: reason,
                                details: details,
                            })];
                    case 1:
                        updateRequest = _b.sent();
                        if (!updateRequest)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.requestMessage.error.notRequestUpdate);
                        res.json({
                            success: {
                                message: isAccept
                                    ? resultMessage_1.requestMessage.success.requestAccept
                                    : resultMessage_1.requestMessage.success.rejectRequest,
                            },
                        });
                        return [3, 3];
                    case 2:
                        error_17 = _b.sent();
                        if ((error_17 === null || error_17 === void 0 ? void 0 : error_17.path) === "_id" || (error_17 === null || error_17 === void 0 ? void 0 : error_17.path) === "receiverUser")
                            return [2, res.status(404).json({
                                    error: {
                                        message: resultMessage_1.requestMessage.error.wrongDataEnter,
                                    },
                                })];
                        next(error_17);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    RequestController.prototype.createMangerRemoveRequest = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, managerId, artistId, requestDetails, findArtist, createRequest, requestContent, title, description, error_18;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        _a = req.body, managerId = _a.managerId, artistId = _a.artistId, requestDetails = _a.requestDetails;
                        return [4, models_1.UserSchema.findById(artistId)];
                    case 1:
                        findArtist = _b.sent();
                        if (!findArtist)
                            throw new http_errors_1.Conflict(resultMessage_1.requestMessage.error.artistNotFound);
                        return [4, models_1.RequestSchema.create({
                                senderUser: managerId,
                                receiverUser: artistId,
                                requestType: "managerRemove",
                                details: requestDetails,
                                timeStamp: new Date(),
                            })];
                    case 2:
                        createRequest = _b.sent();
                        if (!createRequest)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.requestMessage.error.requestNotCreated);
                        requestContent = new emailContent_1.RequestContent();
                        title = requestContent.managerRemove(findArtist).subject;
                        description = requestContent.managerRemove(findArtist).text;
                        return [4, new services_1.NotificationServices().notificationGenerate(artistId, managerId, title, description, notificationIcon_1.removeManagerIcon, {
                                subject: title,
                                text: description,
                            }, {
                                title: title,
                                body: description,
                                sound: "default",
                            })];
                    case 3:
                        _b.sent();
                        res.json({
                            success: {
                                message: resultMessage_1.requestMessage.success.managerRequestCreate,
                            },
                        });
                        return [3, 5];
                    case 4:
                        error_18 = _b.sent();
                        next(error_18);
                        return [3, 5];
                    case 5: return [2];
                }
            });
        });
    };
    RequestController.prototype.delete = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, requestIds, userId, updateRequest, deletePendingRequest, error_19;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.body, requestIds = _a.requestIds, userId = _a.userId;
                        if (!Array.isArray(requestIds))
                            throw new http_errors_1.BadRequest(resultMessage_1.requestMessage.error.requestIdIsArray);
                        return [4, models_1.RequestSchema.updateMany({ _id: { $in: requestIds } }, {
                                $addToSet: {
                                    deletedUsers: userId,
                                },
                            })];
                    case 1:
                        updateRequest = _b.sent();
                        return [4, models_1.RequestSchema.deleteMany({
                                _id: { $in: requestIds },
                                senderUser: userId,
                                status: "pending",
                                requestType: {
                                    $nin: ["payment", "personalize", "pricing"],
                                },
                            })];
                    case 2:
                        deletePendingRequest = _b.sent();
                        if (updateRequest.modifiedCount === 0)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.requestMessage.error.notDelete);
                        if (updateRequest.modifiedCount !== (requestIds === null || requestIds === void 0 ? void 0 : requestIds.length))
                            throw new http_errors_1.NotAcceptable(resultMessage_1.requestMessage.error.allAreNotDelete);
                        res.json({
                            success: {
                                message: resultMessage_1.requestMessage.success.requestDeleted,
                            },
                        });
                        return [3, 4];
                    case 3:
                        error_19 = _b.sent();
                        if ((error_19 === null || error_19 === void 0 ? void 0 : error_19.path) === "_id")
                            return [2, res.json({
                                    error: {
                                        message: resultMessage_1.requestMessage.error.invalid,
                                    },
                                })];
                        next(error_19);
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    return RequestController;
}(RequestHandler));
exports.default = RequestController;
//# sourceMappingURL=request.controller.js.map