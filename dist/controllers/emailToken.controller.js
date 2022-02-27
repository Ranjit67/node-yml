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
var models_1 = require("../models");
var http_errors_1 = require("http-errors");
var services_1 = require("../services");
var emailContent_1 = require("../emailContent");
var notificationIcon_1 = require("../notificationIcon");
var resultMessage_1 = require("../resultMessage");
var EmailTokenController = (function () {
    function EmailTokenController() {
        this.jwtServices = new services_1.JwtService();
    }
    EmailTokenController.prototype.getAll = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var emailTokensList, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, models_1.EmailToken.find()];
                    case 1:
                        emailTokensList = _a.sent();
                        res.json({
                            data: emailTokensList,
                        });
                        return [3, 3];
                    case 2:
                        error_1 = _a.sent();
                        next(error_1);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    EmailTokenController.prototype.emailVerify = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, token, password, data, userId, findUser, currentDate, creationTimeInterval, findUserToken, currentTime, creationTimeInterval, hashedPassword, deleteData, updatePassword, updatePassword, findAdmins, userContent, title, description, icon, _i, _c, index, error_2;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 16, , 17]);
                        _b = req.body, token = _b.token, password = _b.password;
                        if (!token || !password)
                            throw new http_errors_1.BadRequest(resultMessage_1.emailTokenMessage.error.allField);
                        if (password.length < 4)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.emailTokenMessage.error.password);
                        data = new services_1.JwtService().emailTokenVerify(token);
                        userId = (_a = data === null || data === void 0 ? void 0 : data.aud) === null || _a === void 0 ? void 0 : _a[0];
                        if (!userId)
                            throw new http_errors_1.NotFound(resultMessage_1.emailTokenMessage.error.userNotFound);
                        return [4, models_1.UserSchema.findById(userId)];
                    case 1:
                        findUser = _d.sent();
                        if (!!(findUser === null || findUser === void 0 ? void 0 : findUser.password)) return [3, 2];
                        currentDate = new Date().getTime();
                        creationTimeInterval = currentDate - new Date(findUser.timestamp).getTime();
                        if (creationTimeInterval >= 60000 * 15)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.emailTokenMessage.error.emailTokenExpired);
                        return [3, 4];
                    case 2: return [4, models_1.EmailToken.findOne({
                            userRef: userId,
                        })];
                    case 3:
                        findUserToken = _d.sent();
                        currentTime = new Date().getTime();
                        creationTimeInterval = currentTime - new Date(findUserToken === null || findUserToken === void 0 ? void 0 : findUserToken.timestamp).getTime();
                        if (creationTimeInterval > 60000 * 15)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.emailTokenMessage.error.forgetPasswordLinkTimeOff);
                        _d.label = 4;
                    case 4: return [4, new services_1.PasswordHasServices().hash(password)];
                    case 5:
                        hashedPassword = _d.sent();
                        return [4, models_1.EmailToken.findOneAndDelete({
                                userRef: userId,
                            })];
                    case 6:
                        deleteData = _d.sent();
                        if (!deleteData)
                            throw new http_errors_1.NotFound(resultMessage_1.emailTokenMessage.error.tokenExpired);
                        if (!(findUser.role === "user")) return [3, 8];
                        return [4, models_1.UserSchema.findByIdAndUpdate(userId, {
                                password: hashedPassword,
                                status: "active",
                            })];
                    case 7:
                        updatePassword = _d.sent();
                        if (!updatePassword)
                            throw new http_errors_1.InternalServerError(resultMessage_1.emailTokenMessage.error.passwordNotUpdated);
                        return [2, res.json({
                                success: { message: resultMessage_1.emailTokenMessage.success.updated },
                            })];
                    case 8: return [4, models_1.UserSchema.findByIdAndUpdate(userId, {
                            password: hashedPassword,
                            status: (findUser === null || findUser === void 0 ? void 0 : findUser.password) ? findUser.status : "pending",
                        })];
                    case 9:
                        updatePassword = _d.sent();
                        if (!!(findUser === null || findUser === void 0 ? void 0 : findUser.password)) return [3, 14];
                        return [4, models_1.UserSchema.find({ role: "admin" }).select("_id")];
                    case 10:
                        findAdmins = _d.sent();
                        userContent = new emailContent_1.UserContent();
                        title = findUser.role === "artist"
                            ? userContent.newArtistApproveRequestReceived().subject
                            : userContent.newManagerApprove().subject;
                        description = findUser.role === "artist"
                            ? userContent.newArtistApproveRequestReceived().text
                            : userContent.newManagerApprove().text;
                        icon = findUser.role === "artist"
                            ? notificationIcon_1.newArtistApprovalIcon
                            : notificationIcon_1.newManagerApprovalIcon;
                        _i = 0, _c = __spreadArray([], findAdmins.map(function (item) { return item._id; }), true);
                        _d.label = 11;
                    case 11:
                        if (!(_i < _c.length)) return [3, 14];
                        index = _c[_i];
                        return [4, new services_1.NotificationServices().notificationGenerate(index, userId, title, description, icon, {
                                subject: title,
                                text: description,
                            }, {
                                title: title,
                                body: description,
                                sound: "default",
                            })];
                    case 12:
                        _d.sent();
                        _d.label = 13;
                    case 13:
                        _i++;
                        return [3, 11];
                    case 14:
                        if (!updatePassword)
                            throw new http_errors_1.InternalServerError(resultMessage_1.emailTokenMessage.error.passwordNotUpdated);
                        return [2, res.json({
                                success: { message: resultMessage_1.emailTokenMessage.success.updated },
                            })];
                    case 15: return [3, 17];
                    case 16:
                        error_2 = _d.sent();
                        next(error_2);
                        return [3, 17];
                    case 17: return [2];
                }
            });
        });
    };
    return EmailTokenController;
}());
exports.default = EmailTokenController;
//# sourceMappingURL=emailToken.controller.js.map