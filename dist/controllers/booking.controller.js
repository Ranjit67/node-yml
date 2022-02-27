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
var services_1 = require("../services");
var emailContent_1 = require("../emailContent");
var notificationIcon_1 = require("../notificationIcon");
var BookingPayment = (function () {
    function BookingPayment() {
    }
    BookingPayment.prototype.paymentSuccess = function (artistId, userId, bookingId, paymentData, walletAmount, bankAmount, promoCodeData, promoCodeAmount) {
        return __awaiter(this, void 0, void 0, function () {
            var createPayment, updateInBooking, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, models_1.PaymentSchema.create({
                                booking: bookingId,
                                artist: artistId,
                                user: userId,
                                walletAmount: walletAmount,
                                bankAmount: bankAmount,
                                paymentData: paymentData,
                                promoCode: promoCodeData,
                                promoCodeDisCountAmount: promoCodeAmount,
                                timestamp: new Date(),
                            })];
                    case 1:
                        createPayment = _a.sent();
                        if (!createPayment)
                            throw new http_errors_1.InternalServerError(resultMessage_1.bookingMessage.error.paymentNotCreated);
                        return [4, models_1.BookingSchema.findByIdAndUpdate(bookingId, {
                                payment: createPayment._id,
                            })];
                    case 2:
                        updateInBooking = _a.sent();
                        if (!updateInBooking)
                            throw new http_errors_1.InternalServerError(resultMessage_1.bookingMessage.error.paymentNotUpdated);
                        return [3, 4];
                    case 3:
                        error_1 = _a.sent();
                        throw error_1;
                    case 4: return [2];
                }
            });
        });
    };
    BookingPayment.prototype.onlyPaymentTime = function (bookingId, artistId, userId, walletAmount, bankAmount, promoCodeData, paymentData, promoCodeAmount) {
        return __awaiter(this, void 0, void 0, function () {
            var createPayment, updateInBooking, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, models_1.PaymentSchema.create({
                                booking: bookingId,
                                artist: artistId,
                                user: userId,
                                walletAmount: walletAmount,
                                bankAmount: bankAmount,
                                paymentData: paymentData,
                                promoCode: promoCodeData,
                                promoCodeDisCountAmount: promoCodeAmount,
                                timestamp: new Date(),
                            })];
                    case 1:
                        createPayment = _a.sent();
                        if (!createPayment)
                            throw new http_errors_1.InternalServerError(resultMessage_1.bookingMessage.error.paymentNotCreated);
                        return [4, models_1.BookingSchema.findByIdAndUpdate(bookingId, {
                                payment: createPayment._id,
                                isPayment: true,
                            })];
                    case 2:
                        updateInBooking = _a.sent();
                        if (!updateInBooking)
                            throw new http_errors_1.InternalServerError(resultMessage_1.bookingMessage.error.paymentNotUpdated);
                        return [3, 4];
                    case 3:
                        error_2 = _a.sent();
                        throw error_2;
                    case 4: return [2];
                }
            });
        });
    };
    BookingPayment.prototype.WalletRefund = function (findBooking, walletRefund, walletHistoryTitle, walletHistoryDescription) {
        return __awaiter(this, void 0, void 0, function () {
            var firstWalletUpdate, createWalletHistory, walletCreate, createWalletHistory, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [4, models_1.WalletSchema.updateOne({ user: findBooking.user._id.toString() }, {
                                $inc: {
                                    balance: walletRefund,
                                },
                            })];
                    case 1:
                        firstWalletUpdate = _a.sent();
                        if (!(firstWalletUpdate.matchedCount === 1)) return [3, 3];
                        return [4, models_1.WalletHistorySchema.findOneAndUpdate({ user: findBooking.user._id.toString() }, {
                                $push: {
                                    transactionHistory: {
                                        title: walletHistoryTitle,
                                        type: "Credit",
                                        amount: +walletRefund,
                                        description: walletHistoryDescription,
                                        timestamp: new Date(),
                                    },
                                },
                            })];
                    case 2:
                        createWalletHistory = _a.sent();
                        if (!createWalletHistory)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.bookingMessage.error.walletHistoryNotCreated);
                        return [3, 6];
                    case 3: return [4, models_1.WalletSchema.create({
                            user: findBooking.user_id.toString(),
                            balance: +walletRefund,
                            spent: 0,
                        })];
                    case 4:
                        walletCreate = _a.sent();
                        if (!walletCreate)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.bookingMessage.error.walletNotCreated);
                        return [4, models_1.WalletHistorySchema.create({
                                user: findBooking.user._id.toString(),
                                transactionHistory: [
                                    {
                                        title: walletHistoryTitle,
                                        type: "Credit",
                                        amount: +walletRefund,
                                        description: walletHistoryDescription,
                                        timestamp: new Date(),
                                    },
                                ],
                            })];
                    case 5:
                        createWalletHistory = _a.sent();
                        if (!createWalletHistory)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.bookingMessage.error.walletHistoryNotCreated);
                        _a.label = 6;
                    case 6: return [3, 8];
                    case 7:
                        error_3 = _a.sent();
                        throw error_3;
                    case 8: return [2];
                }
            });
        });
    };
    BookingPayment.prototype.bookingCancelNotificationByUser = function (findBooking) {
        return __awaiter(this, void 0, void 0, function () {
            var findArtistManager, bookingContent, _i, _a, index, title, description, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        return [4, models_1.AssignArtistSchema.find({
                                "artists.artist": findBooking.artist._id.toString(),
                            }).select("manager -_id")];
                    case 1:
                        findArtistManager = _b.sent();
                        bookingContent = new emailContent_1.BookingContent();
                        _i = 0, _a = __spreadArray([
                            findBooking.artist._id.toString()
                        ], findArtistManager.map(function (item) { return item.manager; }), true);
                        _b.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3, 5];
                        index = _a[_i];
                        title = bookingContent.bookingCancelByUser(findBooking.artist).subject;
                        description = bookingContent.bookingCancelByUser(findBooking.artist).text;
                        return [4, new services_1.NotificationServices().notificationGenerate(index, findBooking.user._id.toString(), title, description, notificationIcon_1.bookingCancelByUserIcon, {
                                subject: title,
                                text: description,
                            }, {
                                title: title,
                                body: description,
                                sound: "default",
                            })];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3, 2];
                    case 5: return [3, 7];
                    case 6:
                        error_4 = _b.sent();
                        throw error_4;
                    case 7: return [2];
                }
            });
        });
    };
    BookingPayment.prototype.bookingCancelNotificationByArtist = function (findBooking) {
        return __awaiter(this, void 0, void 0, function () {
            var findArtistManager, bookingContent, _i, _a, index, title, description, bookingNotificationIcon, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        return [4, models_1.AssignArtistSchema.find({
                                "artists.artist": findBooking.artist._id.toString(),
                            }).select("manager -_id")];
                    case 1:
                        findArtistManager = _b.sent();
                        bookingContent = new emailContent_1.BookingContent();
                        _i = 0, _a = __spreadArray([
                            findBooking.user._id.toString(),
                            findBooking.artist._id.toString()
                        ], findArtistManager.map(function (item) { return item.manager; }), true);
                        _b.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3, 5];
                        index = _a[_i];
                        title = index === findBooking.artist._id.toString()
                            ? bookingContent.bookingCancelByArtistSelf(findBooking.artist)
                                .subject
                            : bookingContent.bookingCancelArtist(findBooking.user).subject;
                        description = index === findBooking.artist._id.toString()
                            ? bookingContent.bookingCancelByArtistSelf(findBooking.artist).text
                            : bookingContent.bookingCancelArtist(findBooking.user).text;
                        bookingNotificationIcon = index === findBooking.artist._id.toString()
                            ? notificationIcon_1.bookingCancelByArtistIcon
                            : index === findBooking.artist._id.toString()
                                ? notificationIcon_1.bookingCancelByArtistIcon
                                : notificationIcon_1.bookingCancelByArtistIcon;
                        return [4, new services_1.NotificationServices().notificationGenerate(index, findBooking.artist._id.toString(), title, description, bookingNotificationIcon, {
                                subject: title,
                                text: description,
                            }, {
                                title: title,
                                body: description,
                                sound: "default",
                            })];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3, 2];
                    case 5: return [3, 7];
                    case 6:
                        error_5 = _b.sent();
                        throw error_5;
                    case 7: return [2];
                }
            });
        });
    };
    return BookingPayment;
}());
var BookingController = (function (_super) {
    __extends(BookingController, _super);
    function BookingController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BookingController.prototype.create = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, eventStartDate, eventEndDate, crowdSize, serviceId, bookingPrice, artistId, userId, personalizedMessage, eventDuration, OtherDetails, eventId, personalizedMsgDate, requestDetails, bankAmount, walletAmount, promoCodeAmount, promoCodeId, paymentStatus, paymentData, eventTime, address, lat, lng, country, promoCodeData, createBooking, requestCreate, findArtistManager, bookingContent, _i, _b, index, title, description, bookingNotificationIcon, findArtistManager, bookingContent, _c, _d, index, title, description, bookingNotificationIcon, error_6;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 17, , 18]);
                        _a = req.body, eventStartDate = _a.eventStartDate, eventEndDate = _a.eventEndDate, crowdSize = _a.crowdSize, serviceId = _a.serviceId, bookingPrice = _a.bookingPrice, artistId = _a.artistId, userId = _a.userId, personalizedMessage = _a.personalizedMessage, eventDuration = _a.eventDuration, OtherDetails = _a.OtherDetails, eventId = _a.eventId, personalizedMsgDate = _a.personalizedMsgDate, requestDetails = _a.requestDetails, bankAmount = _a.bankAmount, walletAmount = _a.walletAmount, promoCodeAmount = _a.promoCodeAmount, promoCodeId = _a.promoCodeId, paymentStatus = _a.paymentStatus, paymentData = _a.paymentData, eventTime = _a.eventTime, address = _a.address, lat = _a.lat, lng = _a.lng, country = _a.country;
                        promoCodeData = void 0;
                        if (!promoCodeId) return [3, 2];
                        return [4, models_1.PromoCodeSchema.findOne({ _id: promoCodeId })];
                    case 1:
                        promoCodeData = _e.sent();
                        _e.label = 2;
                    case 2: return [4, models_1.BookingSchema.create({
                            eventDate: {
                                start: eventStartDate !== null && eventStartDate !== void 0 ? eventStartDate : null,
                                end: eventEndDate !== null && eventEndDate !== void 0 ? eventEndDate : null,
                            },
                            eventLocation: address,
                            location: {
                                lat: lat ? +lat : 0,
                                lng: lng ? +lng : 0,
                                country: country !== null && country !== void 0 ? country : "",
                            },
                            crowdSize: crowdSize,
                            serviceType: serviceId,
                            bookingPrice: bookingPrice,
                            status: "pending",
                            artist: artistId,
                            user: userId,
                            personalizedMessage: personalizedMessage,
                            eventDuration: eventDuration ? parseInt(eventDuration) : 0,
                            OtherDetails: OtherDetails,
                            eventType: eventId,
                            personalizedMsgDate: personalizedMsgDate,
                            timestamp: new Date(),
                            eventTime: eventTime,
                            bookingType: personalizedMessage ? "personalizedMessage" : "other",
                            isPayment: paymentStatus === "success" ? true : false,
                        })];
                    case 3:
                        createBooking = _e.sent();
                        if (!createBooking)
                            throw new http_errors_1.InternalServerError(resultMessage_1.bookingMessage.error.notCreated);
                        return [4, models_1.RequestSchema.create({
                                requestType: paymentStatus === "success"
                                    ? "payment"
                                    : personalizedMessage
                                        ? "personalize"
                                        : "pricing",
                                receiverUser: artistId,
                                senderUser: userId,
                                details: requestDetails,
                                timestamp: new Date(),
                                booking: createBooking._id,
                            })];
                    case 4:
                        requestCreate = _e.sent();
                        if (!requestCreate)
                            throw new http_errors_1.InternalServerError(resultMessage_1.bookingMessage.error.requestNotCreated);
                        if (!(paymentStatus !== "success")) return [3, 10];
                        return [4, models_1.AssignArtistSchema.find({
                                "artists.artist": artistId,
                            }).select("manager -_id")];
                    case 5:
                        findArtistManager = _e.sent();
                        bookingContent = new emailContent_1.BookingContent();
                        _i = 0, _b = __spreadArray([
                            userId,
                            artistId
                        ], findArtistManager.map(function (item) { return item.manager; }), true);
                        _e.label = 6;
                    case 6:
                        if (!(_i < _b.length)) return [3, 9];
                        index = _b[_i];
                        title = index === userId
                            ? bookingContent.bookingRequestSubmit().subject
                            : bookingContent.bookingRequestReceivedByArtist().subject;
                        description = index === userId
                            ? bookingContent.bookingRequestSubmit().text
                            : bookingContent.bookingRequestReceivedByArtist().text;
                        bookingNotificationIcon = index === userId
                            ? notificationIcon_1.newBookingUser
                            : index === artistId
                                ? notificationIcon_1.bookingRequestIcon
                                : notificationIcon_1.bookingRequestIcon;
                        return [4, new services_1.NotificationServices().notificationGenerate(index, userId, title, description, bookingNotificationIcon, {
                                subject: title,
                                text: description,
                            }, {
                                title: title,
                                body: description,
                                sound: "default",
                            })];
                    case 7:
                        _e.sent();
                        _e.label = 8;
                    case 8:
                        _i++;
                        return [3, 6];
                    case 9: return [3, 16];
                    case 10: return [4, _super.prototype.paymentSuccess.call(this, artistId, userId, createBooking._id, paymentData, walletAmount, bankAmount, promoCodeData, promoCodeAmount)];
                    case 11:
                        _e.sent();
                        return [4, models_1.AssignArtistSchema.find({
                                "artists.artist": artistId,
                            }).select("manager -_id")];
                    case 12:
                        findArtistManager = _e.sent();
                        bookingContent = new emailContent_1.BookingContent();
                        _c = 0, _d = __spreadArray([
                            userId,
                            artistId
                        ], findArtistManager.map(function (item) { return item.manager; }), true);
                        _e.label = 13;
                    case 13:
                        if (!(_c < _d.length)) return [3, 16];
                        index = _d[_c];
                        title = index === userId
                            ? bookingContent.newBookingUser().subject
                            : bookingContent.newBookingArtist().subject;
                        description = index === userId
                            ? bookingContent.newBookingUser().text
                            : bookingContent.newBookingArtist().text;
                        bookingNotificationIcon = index === userId
                            ? notificationIcon_1.newBookingUser
                            : index === artistId
                                ? notificationIcon_1.newBookingArtist
                                : notificationIcon_1.newBookingManager;
                        return [4, new services_1.NotificationServices().notificationGenerate(index, userId, title, description, bookingNotificationIcon, {
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
                                message: paymentStatus === "success"
                                    ? resultMessage_1.bookingMessage.success.bookingCreatedSuccess
                                    : resultMessage_1.bookingMessage.success.bookingCreatedForPaymentSuccess,
                            },
                        });
                        return [3, 18];
                    case 17:
                        error_6 = _e.sent();
                        next(error_6);
                        return [3, 18];
                    case 18: return [2];
                }
            });
        });
    };
    BookingController.prototype.getAllBookingArtist = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var artistId, bookingListArtist, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        artistId = req.params.artistId;
                        return [4, models_1.BookingSchema.find({
                                artist: artistId,
                                isDeletesId: { $ne: artistId },
                            })
                                .populate("user")
                                .populate("eventType")
                                .populate("serviceType")
                                .populate("payment")
                                .populate({
                                path: "personalizedVideo",
                                select: "-__v -booking -artist -user -booking -videoFile ",
                            })];
                    case 1:
                        bookingListArtist = _a.sent();
                        res.json({
                            success: {
                                message: resultMessage_1.bookingMessage.success.artistBookingList,
                                data: bookingListArtist,
                            },
                        });
                        return [3, 3];
                    case 2:
                        error_7 = _a.sent();
                        next(error_7);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    BookingController.prototype.getAllBookingUser = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, bookingListUser, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = req.params.userId;
                        return [4, models_1.BookingSchema.find({
                                user: userId,
                                isDeletesId: { $ne: userId },
                            })
                                .populate({
                                path: "artist",
                                populate: [
                                    {
                                        path: "category",
                                        model: "Category",
                                    },
                                    {
                                        path: "subcategories",
                                        model: "SubCategory",
                                    },
                                    {
                                        path: "genres",
                                        model: "Genres",
                                    },
                                    {
                                        path: "languages",
                                        model: "Language",
                                    },
                                    {
                                        path: "events",
                                        model: "Event",
                                    },
                                ],
                            })
                                .populate("eventType")
                                .populate("serviceType")
                                .populate("bookingReschedule")
                                .populate("payment")
                                .populate({
                                path: "personalizedVideo",
                                select: "-__v -booking -artist -user -booking -videoFile ",
                            })];
                    case 1:
                        bookingListUser = _a.sent();
                        res.json({
                            success: {
                                message: resultMessage_1.bookingMessage.success.userBookingList,
                                data: bookingListUser,
                            },
                        });
                        return [3, 3];
                    case 2:
                        error_8 = _a.sent();
                        next(error_8);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    BookingController.prototype.bookingPayment = function (req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, bookingId, paymentAmount, requestDetails, bankAmount, walletAmount, promoCodeId, promoCodeAmount, paymentData, findBooking, promoCodeData, requestCreate, findArtistManager, bookingContent, _i, _d, index, title, description, bookingNotificationIcon, error_9;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 11, , 12]);
                        _c = req.body, bookingId = _c.bookingId, paymentAmount = _c.paymentAmount, requestDetails = _c.requestDetails, bankAmount = _c.bankAmount, walletAmount = _c.walletAmount, promoCodeId = _c.promoCodeId, promoCodeAmount = _c.promoCodeAmount, paymentData = _c.paymentData;
                        return [4, models_1.BookingSchema.findById(bookingId)
                                .populate({
                                path: "user",
                            })
                                .populate({
                                path: "artist",
                            })];
                    case 1:
                        findBooking = _e.sent();
                        promoCodeData = void 0;
                        if (!promoCodeId) return [3, 3];
                        return [4, models_1.PromoCodeSchema.findById(promoCodeId)];
                    case 2:
                        promoCodeData = _e.sent();
                        _e.label = 3;
                    case 3:
                        if ((findBooking === null || findBooking === void 0 ? void 0 : findBooking.bookingPrice) !== +paymentAmount)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.bookingMessage.error.bookingPriceNotAccept);
                        return [4, _super.prototype.onlyPaymentTime.call(this, bookingId, findBooking.artist, findBooking.user, walletAmount, bankAmount, promoCodeData, paymentData, promoCodeAmount)];
                    case 4:
                        _e.sent();
                        return [4, models_1.RequestSchema.create({
                                requestType: "payment",
                                senderUser: (_a = findBooking.user) === null || _a === void 0 ? void 0 : _a._id.toString(),
                                receiverUser: (_b = findBooking.artist) === null || _b === void 0 ? void 0 : _b._id.toString(),
                                booking: findBooking._id,
                                details: requestDetails,
                                timestamp: new Date(),
                            })];
                    case 5:
                        requestCreate = _e.sent();
                        if (!requestCreate)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.bookingMessage.error.bookingRequest);
                        return [4, models_1.AssignArtistSchema.find({
                                "artists.artist": findBooking.artist._id.toString(),
                            }).select("manager -_id")];
                    case 6:
                        findArtistManager = _e.sent();
                        bookingContent = new emailContent_1.BookingContent();
                        _i = 0, _d = __spreadArray([
                            findBooking.user._id.toString(),
                            findBooking.artist._id.toString()
                        ], findArtistManager.map(function (item) { return item.manager; }), true);
                        _e.label = 7;
                    case 7:
                        if (!(_i < _d.length)) return [3, 10];
                        index = _d[_i];
                        title = index === findBooking.user._id.toString()
                            ? bookingContent.newBookingUser().subject
                            : bookingContent.newBookingArtist().subject;
                        description = index === findBooking.user._id.toString()
                            ? bookingContent.newBookingUser().text
                            : bookingContent.newBookingArtist().text;
                        bookingNotificationIcon = index === findBooking.user._id.toString()
                            ? notificationIcon_1.newBookingUser
                            : notificationIcon_1.newBookingArtist;
                        return [4, new services_1.NotificationServices().notificationGenerate(index, findBooking.user._id.toString(), title, description, bookingNotificationIcon, {
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
                                message: resultMessage_1.bookingMessage.success.bookingConfirm,
                            },
                        });
                        return [3, 12];
                    case 11:
                        error_9 = _e.sent();
                        next(error_9);
                        return [3, 12];
                    case 12: return [2];
                }
            });
        });
    };
    BookingController.prototype.bookingPastConfirmation = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, bookingId, isComplete, updateBooking, bookingContent, findBooking, superAdmin, _i, _b, index, title, description, title, description, error_10;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 11, , 12]);
                        _a = req.body, bookingId = _a.bookingId, isComplete = _a.isComplete;
                        return [4, models_1.BookingSchema.findByIdAndUpdate(bookingId, {
                                isComplete: Boolean(isComplete),
                                status: "past",
                            })];
                    case 1:
                        updateBooking = _c.sent();
                        if (!updateBooking)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.bookingMessage.error.bookingComplete);
                        bookingContent = new emailContent_1.BookingContent();
                        return [4, models_1.BookingSchema.findById(bookingId)
                                .populate("user")
                                .populate("artist")];
                    case 2:
                        findBooking = _c.sent();
                        if (!!isComplete) return [3, 8];
                        return [4, models_1.UserSchema.find({ role: "admin" })];
                    case 3:
                        superAdmin = _c.sent();
                        _i = 0, _b = __spreadArray([
                            findBooking.artist._id.toString()
                        ], superAdmin.map(function (item) { return item._id; }), true);
                        _c.label = 4;
                    case 4:
                        if (!(_i < _b.length)) return [3, 7];
                        index = _b[_i];
                        title = index === findBooking.artist._id.toString()
                            ? bookingContent.customerCancelPastEventArtist(findBooking.artist)
                                .subject
                            : bookingContent.customerCancelPastEventSuperAdmin().subject;
                        description = index === findBooking.artist._id.toString()
                            ? bookingContent.customerCancelPastEventArtist(findBooking.artist)
                                .subject
                            : bookingContent.customerCancelPastEventSuperAdmin().subject;
                        return [4, new services_1.NotificationServices().notificationGenerate(index, findBooking.user._id.toString(), title, description, notificationIcon_1.pastBookingCancelIcon, {
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
                    case 6:
                        _i++;
                        return [3, 4];
                    case 7: return [3, 10];
                    case 8:
                        title = bookingContent.customerConfirmPastEventArtist(findBooking.artist).subject;
                        description = bookingContent.customerConfirmPastEventArtist(findBooking.artist).text;
                        return [4, new services_1.NotificationServices().notificationGenerate(findBooking.artist._id.toString(), findBooking.user._id.toString(), title, description, notificationIcon_1.pastBookingConfirmIcon, {
                                subject: title,
                                text: description,
                            }, {
                                title: title,
                                body: description,
                                sound: "default",
                            })];
                    case 9:
                        _c.sent();
                        _c.label = 10;
                    case 10:
                        res.json({
                            success: {
                                message: resultMessage_1.bookingMessage.success.bookingComplete,
                            },
                        });
                        return [3, 12];
                    case 11:
                        error_10 = _c.sent();
                        next(error_10);
                        return [3, 12];
                    case 12: return [2];
                }
            });
        });
    };
    BookingController.prototype.bookingCancel = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, bookingId, walletRefund, bankRefund, cancelBy, walletHistoryTitle, walletHistoryDescription, OtherDetails, findBooking, updateRequest, updateBookingStatus, updatePaymentStatus, error_11;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 11, , 12]);
                        _a = req.body, bookingId = _a.bookingId, walletRefund = _a.walletRefund, bankRefund = _a.bankRefund, cancelBy = _a.cancelBy, walletHistoryTitle = _a.walletHistoryTitle, walletHistoryDescription = _a.walletHistoryDescription, OtherDetails = _a.OtherDetails;
                        return [4, models_1.BookingSchema.findById(bookingId)
                                .populate("artist")
                                .populate("user")];
                    case 1:
                        findBooking = _b.sent();
                        if (!findBooking)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.bookingMessage.error.noBookingFound);
                        return [4, models_1.RequestSchema.updateOne({ booking: bookingId, status: "pending" }, {
                                isCancel: true,
                            })];
                    case 2:
                        updateRequest = _b.sent();
                        return [4, models_1.BookingSchema.findByIdAndUpdate(bookingId, {
                                status: "cancel",
                                cancelBy: cancelBy,
                                cancelDate: new Date(),
                                OtherDetails: OtherDetails,
                            })];
                    case 3:
                        updateBookingStatus = _b.sent();
                        if (!updateBookingStatus)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.bookingMessage.error.bookingNotUpdated);
                        if (!(findBooking === null || findBooking === void 0 ? void 0 : findBooking.payment))
                            throw new http_errors_1.NotAcceptable(resultMessage_1.bookingMessage.error.noBookingFound);
                        return [4, models_1.PaymentSchema.findByIdAndUpdate(findBooking === null || findBooking === void 0 ? void 0 : findBooking.payment.toString(), {
                                bankRefundAmount: bankRefund !== null && bankRefund !== void 0 ? bankRefund : 0,
                                walletRefundAmount: walletRefund !== null && walletRefund !== void 0 ? walletRefund : 0,
                                walletRefund: true,
                                bankRefund: bankRefund ? false : true,
                                cancelDate: new Date(),
                            })];
                    case 4:
                        updatePaymentStatus = _b.sent();
                        if (!updatePaymentStatus)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.bookingMessage.error.oldData);
                        if (!walletRefund) return [3, 6];
                        return [4, _super.prototype.WalletRefund.call(this, findBooking, +walletRefund, walletHistoryTitle, walletHistoryDescription)];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6:
                        if (!(cancelBy === "user")) return [3, 8];
                        return [4, _super.prototype.bookingCancelNotificationByUser.call(this, findBooking)];
                    case 7:
                        _b.sent();
                        return [3, 10];
                    case 8: return [4, _super.prototype.bookingCancelNotificationByArtist.call(this, findBooking)];
                    case 9:
                        _b.sent();
                        _b.label = 10;
                    case 10:
                        res.json({
                            success: {
                                message: bankRefund
                                    ? resultMessage_1.bookingMessage.success.bookingCancel
                                    : resultMessage_1.bookingMessage.success.bookingCancelWallet,
                            },
                        });
                        return [3, 12];
                    case 11:
                        error_11 = _b.sent();
                        next(error_11);
                        return [3, 12];
                    case 12: return [2];
                }
            });
        });
    };
    BookingController.prototype.getAllBooking = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var allBooking, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, models_1.BookingSchema.find({}).populate("artist user eventType serviceType")];
                    case 1:
                        allBooking = _a.sent();
                        res.json({
                            success: {
                                data: allBooking,
                            },
                        });
                        return [3, 3];
                    case 2:
                        error_12 = _a.sent();
                        next(error_12);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    BookingController.prototype.bookingTest = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, date, update, error_13;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, id = _a.id, date = _a.date;
                        return [4, models_1.BookingSchema.findByIdAndUpdate(id, {
                                timestamp: date,
                            })];
                    case 1:
                        update = _b.sent();
                        res.json({
                            success: {
                                data: update,
                            },
                        });
                        return [3, 3];
                    case 2:
                        error_13 = _b.sent();
                        next(error_13);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    BookingController.prototype.removeBooking = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, userId, bookingsIds, updateBookings, error_14;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, userId = _a.userId, bookingsIds = _a.bookingsIds;
                        if (!userId || !Array.isArray(bookingsIds))
                            throw new http_errors_1.BadRequest(resultMessage_1.bookingMessage.error.allField);
                        return [4, models_1.BookingSchema.updateMany({ _id: { $in: bookingsIds } }, {
                                $addToSet: {
                                    isDeletesId: userId,
                                },
                            })];
                    case 1:
                        updateBookings = _b.sent();
                        if (!updateBookings.modifiedCount)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.bookingMessage.error.noBookingFound);
                        if (updateBookings.modifiedCount !== bookingsIds.length)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.bookingMessage.error.allBooking);
                        res.json({
                            success: {
                                message: resultMessage_1.bookingMessage.success.removeBooking,
                            },
                        });
                        return [3, 3];
                    case 2:
                        error_14 = _b.sent();
                        next(error_14);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    BookingController.prototype.bookingDetails = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var bookingId, bookingDetails, error_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        bookingId = req.params.bookingId;
                        return [4, models_1.BookingSchema.findById(bookingId)
                                .populate({
                                path: "artist",
                                populate: [
                                    {
                                        path: "category",
                                        model: "Category",
                                    },
                                    {
                                        path: "subcategories",
                                        model: "SubCategory",
                                    },
                                    {
                                        path: "genres",
                                        model: "Genres",
                                    },
                                    {
                                        path: "languages",
                                        model: "Language",
                                    },
                                    {
                                        path: "events",
                                        model: "Event",
                                    },
                                ],
                                select: "-password -fcmToken",
                            })
                                .populate("eventType")
                                .populate("serviceType")
                                .populate("bookingReschedule")
                                .populate({ path: "user", select: "-password -fcmToken" })
                                .populate("orderId")
                                .populate({
                                path: "personalizedVideo",
                                select: "-__v -booking -artist -user -booking -videoFile ",
                            })];
                    case 1:
                        bookingDetails = _a.sent();
                        res.json({
                            success: {
                                data: bookingDetails,
                            },
                        });
                        return [3, 3];
                    case 2:
                        error_15 = _a.sent();
                        next(error_15);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    BookingController.prototype.bookingFail = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, bookingId, paymentId, newPaymentId, orderId, paymentStatus, updateBookingData, updateOrderData, error_16;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        _a = req.body, bookingId = _a.bookingId, paymentId = _a.paymentId, newPaymentId = _a.newPaymentId, orderId = _a.orderId, paymentStatus = _a.paymentStatus;
                        if (!orderId)
                            throw new http_errors_1.BadRequest("All field are require.");
                        return [4, models_1.BookingSchema.findOneAndUpdate({ _id: bookingId, orderId: { $exists: false } }, {
                                paymentId: paymentId,
                                paymentStatus: paymentStatus !== null && paymentStatus !== void 0 ? paymentStatus : "fail",
                                orderId: orderId,
                            })];
                    case 1:
                        updateBookingData = _b.sent();
                        if (!!updateBookingData) return [3, 3];
                        return [4, models_1.BookingSchema.findOneAndUpdate({ orderId: orderId, paymentId: paymentId }, {
                                paymentStatus: paymentStatus !== null && paymentStatus !== void 0 ? paymentStatus : "fail",
                                paymentId: newPaymentId,
                            })];
                    case 2:
                        updateOrderData = _b.sent();
                        if (!updateOrderData)
                            throw new http_errors_1.BadRequest(resultMessage_1.bookingMessage.error.bookingTokenFail);
                        res.json({
                            success: {
                                message: resultMessage_1.bookingMessage.success.paymentFailed,
                            },
                        });
                        return [3, 4];
                    case 3:
                        res.json({
                            success: {
                                message: resultMessage_1.bookingMessage.success.paymentFailed,
                            },
                        });
                        _b.label = 4;
                    case 4: return [3, 6];
                    case 5:
                        error_16 = _b.sent();
                        next(error_16);
                        return [3, 6];
                    case 6: return [2];
                }
            });
        });
    };
    BookingController.prototype.bookingPaymentConfirm = function (req, res, next) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function () {
            var _g, bookingId, orderId, paymentId, newPaymentId, requestDetails, bankAmount, walletAmount, promoCodeAmount, promoCodeId, promoCodeData, findBooking, updateBookingData, requestCreate, findArtistManager, bookingContent, _i, _h, index, title, description, bookingNotificationIcon, findBookingFirst, updateBookingData, requestCreate, findArtistManager, bookingContent, _j, _k, index, title, description, bookingNotificationIcon, error_17;
            return __generator(this, function (_l) {
                switch (_l.label) {
                    case 0:
                        _l.trys.push([0, 20, , 21]);
                        _g = req.body, bookingId = _g.bookingId, orderId = _g.orderId, paymentId = _g.paymentId, newPaymentId = _g.newPaymentId, requestDetails = _g.requestDetails, bankAmount = _g.bankAmount, walletAmount = _g.walletAmount, promoCodeAmount = _g.promoCodeAmount, promoCodeId = _g.promoCodeId;
                        promoCodeData = void 0;
                        if (!promoCodeId) return [3, 2];
                        return [4, models_1.PromoCodeSchema.findById(promoCodeId)];
                    case 1:
                        promoCodeData = _l.sent();
                        _l.label = 2;
                    case 2:
                        if (!paymentId) return [3, 11];
                        return [4, models_1.BookingSchema.findOne({ paymentId: paymentId })];
                    case 3:
                        findBooking = _l.sent();
                        if ((findBooking === null || findBooking === void 0 ? void 0 : findBooking.paymentStatus) !== "fail")
                            throw new http_errors_1.BadRequest(resultMessage_1.bookingMessage.error.bookingTokenFail);
                        return [4, models_1.BookingSchema.findOneAndUpdate({ paymentId: paymentId }, {
                                paymentId: newPaymentId,
                                paymentStatus: "success",
                                isPayment: true,
                                promoCodeData: promoCodeData !== null && promoCodeData !== void 0 ? promoCodeData : {},
                                bankAmount: (_a = +bankAmount) !== null && _a !== void 0 ? _a : findBooking.bookingPrice,
                                walletAmount: (_b = +walletAmount) !== null && _b !== void 0 ? _b : 0,
                                promoCodeAmount: (_c = +promoCodeAmount) !== null && _c !== void 0 ? _c : 0,
                            })];
                    case 4:
                        updateBookingData = _l.sent();
                        if (!updateBookingData)
                            throw new http_errors_1.GatewayTimeout(resultMessage_1.bookingMessage.error.somethingWrong);
                        return [4, models_1.RequestSchema.create({
                                requestType: "payment",
                                senderUser: findBooking.user,
                                receiverUser: findBooking.artist,
                                booking: findBooking._id,
                                details: requestDetails,
                                timestamp: new Date(),
                            })];
                    case 5:
                        requestCreate = _l.sent();
                        if (!requestCreate)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.bookingMessage.error.bookingRequest);
                        return [4, models_1.AssignArtistSchema.find({
                                "artists.artist": findBooking === null || findBooking === void 0 ? void 0 : findBooking.artist,
                            }).select("manager -_id")];
                    case 6:
                        findArtistManager = _l.sent();
                        bookingContent = new emailContent_1.BookingContent();
                        _i = 0, _h = __spreadArray([
                            findBooking === null || findBooking === void 0 ? void 0 : findBooking.user,
                            findBooking === null || findBooking === void 0 ? void 0 : findBooking.artist
                        ], findArtistManager.map(function (item) { return item.manager; }), true);
                        _l.label = 7;
                    case 7:
                        if (!(_i < _h.length)) return [3, 10];
                        index = _h[_i];
                        title = index === (findBooking === null || findBooking === void 0 ? void 0 : findBooking.user)
                            ? bookingContent.newBookingUser().subject
                            : bookingContent.newBookingArtist().subject;
                        description = index === (findBooking === null || findBooking === void 0 ? void 0 : findBooking.user)
                            ? bookingContent.newBookingUser().text
                            : bookingContent.newBookingArtist().text;
                        bookingNotificationIcon = index === (findBooking === null || findBooking === void 0 ? void 0 : findBooking.user) ? notificationIcon_1.newBookingUser : notificationIcon_1.newBookingArtist;
                        return [4, new services_1.NotificationServices().notificationGenerate(index, findBooking === null || findBooking === void 0 ? void 0 : findBooking.user, title, description, bookingNotificationIcon, {
                                subject: title,
                                text: description,
                            }, {
                                title: title,
                                body: description,
                                sound: "default",
                            })];
                    case 8:
                        _l.sent();
                        _l.label = 9;
                    case 9:
                        _i++;
                        return [3, 7];
                    case 10: return [3, 19];
                    case 11: return [4, models_1.BookingSchema.findOne({
                            _id: bookingId,
                        })];
                    case 12:
                        findBookingFirst = _l.sent();
                        if (findBookingFirst === null || findBookingFirst === void 0 ? void 0 : findBookingFirst.orderId)
                            throw new http_errors_1.BadRequest(resultMessage_1.bookingMessage.error.bookingTokenFail);
                        return [4, models_1.BookingSchema.findOneAndUpdate({ _id: bookingId }, {
                                orderId: orderId,
                                paymentStatus: "success",
                                isPayment: true,
                                promoCodeData: promoCodeData !== null && promoCodeData !== void 0 ? promoCodeData : {},
                                bankAmount: (_d = +bankAmount) !== null && _d !== void 0 ? _d : findBookingFirst === null || findBookingFirst === void 0 ? void 0 : findBookingFirst.bookingPrice,
                                walletAmount: (_e = +walletAmount) !== null && _e !== void 0 ? _e : 0,
                                promoCodeAmount: (_f = +promoCodeAmount) !== null && _f !== void 0 ? _f : 0,
                            })];
                    case 13:
                        updateBookingData = _l.sent();
                        if (!updateBookingData)
                            throw new http_errors_1.GatewayTimeout(resultMessage_1.bookingMessage.error.somethingWrong);
                        return [4, models_1.RequestSchema.create({
                                requestType: "payment",
                                senderUser: findBookingFirst.user,
                                receiverUser: findBookingFirst.artist,
                                booking: findBookingFirst._id,
                                details: requestDetails,
                                timestamp: new Date(),
                            })];
                    case 14:
                        requestCreate = _l.sent();
                        if (!requestCreate)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.bookingMessage.error.bookingRequest);
                        return [4, models_1.AssignArtistSchema.find({
                                "artists.artist": findBookingFirst === null || findBookingFirst === void 0 ? void 0 : findBookingFirst.artist,
                            }).select("manager -_id")];
                    case 15:
                        findArtistManager = _l.sent();
                        bookingContent = new emailContent_1.BookingContent();
                        _j = 0, _k = __spreadArray([
                            findBookingFirst === null || findBookingFirst === void 0 ? void 0 : findBookingFirst.user,
                            findBookingFirst === null || findBookingFirst === void 0 ? void 0 : findBookingFirst.artist
                        ], findArtistManager.map(function (item) { return item.manager; }), true);
                        _l.label = 16;
                    case 16:
                        if (!(_j < _k.length)) return [3, 19];
                        index = _k[_j];
                        title = index === (findBookingFirst === null || findBookingFirst === void 0 ? void 0 : findBookingFirst.user)
                            ? bookingContent.newBookingUser().subject
                            : bookingContent.newBookingArtist().subject;
                        description = index === (findBookingFirst === null || findBookingFirst === void 0 ? void 0 : findBookingFirst.user)
                            ? bookingContent.newBookingUser().text
                            : bookingContent.newBookingArtist().text;
                        bookingNotificationIcon = index === (findBookingFirst === null || findBookingFirst === void 0 ? void 0 : findBookingFirst.user)
                            ? notificationIcon_1.newBookingUser
                            : notificationIcon_1.newBookingArtist;
                        return [4, new services_1.NotificationServices().notificationGenerate(index, findBookingFirst === null || findBookingFirst === void 0 ? void 0 : findBookingFirst.user, title, description, bookingNotificationIcon, {
                                subject: title,
                                text: description,
                            }, {
                                title: title,
                                body: description,
                                sound: "default",
                            })];
                    case 17:
                        _l.sent();
                        _l.label = 18;
                    case 18:
                        _j++;
                        return [3, 16];
                    case 19:
                        res.json({
                            success: {
                                message: resultMessage_1.bookingMessage.success.paymentSuccess,
                            },
                        });
                        return [3, 21];
                    case 20:
                        error_17 = _l.sent();
                        next(error_17);
                        return [3, 21];
                    case 21: return [2];
                }
            });
        });
    };
    return BookingController;
}(BookingPayment));
exports.default = BookingController;
//# sourceMappingURL=booking.controller.js.map