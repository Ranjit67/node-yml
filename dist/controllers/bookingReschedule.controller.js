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
var notificationIcon_1 = require("../notificationIcon");
var services_1 = require("../services");
var BookingRescheduleController = (function () {
    function BookingRescheduleController() {
    }
    BookingRescheduleController.prototype.create = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, bookingId, rescheduleStartDate, rescheduleEndDate, personalizedMsgDate, rescheduleBy, requestDetails, checkRescheduledBooking, findBooking, createReschedule, updateBooking, findArtistManager, bookingContent, createRequestReschedule, _i, _b, index, title, description, bookingNotificationIcon, createRequestReschedule, _c, _d, index, title, description, bookingNotificationIcon, error_1;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 18, , 19]);
                        _a = req.body, bookingId = _a.bookingId, rescheduleStartDate = _a.rescheduleStartDate, rescheduleEndDate = _a.rescheduleEndDate, personalizedMsgDate = _a.personalizedMsgDate, rescheduleBy = _a.rescheduleBy, requestDetails = _a.requestDetails;
                        if (!bookingId)
                            throw new http_errors_1.BadRequest(resultMessage_1.bookingRescheduleMessage.error.bookingId);
                        return [4, models_1.BookingRescheduleSchema.findOne({
                                booking: bookingId,
                            })];
                    case 1:
                        checkRescheduledBooking = _e.sent();
                        if (checkRescheduledBooking)
                            throw new http_errors_1.Conflict(resultMessage_1.bookingRescheduleMessage.error.bookingRescheduleAlreadyExist);
                        return [4, models_1.BookingSchema.findById(bookingId)
                                .populate("artist")
                                .populate("user")];
                    case 2:
                        findBooking = _e.sent();
                        if (!findBooking)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.bookingRescheduleMessage.error.bookingNotFound);
                        return [4, models_1.BookingRescheduleSchema.create({
                                artist: findBooking.artist._id.toString(),
                                user: findBooking.user._id.toString(),
                                rescheduleBy: rescheduleBy,
                                booking: findBooking._id.toString(),
                                rescheduleDate: {
                                    start: rescheduleStartDate,
                                    end: rescheduleEndDate,
                                },
                                personalizedMsgDate: personalizedMsgDate,
                                timestamp: new Date(),
                            })];
                    case 3:
                        createReschedule = _e.sent();
                        return [4, models_1.BookingSchema.findByIdAndUpdate(bookingId, {
                                bookingReschedule: createReschedule._id,
                            })];
                    case 4:
                        updateBooking = _e.sent();
                        return [4, models_1.AssignArtistSchema.find({
                                "artists.artist": findBooking.artist._id.toString(),
                            }).select("manager -_id")];
                    case 5:
                        findArtistManager = _e.sent();
                        bookingContent = new emailContent_1.BookingContent();
                        if (!(rescheduleBy === "artist")) return [3, 11];
                        return [4, models_1.RequestSchema.create({
                                requestType: "rescheduledArtist",
                                senderUser: findBooking.artist._id.toString(),
                                receiverUser: findBooking.user._id.toString(),
                                booking: findBooking._id.toString(),
                                details: requestDetails,
                                reschedule: createReschedule._id.toString(),
                                timestamp: new Date(),
                            })];
                    case 6:
                        createRequestReschedule = _e.sent();
                        if (!createReschedule)
                            throw new http_errors_1.InternalServerError(resultMessage_1.bookingRescheduleMessage.error.notCreated);
                        _i = 0, _b = __spreadArray([
                            findBooking.user._id.toString(),
                            findBooking.artist._id.toString()
                        ], findArtistManager.map(function (item) { return item.manager; }), true);
                        _e.label = 7;
                    case 7:
                        if (!(_i < _b.length)) return [3, 10];
                        index = _b[_i];
                        title = index === findBooking.artist._id.toString()
                            ? bookingContent.bookingRescheduleByArtistPendingArtist(findBooking.artist).subject
                            : bookingContent.bookingRescheduleByArtistPendingUser(findBooking.user).subject;
                        description = index === findBooking.artist._id.toString()
                            ? bookingContent.bookingRescheduleByArtistPendingArtist(findBooking.artist).text
                            : bookingContent.bookingRescheduleByArtistPendingUser(findBooking.user).text;
                        bookingNotificationIcon = index === findBooking.artist._id.toString()
                            ? notificationIcon_1.bookingRescheduleByUserPendingUserIcon
                            : index === findBooking.artist._id.toString()
                                ? notificationIcon_1.bookingRescheduleByUserPendingArtistIcon
                                : notificationIcon_1.bookingRescheduleByUserPendingArtistIcon;
                        return [4, new services_1.NotificationServices().notificationGenerate(index, findBooking.artist._id.toString(), title, description, bookingNotificationIcon, {
                                subject: title,
                                text: description,
                            }, {
                                title: title,
                                body: description,
                                sound: "default",
                            })];
                    case 8:
                        _e.sent();
                        _e.label = 9;
                    case 9:
                        _i++;
                        return [3, 7];
                    case 10:
                        res.json({
                            success: {
                                message: resultMessage_1.bookingRescheduleMessage.success.createdUser,
                            },
                        });
                        return [3, 17];
                    case 11: return [4, models_1.RequestSchema.create({
                            requestType: "rescheduledCustomer",
                            senderUser: findBooking.user._id.toString(),
                            receiverUser: findBooking.artist._id.toString(),
                            booking: findBooking._id.toString(),
                            details: requestDetails,
                            reschedule: createReschedule._id.toString(),
                            timestamp: new Date(),
                        })];
                    case 12:
                        createRequestReschedule = _e.sent();
                        if (!createReschedule)
                            throw new http_errors_1.InternalServerError(resultMessage_1.bookingRescheduleMessage.error.notCreated);
                        _c = 0, _d = __spreadArray([
                            findBooking.user._id.toString(),
                            findBooking.artist._id.toString()
                        ], findArtistManager.map(function (item) { return item.manager; }), true);
                        _e.label = 13;
                    case 13:
                        if (!(_c < _d.length)) return [3, 16];
                        index = _d[_c];
                        title = index === findBooking.user._id.toString()
                            ? bookingContent.bookingRescheduleByUserPendingUser(findBooking.user).subject
                            : bookingContent.bookingRescheduleByUserPendingArtist(findBooking.artist).subject;
                        description = index === findBooking.user._id.toString()
                            ? bookingContent.bookingRescheduleByUserPendingUser(findBooking.user).text
                            : bookingContent.bookingRescheduleByUserPendingArtist(findBooking.artist).text;
                        bookingNotificationIcon = index === findBooking.user._id.toString()
                            ? notificationIcon_1.bookingRescheduleByUserPendingUserIcon
                            : index === findBooking.artist._id.toString()
                                ? notificationIcon_1.bookingRescheduleByUserPendingArtistIcon
                                : notificationIcon_1.bookingRescheduleByUserPendingArtistIcon;
                        return [4, new services_1.NotificationServices().notificationGenerate(index, findBooking.user._id.toString(), title, description, bookingNotificationIcon, {
                                subject: title,
                                text: description,
                            }, {
                                title: title,
                                body: description,
                                sound: "default",
                            })];
                    case 14:
                        _e.sent();
                        _e.label = 15;
                    case 15:
                        _c++;
                        return [3, 13];
                    case 16:
                        res.json({
                            success: {
                                message: resultMessage_1.bookingRescheduleMessage.success.createdArtist,
                            },
                        });
                        _e.label = 17;
                    case 17: return [3, 19];
                    case 18:
                        error_1 = _e.sent();
                        next(error_1);
                        return [3, 19];
                    case 19: return [2];
                }
            });
        });
    };
    BookingRescheduleController.prototype.ReschedulePermission = function (req, res, next) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        return __awaiter(this, void 0, void 0, function () {
            var _o, requestId, permissionBoolean, actionBy, reason, findRequest, bookingContent, updateRequest, bookingUpdate, deleteReschedule, title, description, findArtistManager, _i, _p, index, title, description, updateBooking, updateRequest, title, description, findArtistManager, _q, _r, index, title, description, error_2;
            return __generator(this, function (_s) {
                switch (_s.label) {
                    case 0:
                        _s.trys.push([0, 23, , 24]);
                        _o = req.body, requestId = _o.requestId, permissionBoolean = _o.isAccept, actionBy = _o.actionBy, reason = _o.reason;
                        return [4, models_1.RequestSchema.findById(requestId)
                                .populate("reschedule")
                                .populate("senderUser")
                                .populate("receiverUser")];
                    case 1:
                        findRequest = _s.sent();
                        bookingContent = new emailContent_1.BookingContent();
                        if (!permissionBoolean) return [3, 12];
                        return [4, models_1.RequestSchema.findByIdAndUpdate(requestId, {
                                status: "accept",
                            })];
                    case 2:
                        updateRequest = _s.sent();
                        if (!findRequest.reschedule)
                            throw new http_errors_1.InternalServerError(resultMessage_1.bookingRescheduleMessage.error.actionDenied);
                        return [4, models_1.BookingSchema.findByIdAndUpdate((_a = findRequest.reschedule) === null || _a === void 0 ? void 0 : _a.booking.toString(), {
                                eventDate: {
                                    start: (_d = (_c = (_b = findRequest.reschedule) === null || _b === void 0 ? void 0 : _b.rescheduleDate) === null || _c === void 0 ? void 0 : _c.start) !== null && _d !== void 0 ? _d : null,
                                    end: (_g = (_f = (_e = findRequest.reschedule) === null || _e === void 0 ? void 0 : _e.rescheduleDate) === null || _f === void 0 ? void 0 : _f.end) !== null && _g !== void 0 ? _g : null,
                                },
                                bookingReschedule: null,
                                reason: reason,
                                personalizedMsgDate: (_j = (_h = findRequest === null || findRequest === void 0 ? void 0 : findRequest.reschedule) === null || _h === void 0 ? void 0 : _h.personalizedMsgDate) !== null && _j !== void 0 ? _j : null,
                            })];
                    case 3:
                        bookingUpdate = _s.sent();
                        return [4, models_1.BookingRescheduleSchema.findByIdAndDelete((_k = findRequest.reschedule) === null || _k === void 0 ? void 0 : _k._id.toString())];
                    case 4:
                        deleteReschedule = _s.sent();
                        if (!(actionBy === "artist")) return [3, 6];
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
                    case 5:
                        _s.sent();
                        return [3, 11];
                    case 6: return [4, models_1.AssignArtistSchema.find({
                            "artists.artist": findRequest.senderUser._id.toString(),
                        }).select("manager -_id")];
                    case 7:
                        findArtistManager = _s.sent();
                        _i = 0, _p = __spreadArray([
                            findRequest.senderUser._id.toString()
                        ], findArtistManager.map(function (item) { return item.manager; }), true);
                        _s.label = 8;
                    case 8:
                        if (!(_i < _p.length)) return [3, 11];
                        index = _p[_i];
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
                    case 9:
                        _s.sent();
                        _s.label = 10;
                    case 10:
                        _i++;
                        return [3, 8];
                    case 11:
                        res.json({
                            success: {
                                message: resultMessage_1.bookingRescheduleMessage.success.accepted,
                            },
                        });
                        return [3, 22];
                    case 12: return [4, models_1.BookingSchema.findByIdAndUpdate((_m = (_l = findRequest.reschedule) === null || _l === void 0 ? void 0 : _l.booking) === null || _m === void 0 ? void 0 : _m.toString(), {
                            bookingReschedule: null,
                            reason: reason,
                        })];
                    case 13:
                        updateBooking = _s.sent();
                        return [4, models_1.RequestSchema.findByIdAndUpdate(requestId, {
                                status: "reject",
                            })];
                    case 14:
                        updateRequest = _s.sent();
                        if (!(actionBy === "artist")) return [3, 16];
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
                    case 15:
                        _s.sent();
                        return [3, 21];
                    case 16: return [4, models_1.AssignArtistSchema.find({
                            "artists.artist": findRequest.senderUser._id.toString(),
                        }).select("manager -_id")];
                    case 17:
                        findArtistManager = _s.sent();
                        _q = 0, _r = __spreadArray([
                            findRequest.senderUser._id.toString()
                        ], findArtistManager.map(function (item) { return item.manager; }), true);
                        _s.label = 18;
                    case 18:
                        if (!(_q < _r.length)) return [3, 21];
                        index = _r[_q];
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
                    case 19:
                        _s.sent();
                        _s.label = 20;
                    case 20:
                        _q++;
                        return [3, 18];
                    case 21:
                        res.json({
                            success: {
                                message: resultMessage_1.bookingRescheduleMessage.success.rejected,
                            },
                        });
                        _s.label = 22;
                    case 22: return [3, 24];
                    case 23:
                        error_2 = _s.sent();
                        next(error_2);
                        return [3, 24];
                    case 24: return [2];
                }
            });
        });
    };
    BookingRescheduleController.prototype.updateBooking = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, rescheduleEndDate, id, update;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, rescheduleEndDate = _a.rescheduleEndDate, id = _a.id;
                        return [4, models_1.BookingRescheduleSchema.findByIdAndUpdate(id, {
                                rescheduleDate: {
                                    end: rescheduleEndDate,
                                },
                            })];
                    case 1:
                        update = _b.sent();
                        res.json({ data: "Update Successfully" });
                        return [2];
                }
            });
        });
    };
    return BookingRescheduleController;
}());
exports.default = BookingRescheduleController;
//# sourceMappingURL=bookingReschedule.controller.js.map