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
var services_1 = require("../services");
var notificationIcon_1 = require("../notificationIcon");
var SupportController = (function () {
    function SupportController() {
    }
    SupportController.prototype.create = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, message, firstName, lastName, phoneNumber, countryCode, email, userId, saveSupport, supportContent, findAdmins, title, description, _i, _b, index, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 7, , 8]);
                        _a = req.body, message = _a.message, firstName = _a.firstName, lastName = _a.lastName, phoneNumber = _a.phoneNumber, countryCode = _a.countryCode, email = _a.email, userId = _a.userId;
                        if (!firstName ||
                            !message ||
                            !lastName ||
                            !phoneNumber ||
                            !countryCode ||
                            !email)
                            throw new http_errors_1.BadRequest(resultMessage_1.supportMessage.error.allField);
                        return [4, models_1.SupportSchema.create({
                                firstName: firstName,
                                lastName: lastName,
                                phoneNumber: phoneNumber,
                                countryCode: countryCode,
                                email: email,
                                message: message,
                                user: userId !== null && userId !== void 0 ? userId : null,
                                timestamp: new Date(),
                            })];
                    case 1:
                        saveSupport = _c.sent();
                        if (!saveSupport)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.supportMessage.error.dataNotAdded);
                        supportContent = new emailContent_1.SupportContent();
                        return [4, models_1.UserSchema.find({ role: "admin" }).select("_id")];
                    case 2:
                        findAdmins = _c.sent();
                        title = supportContent.supportNotification().subject;
                        description = supportContent.supportNotification().text;
                        _i = 0, _b = __spreadArray([], findAdmins.map(function (item) { return item._id; }), true);
                        _c.label = 3;
                    case 3:
                        if (!(_i < _b.length)) return [3, 6];
                        index = _b[_i];
                        return [4, new services_1.NotificationServices().notificationGenerate(index, userId, title, description, notificationIcon_1.newSupportMessageAddIcon, {
                                subject: title,
                                text: description,
                            }, {
                                title: title,
                                body: description,
                                sound: "default",
                            })];
                    case 4:
                        _c.sent();
                        _c.label = 5;
                    case 5:
                        _i++;
                        return [3, 3];
                    case 6:
                        res.json({
                            success: { message: resultMessage_1.supportMessage.success.supportMessageSent },
                        });
                        return [3, 8];
                    case 7:
                        error_1 = _c.sent();
                        next(error_1);
                        return [3, 8];
                    case 8: return [2];
                }
            });
        });
    };
    SupportController.prototype.getAllSupportList = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var supportList, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, models_1.SupportSchema.find().populate({
                                path: "user",
                                select: "-password",
                            })];
                    case 1:
                        supportList = _a.sent();
                        res.json({ success: { data: supportList } });
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
    SupportController.prototype.getOne = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var supportId, support, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        supportId = req.params.supportId;
                        if (!supportId)
                            throw new http_errors_1.BadRequest(resultMessage_1.supportMessage.error.allField);
                        return [4, models_1.SupportSchema.findById(supportId).populate({
                                path: "user",
                                select: "-password -fcmToken -__v",
                            })];
                    case 1:
                        support = _a.sent();
                        if (!support)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.supportMessage.error.dataNotFound);
                        res.json({ success: { data: support } });
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
    SupportController.prototype.delete = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var supportIds, support, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        supportIds = req.body.supportIds;
                        if (!supportIds.length)
                            throw new http_errors_1.BadRequest(resultMessage_1.supportMessage.error.allField);
                        return [4, models_1.SupportSchema.deleteMany({
                                _id: { $in: supportIds },
                            })];
                    case 1:
                        support = _a.sent();
                        if (!support)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.supportMessage.error.dataNotFound);
                        res.json({
                            success: { message: resultMessage_1.supportMessage.success.deleteSuccesses },
                        });
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
    SupportController.prototype.supportEmail = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, _a, message, subject, findUser, emailContent, SendEmail, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        userId = req.params.userId;
                        _a = req.body, message = _a.message, subject = _a.subject;
                        if (!userId || !message)
                            throw new http_errors_1.BadRequest(resultMessage_1.supportMessage.error.allField);
                        return [4, models_1.UserSchema.findById(userId)];
                    case 1:
                        findUser = _b.sent();
                        if (!(findUser === null || findUser === void 0 ? void 0 : findUser.email))
                            throw new http_errors_1.NotAcceptable(resultMessage_1.supportMessage.error.supportEmail);
                        emailContent = new emailContent_1.SupportContent().supportEmailContent(findUser, message, subject);
                        return [4, new services_1.EmailService().emailSend(findUser === null || findUser === void 0 ? void 0 : findUser.email, emailContent.subject, emailContent.text)];
                    case 2:
                        SendEmail = _b.sent();
                        res.json({
                            success: {
                                message: resultMessage_1.supportMessage.success.supportMessageSendToUser,
                                SendEmail: SendEmail,
                            },
                        });
                        return [3, 4];
                    case 3:
                        error_5 = _b.sent();
                        next(error_5);
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    return SupportController;
}());
exports.default = SupportController;
//# sourceMappingURL=support.controller.js.map