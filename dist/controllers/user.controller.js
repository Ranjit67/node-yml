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
var services_1 = require("../services");
var emailContent_1 = require("../emailContent");
var resultMessage_1 = require("../resultMessage");
var notificationIcon_1 = require("../notificationIcon");
var DeleteOperation = (function () {
    function DeleteOperation() {
        this.dir2 = "profile";
    }
    DeleteOperation.prototype.artistDelete = function (res, userData) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var removePricing, deleteFavorites, deleteVisitor, removeAssignArtist, deleteReview, deleteBlockData, bookingUpdate, updatePersonalizeMessage, findArtistMedia, awsS3, _i, _c, element, _d, _e, element, deleteArtistMedia, deleteUser;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4, models_1.PricingSchema.findOneAndDelete({
                            artist: userData._id,
                        })];
                    case 1:
                        removePricing = _f.sent();
                        return [4, models_1.FavoriteSchema.findOneAndDelete({
                                artist: userData._id,
                            })];
                    case 2:
                        deleteFavorites = _f.sent();
                        return [4, models_1.VisitorSchema.findOneAndDelete({
                                artist: userData._id,
                            })];
                    case 3:
                        deleteVisitor = _f.sent();
                        return [4, models_1.AssignArtistSchema.updateMany({ "artists.artist": userData._id }, {
                                $pull: {
                                    artists: {
                                        artist: userData._id,
                                    },
                                },
                            })];
                    case 4:
                        removeAssignArtist = _f.sent();
                        return [4, models_1.ReviewSchema.deleteMany({
                                artist: userData._id,
                            })];
                    case 5:
                        deleteReview = _f.sent();
                        return [4, models_1.ArtistBlockDateSchema.findOneAndDelete({
                                artist: userData._id,
                            })];
                    case 6:
                        deleteBlockData = _f.sent();
                        return [4, models_1.BookingSchema.updateMany({ artist: userData._id }, {
                                artist: null,
                                artistCopy: userData,
                            })];
                    case 7:
                        bookingUpdate = _f.sent();
                        return [4, models_1.PersonalizeVideoSchema.updateMany({ artist: userData._id }, {
                                artistCopy: userData,
                                artist: null,
                            })];
                    case 8:
                        updatePersonalizeMessage = _f.sent();
                        return [4, models_1.ArtistMediaSchema.findOne({
                                artist: userData._id,
                            })];
                    case 9:
                        findArtistMedia = _f.sent();
                        if (!findArtistMedia) return [3, 19];
                        awsS3 = new services_1.AwsS3Services();
                        if (!((_a = findArtistMedia === null || findArtistMedia === void 0 ? void 0 : findArtistMedia.artistVideos) === null || _a === void 0 ? void 0 : _a.length)) return [3, 13];
                        _i = 0, _c = findArtistMedia.artistVideos;
                        _f.label = 10;
                    case 10:
                        if (!(_i < _c.length)) return [3, 13];
                        element = _c[_i];
                        return [4, awsS3.delete(element.videoFile, "profile")];
                    case 11:
                        _f.sent();
                        _f.label = 12;
                    case 12:
                        _i++;
                        return [3, 10];
                    case 13:
                        if (!((_b = findArtistMedia === null || findArtistMedia === void 0 ? void 0 : findArtistMedia.artistPhotos) === null || _b === void 0 ? void 0 : _b.length)) return [3, 17];
                        _d = 0, _e = findArtistMedia.artistPhotos;
                        _f.label = 14;
                    case 14:
                        if (!(_d < _e.length)) return [3, 17];
                        element = _e[_d];
                        return [4, awsS3.delete(element.imageFile, "profile")];
                    case 15:
                        _f.sent();
                        _f.label = 16;
                    case 16:
                        _d++;
                        return [3, 14];
                    case 17: return [4, models_1.ArtistMediaSchema.findOneAndDelete({
                            artist: userData._id,
                        })];
                    case 18:
                        deleteArtistMedia = _f.sent();
                        _f.label = 19;
                    case 19: return [4, models_1.UserSchema.findByIdAndDelete(userData._id)];
                    case 20:
                        deleteUser = _f.sent();
                        if (!deleteUser)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.userMessage.error.notDelete);
                        return [2, res.json({ success: { message: resultMessage_1.userMessage.success.artistDelete } })];
                }
            });
        });
    };
    DeleteOperation.prototype.userDelete = function (res, userData) {
        return __awaiter(this, void 0, void 0, function () {
            var deleteWallet, deleteWalletHistory, deleteReviews, removeFromFavorites, updateBooking, updatePersonalizeVideo, deleteUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, models_1.WalletSchema.findOneAndDelete({
                            user: userData._id,
                        })];
                    case 1:
                        deleteWallet = _a.sent();
                        return [4, models_1.WalletHistorySchema.findOneAndDelete({
                                user: userData._id,
                            })];
                    case 2:
                        deleteWalletHistory = _a.sent();
                        return [4, models_1.ReviewSchema.deleteMany({ user: userData._id })];
                    case 3:
                        deleteReviews = _a.sent();
                        return [4, models_1.FavoriteSchema.updateMany({ "favorites.user": userData._id }, {
                                $pull: {
                                    favorites: {
                                        user: userData._id,
                                    },
                                },
                            })];
                    case 4:
                        removeFromFavorites = _a.sent();
                        return [4, models_1.BookingSchema.updateMany({
                                user: userData._id,
                            }, {
                                user: null,
                                userCopy: userData,
                            })];
                    case 5:
                        updateBooking = _a.sent();
                        return [4, models_1.PersonalizeVideoSchema.updateMany({
                                user: userData._id,
                            }, {
                                userCopy: userData,
                                user: null,
                            })];
                    case 6:
                        updatePersonalizeVideo = _a.sent();
                        return [4, models_1.UserSchema.findByIdAndDelete(userData._id)];
                    case 7:
                        deleteUser = _a.sent();
                        if (!deleteUser)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.userMessage.error.notDelete);
                        return [2, res.json({ success: { message: resultMessage_1.userMessage.success.userDelete } })];
                }
            });
        });
    };
    DeleteOperation.prototype.managerDelete = function (res, userData) {
        return __awaiter(this, void 0, void 0, function () {
            var removeFromFavorites, removeAssignArtist, deleteUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, models_1.FavoriteSchema.updateMany({ "favorites.user": userData._id }, {
                            $pull: {
                                favorites: {
                                    user: userData._id,
                                },
                            },
                        })];
                    case 1:
                        removeFromFavorites = _a.sent();
                        return [4, models_1.AssignArtistSchema.findOneAndDelete({
                                manager: userData._id,
                            })];
                    case 2:
                        removeAssignArtist = _a.sent();
                        return [4, models_1.UserSchema.findByIdAndDelete(userData._id)];
                    case 3:
                        deleteUser = _a.sent();
                        if (!deleteUser)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.userMessage.error.notDelete);
                        return [2, res.json({
                                success: { message: resultMessage_1.userMessage.success.managerDelete },
                            })];
                }
            });
        });
    };
    return DeleteOperation;
}());
var UserController = (function (_super) {
    __extends(UserController, _super);
    function UserController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserController.prototype.delete = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, findUserData, deleteSupport, deleteNotification, notificationUpdate, removeFromRequest, removeFromVisitors, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        id = req.params.id;
                        return [4, models_1.UserSchema.findById(id)];
                    case 1:
                        findUserData = _a.sent();
                        if (!findUserData)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.userMessage.error.userNotFound);
                        return [4, models_1.SupportSchema.deleteMany({
                                user: findUserData._id,
                            })];
                    case 2:
                        deleteSupport = _a.sent();
                        return [4, models_1.NotificationSchema.deleteMany({
                                user: findUserData._id,
                            })];
                    case 3:
                        deleteNotification = _a.sent();
                        return [4, models_1.NotificationSchema.updateMany({
                                "notification.receiveFrom": findUserData._id,
                            }, {
                                $pull: {
                                    notification: {
                                        receiveFrom: { $eq: findUserData._id },
                                    },
                                },
                            })];
                    case 4:
                        notificationUpdate = _a.sent();
                        return [4, models_1.RequestSchema.deleteMany({
                                $or: [
                                    { senderUser: findUserData._id },
                                    { receiverUser: findUserData._id },
                                ],
                            })];
                    case 5:
                        removeFromRequest = _a.sent();
                        if (!(findUserData.role !== "artist")) return [3, 7];
                        return [4, models_1.VisitorSchema.updateMany({ "users.user": findUserData._id }, {
                                $pull: {
                                    users: {
                                        user: findUserData._id,
                                    },
                                },
                            })];
                    case 6:
                        removeFromVisitors = _a.sent();
                        _a.label = 7;
                    case 7:
                        if (findUserData.role === "artist") {
                            return [2, _super.prototype.artistDelete.call(this, res, findUserData)];
                        }
                        else if (findUserData.role === "manager") {
                            return [2, _super.prototype.managerDelete.call(this, res, findUserData)];
                        }
                        else if (findUserData.role === "user") {
                            return [2, _super.prototype.userDelete.call(this, res, findUserData)];
                        }
                        return [3, 9];
                    case 8:
                        error_1 = _a.sent();
                        next(error_1);
                        return [3, 9];
                    case 9: return [2];
                }
            });
        });
    };
    UserController.prototype.create = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, email, countryCode, phoneNumber, firstName, lastName, role, gender, lat, lng, address, country, yearsOfExperience, languagesId, Dob, baseUrl, check, currentTime, checkTime, updateOneEmail, token, emailTokenUpdate, emailContent, SendEmail, profilePicture, awsS3, profileImage, user, userSave, token, saveEmailToken, emailContent, SendEmail, user, userSave, token, saveEmailToken, emailContent, SendEmail, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 18, , 19]);
                        _b = req.body, email = _b.email, countryCode = _b.countryCode, phoneNumber = _b.phoneNumber, firstName = _b.firstName, lastName = _b.lastName, role = _b.role, gender = _b.gender, lat = _b.lat, lng = _b.lng, address = _b.address, country = _b.country, yearsOfExperience = _b.yearsOfExperience, languagesId = _b.languagesId, Dob = _b.Dob, baseUrl = _b.baseUrl;
                        return [4, models_1.UserSchema.findOne({ email: email })];
                    case 1:
                        check = _c.sent();
                        if (["admin", "user", "artist", "manager"].indexOf(role.toLowerCase()) ===
                            -1)
                            throw new http_errors_1.BadRequest(resultMessage_1.userMessage.error.invalidRole);
                        if (check) {
                            currentTime = new Date().getTime();
                            checkTime = currentTime - new Date(check === null || check === void 0 ? void 0 : check.timestamp).getTime();
                            if (checkTime <= 60000 * 15)
                                throw new http_errors_1.NotAcceptable(resultMessage_1.userMessage.error.currentlyRegistered);
                        }
                        return [4, models_1.UserSchema.updateOne({ email: email, password: { $exists: false } }, {
                                countryCode: countryCode,
                                phoneNumber: phoneNumber,
                                firstName: firstName,
                                lastName: lastName,
                                role: role.toLowerCase(),
                                gender: gender,
                                location: {
                                    lat: +lat,
                                    lng: +lng,
                                    address: address,
                                    country: country,
                                },
                                yearsOfExperience: yearsOfExperience,
                                languages: languagesId,
                                Dob: Dob,
                                timestamp: new Date(),
                            })];
                    case 2:
                        updateOneEmail = _c.sent();
                        if (!(updateOneEmail.matchedCount === 1)) return [3, 6];
                        return [4, new services_1.JwtService().emailTokenGenerator(check === null || check === void 0 ? void 0 : check._id)];
                    case 3:
                        token = _c.sent();
                        return [4, models_1.EmailToken.updateOne({ userRef: check === null || check === void 0 ? void 0 : check._id }, { emailTokenString: token })];
                    case 4:
                        emailTokenUpdate = _c.sent();
                        if (!emailTokenUpdate)
                            throw new http_errors_1.InternalServerError(resultMessage_1.userMessage.error.emailToken);
                        emailContent = new emailContent_1.UserContent().emailOnSelfVerification(baseUrl, token);
                        return [4, new services_1.EmailService().LinkEmailSend(email, emailContent.subject, emailContent.text)];
                    case 5:
                        SendEmail = _c.sent();
                        return [2, res.json({
                                success: {
                                    message: resultMessage_1.userMessage.success.mailVerification,
                                },
                            })];
                    case 6:
                        if (check)
                            throw new http_errors_1.Conflict(resultMessage_1.userMessage.error.duplicateEmail);
                        profilePicture = (_a = req === null || req === void 0 ? void 0 : req.files) === null || _a === void 0 ? void 0 : _a.profilePicture;
                        if (!profilePicture) return [3, 12];
                        awsS3 = new services_1.AwsS3Services();
                        return [4, awsS3.upload(profilePicture, "profile")];
                    case 7:
                        profileImage = _c.sent();
                        if (!profileImage)
                            throw new http_errors_1.InternalServerError("Profile image is not uploaded.");
                        user = new models_1.UserSchema({
                            email: email,
                            profileImageRef: profileImage.key,
                            profileImageUrl: profileImage.Location,
                            countryCode: countryCode,
                            phoneNumber: phoneNumber,
                            firstName: firstName,
                            lastName: lastName,
                            role: role.toLowerCase(),
                            gender: gender,
                            location: {
                                lat: +lat,
                                lng: +lng,
                                address: address,
                                country: country,
                            },
                            yearsOfExperience: yearsOfExperience,
                            languages: languagesId,
                            Dob: Dob,
                            timestamp: new Date(),
                        });
                        return [4, user.save()];
                    case 8:
                        userSave = _c.sent();
                        if (!userSave)
                            throw new http_errors_1.InternalServerError(resultMessage_1.userMessage.error.notCreated);
                        return [4, new services_1.JwtService().emailTokenGenerator(userSave === null || userSave === void 0 ? void 0 : userSave._id)];
                    case 9:
                        token = _c.sent();
                        return [4, models_1.EmailToken.create({
                                userRef: userSave === null || userSave === void 0 ? void 0 : userSave._id,
                                emailTokenString: token,
                                timestamp: new Date(),
                            })];
                    case 10:
                        saveEmailToken = _c.sent();
                        if (!saveEmailToken)
                            throw new http_errors_1.InternalServerError(resultMessage_1.userMessage.error.emailToken);
                        emailContent = new emailContent_1.UserContent().emailOnSelfVerification(baseUrl, token);
                        return [4, new services_1.EmailService().LinkEmailSend(userSave === null || userSave === void 0 ? void 0 : userSave.email, emailContent.subject, emailContent.text)];
                    case 11:
                        SendEmail = _c.sent();
                        res.json({
                            success: {
                                message: resultMessage_1.userMessage.success.mailVerification,
                                data: "",
                            },
                        });
                        return [3, 17];
                    case 12:
                        user = new models_1.UserSchema({
                            email: email,
                            countryCode: countryCode,
                            phoneNumber: phoneNumber,
                            firstName: firstName,
                            lastName: lastName,
                            role: role.toLowerCase(),
                            gender: gender,
                            location: {
                                lat: +lat,
                                lng: +lng,
                                address: address,
                                country: country,
                            },
                            yearsOfExperience: yearsOfExperience,
                            languages: languagesId,
                            Dob: Dob,
                            timestamp: new Date(),
                        });
                        return [4, user.save()];
                    case 13:
                        userSave = _c.sent();
                        if (!userSave)
                            throw new http_errors_1.InternalServerError(resultMessage_1.userMessage.error.notCreated);
                        return [4, new services_1.JwtService().emailTokenGenerator(userSave === null || userSave === void 0 ? void 0 : userSave._id)];
                    case 14:
                        token = _c.sent();
                        return [4, models_1.EmailToken.create({
                                userRef: userSave === null || userSave === void 0 ? void 0 : userSave._id,
                                emailTokenString: token,
                                timestamp: new Date(),
                            })];
                    case 15:
                        saveEmailToken = _c.sent();
                        if (!saveEmailToken)
                            throw new http_errors_1.InternalServerError(resultMessage_1.userMessage.error.emailToken);
                        emailContent = new emailContent_1.UserContent().emailOnSelfVerification(baseUrl, token);
                        return [4, new services_1.EmailService().LinkEmailSend(userSave === null || userSave === void 0 ? void 0 : userSave.email, emailContent.subject, emailContent.text)];
                    case 16:
                        SendEmail = _c.sent();
                        res.json({
                            success: {
                                message: resultMessage_1.userMessage.success.mailVerification,
                            },
                        });
                        _c.label = 17;
                    case 17: return [3, 19];
                    case 18:
                        error_2 = _c.sent();
                        next(error_2);
                        return [3, 19];
                    case 19: return [2];
                }
            });
        });
    };
    UserController.prototype.getAll = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var findAllUser, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, models_1.UserSchema.find({ isDeleted: false })
                                .populate("category")
                                .populate("subcategories")
                                .populate("genres")
                                .populate("languages")
                                .populate("events")
                                .populate("services")
                                .populate("pricing")
                                .populate({
                                path: "artistMedia",
                                select: "artistVideos artistPhotos youtubeVideos",
                            })
                                .select("-password -__v -fcmToken -profileImageRef")];
                    case 1:
                        findAllUser = _a.sent();
                        res.json({
                            success: {
                                data: findAllUser,
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
    UserController.prototype.activeArtist = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, limit, skip, findAllUser, findAllUser, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        _a = req.params, limit = _a.limit, skip = _a.skip;
                        if (!(limit && skip)) return [3, 2];
                        return [4, models_1.UserSchema.find({
                                role: "artist",
                                status: "active",
                            })
                                .populate("category")
                                .populate("subcategories")
                                .populate("genres")
                                .populate("languages")
                                .populate("events")
                                .populate("services")
                                .populate({
                                path: "artistMedia",
                                select: "artistVideos artistPhotos youtubeVideos",
                            })
                                .limit(+limit)
                                .skip(+skip)
                                .select("-password -__v -fcmToken -profileImageRef")];
                    case 1:
                        findAllUser = _b.sent();
                        res.json({
                            success: {
                                data: findAllUser,
                            },
                        });
                        return [3, 4];
                    case 2: return [4, models_1.UserSchema.find({
                            role: "artist",
                            status: "active",
                        })];
                    case 3:
                        findAllUser = _b.sent();
                        res.json({
                            success: {
                                data: findAllUser,
                            },
                        });
                        _b.label = 4;
                    case 4: return [3, 6];
                    case 5:
                        error_4 = _b.sent();
                        next(error_4);
                        return [3, 6];
                    case 6: return [2];
                }
            });
        });
    };
    UserController.prototype.getSelf = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var aud, findOneUser, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        aud = req.payload.aud;
                        return [4, models_1.UserSchema.findById(aud[0])
                                .populate({
                                path: "subcategories",
                                model: "SubCategory",
                            })
                                .populate("category")
                                .populate("genres")
                                .select("-password")
                                .select("-__v")];
                    case 1:
                        findOneUser = _a.sent();
                        res.json({ success: { data: findOneUser } });
                        return [3, 3];
                    case 2:
                        error_5 = _a.sent();
                        next(error_5);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    UserController.prototype.getOne = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, findOneUser, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        return [4, models_1.UserSchema.findById(id)
                                .populate({
                                path: "subcategories",
                                model: "SubCategory",
                            })
                                .populate("category")
                                .populate("genres")
                                .populate("languages")
                                .populate("events")
                                .populate("services")
                                .select("-password -__v")];
                    case 1:
                        findOneUser = _a.sent();
                        res.json({
                            success: {
                                data: findOneUser,
                            },
                        });
                        return [3, 3];
                    case 2:
                        error_6 = _a.sent();
                        if (error_6.path === "_id") {
                            error_6.message = resultMessage_1.userMessage.error.invalidUserId;
                        }
                        next(error_6);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    UserController.prototype.update = function (req, res, next) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function () {
            var _f, countryCode, phoneNumber, firstName, lastName, fcmToken, Dob, status_1, gender, lat, lng, address, country, yearsOfExperience, languages, inTopSearches, inTopTrending, events, services, bio, artistMedia, id, findUser, profilePicture, profileImage, awsS3, deleteImage, updateUser, error_7;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _g.trys.push([0, 7, , 8]);
                        _f = req.body, countryCode = _f.countryCode, phoneNumber = _f.phoneNumber, firstName = _f.firstName, lastName = _f.lastName, fcmToken = _f.fcmToken, Dob = _f.Dob, status_1 = _f.status, gender = _f.gender, lat = _f.lat, lng = _f.lng, address = _f.address, country = _f.country, yearsOfExperience = _f.yearsOfExperience, languages = _f.languages, inTopSearches = _f.inTopSearches, inTopTrending = _f.inTopTrending, events = _f.events, services = _f.services, bio = _f.bio, artistMedia = _f.artistMedia;
                        id = req.params.id;
                        if (!id)
                            throw new http_errors_1.BadRequest(resultMessage_1.userMessage.error.allFieldsRequired);
                        return [4, models_1.UserSchema.findById(id)];
                    case 1:
                        findUser = _g.sent();
                        if (!findUser)
                            throw new http_errors_1.BadRequest(resultMessage_1.userMessage.error.invalidUserId);
                        profilePicture = (_a = req === null || req === void 0 ? void 0 : req.files) === null || _a === void 0 ? void 0 : _a.profilePicture;
                        profileImage = void 0;
                        if (!profilePicture) return [3, 5];
                        awsS3 = new services_1.AwsS3Services();
                        return [4, awsS3.upload(profilePicture, "profile")];
                    case 2:
                        profileImage = _g.sent();
                        if (!(findUser === null || findUser === void 0 ? void 0 : findUser.profileImageRef)) return [3, 4];
                        return [4, awsS3.delete(findUser === null || findUser === void 0 ? void 0 : findUser.profileImageRef, "profile")];
                    case 3:
                        deleteImage = _g.sent();
                        _g.label = 4;
                    case 4:
                        if (!profileImage)
                            throw new http_errors_1.InternalServerError(resultMessage_1.userMessage.error.profileImage);
                        _g.label = 5;
                    case 5: return [4, models_1.UserSchema.findByIdAndUpdate(id, {
                            profileImageRef: (profileImage === null || profileImage === void 0 ? void 0 : profileImage.key) || findUser.profileImageRef || "",
                            profileImageUrl: (profileImage === null || profileImage === void 0 ? void 0 : profileImage.Location) || findUser.profileImageUrl || "",
                            countryCode: countryCode || findUser.countryCode || "",
                            phoneNumber: phoneNumber || findUser.phoneNumber || "",
                            firstName: firstName || findUser.firstName || "",
                            lastName: lastName || findUser.lastName || "",
                            gender: gender || (findUser === null || findUser === void 0 ? void 0 : findUser.gender) || "",
                            location: {
                                lat: lat !== null && lat !== void 0 ? lat : (_b = findUser === null || findUser === void 0 ? void 0 : findUser.location) === null || _b === void 0 ? void 0 : _b.lat,
                                lng: lng !== null && lng !== void 0 ? lng : (_c = findUser === null || findUser === void 0 ? void 0 : findUser.location) === null || _c === void 0 ? void 0 : _c.lng,
                                address: address !== null && address !== void 0 ? address : (_d = findUser === null || findUser === void 0 ? void 0 : findUser.location) === null || _d === void 0 ? void 0 : _d.address,
                                country: country !== null && country !== void 0 ? country : (_e = findUser === null || findUser === void 0 ? void 0 : findUser.location) === null || _e === void 0 ? void 0 : _e.country,
                            },
                            yearsOfExperience: yearsOfExperience || (findUser === null || findUser === void 0 ? void 0 : findUser.yearsOfExperience) || "",
                            languages: Array.isArray(languages)
                                ? languages
                                : (findUser === null || findUser === void 0 ? void 0 : findUser.languages) || [],
                            events: Array.isArray(events) ? events : (findUser === null || findUser === void 0 ? void 0 : findUser.events) || [],
                            services: Array.isArray(services) ? services : (findUser === null || findUser === void 0 ? void 0 : findUser.services) || [],
                            fcmToken: fcmToken || findUser.fcmToken || "",
                            status: status_1 || findUser.status || "",
                            Dob: Dob || findUser.Dob || "",
                            inTopSearches: inTopSearches !== null && inTopSearches !== void 0 ? inTopSearches : findUser.inTopSearches,
                            inTopTrending: inTopTrending !== null && inTopTrending !== void 0 ? inTopTrending : findUser.inTopTrending,
                            bio: bio !== null && bio !== void 0 ? bio : findUser.bio,
                            artistMedia: artistMedia !== null && artistMedia !== void 0 ? artistMedia : findUser.artistMedia,
                        })];
                    case 6:
                        updateUser = _g.sent();
                        if (!updateUser)
                            throw new http_errors_1.GatewayTimeout(resultMessage_1.userMessage.error.notUpdate);
                        res.json({
                            success: {
                                message: resultMessage_1.userMessage.success.update,
                            },
                        });
                        return [3, 8];
                    case 7:
                        error_7 = _g.sent();
                        next(error_7);
                        return [3, 8];
                    case 8: return [2];
                }
            });
        });
    };
    UserController.prototype.signIn = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, findUser, isMatch, token, error_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        _a = req.body, email = _a.email, password = _a.password;
                        return [4, models_1.UserSchema.findOne({ email: email, isDeleted: false })];
                    case 1:
                        findUser = _b.sent();
                        if (!findUser)
                            throw new http_errors_1.BadRequest(resultMessage_1.userMessage.error.userNotFound);
                        if (!findUser.password)
                            throw new http_errors_1.Conflict(resultMessage_1.userMessage.error.passwordNotSet);
                        return [4, new services_1.PasswordHasServices().compare(password, findUser.password)];
                    case 2:
                        isMatch = _b.sent();
                        if (!isMatch)
                            throw new http_errors_1.BadRequest(resultMessage_1.userMessage.error.wrongPassword);
                        return [4, new services_1.JwtService().accessTokenGenerator(findUser === null || findUser === void 0 ? void 0 : findUser._id)];
                    case 3:
                        token = _b.sent();
                        if (!token)
                            throw new http_errors_1.InternalServerError(resultMessage_1.userMessage.error.tokenGenerate);
                        res.json({
                            success: {
                                data: token,
                                user: findUser,
                            },
                        });
                        return [3, 5];
                    case 4:
                        error_8 = _b.sent();
                        next(error_8);
                        return [3, 5];
                    case 5: return [2];
                }
            });
        });
    };
    UserController.prototype.blockUnblockUser = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, findUser, createArtistBlockDate, updateUser, userContent, findAdmin, title, description, icon, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        id = req.body.id;
                        return [4, models_1.UserSchema.findById(id)];
                    case 1:
                        findUser = _a.sent();
                        if (!(findUser.role === "artist" && findUser.status === "pending")) return [3, 3];
                        return [4, models_1.ArtistBlockDateSchema.create({
                                artist: findUser._id,
                            })];
                    case 2:
                        createArtistBlockDate = _a.sent();
                        _a.label = 3;
                    case 3: return [4, models_1.UserSchema.updateOne({ _id: id }, {
                            status: findUser.status === "active"
                                ? "blocked"
                                : findUser.status === "blocked"
                                    ? "active"
                                    : findUser.status === "pending"
                                        ? "active"
                                        : findUser.status,
                        })];
                    case 4:
                        updateUser = _a.sent();
                        if (updateUser.modifiedCount === 0)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.userMessage.error.notUpdatedBlockOrUnblock);
                        userContent = new emailContent_1.UserContent();
                        return [4, models_1.UserSchema.findOne({ role: "admin" })];
                    case 5:
                        findAdmin = _a.sent();
                        title = findUser.status === "active"
                            ? userContent.superAdminBlockUser(findUser).subject
                            : findUser.status === "blocked"
                                ? userContent.superAdminUnblockUser(findUser).subject
                                : userContent.afterApproveRequest(findUser).subject;
                        description = findUser.status === "active"
                            ? userContent.superAdminBlockUser(findUser).text
                            : findUser.status === "blocked"
                                ? userContent.superAdminUnblockUser(findUser).text
                                : userContent.afterApproveRequest(findUser).text;
                        icon = findUser.status === "active"
                            ? notificationIcon_1.userBlockIcon
                            : findUser.status === "blocked"
                                ? notificationIcon_1.userUnblockIcon
                                : notificationIcon_1.userApproveIcon;
                        return [4, new services_1.NotificationServices().notificationGenerate(id, findAdmin._id.toString(), title, description, icon, {
                                subject: title,
                                text: description,
                            }, {
                                title: title,
                                body: description,
                                sound: "default",
                            })];
                    case 6:
                        _a.sent();
                        return [2, res.json({
                                success: {
                                    message: findUser.status === "active"
                                        ? resultMessage_1.userMessage.success.userBlocked
                                        : findUser.status === "blocked"
                                            ? resultMessage_1.userMessage.success.userUnblocked
                                            : resultMessage_1.userMessage.success.userPendingToActive,
                                },
                            })];
                    case 7:
                        error_9 = _a.sent();
                        next(error_9);
                        return [3, 8];
                    case 8: return [2];
                }
            });
        });
    };
    UserController.prototype.setPassword = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var stringData, _a, email, newPassword, oldPassword, baseUrl, findUser, isMatch, hashedPassword, updateUser, findUserToken, currentTime, timeInterval, token, updateEmailToken, saveEmailToken, emailContent, SendEmail, error_10;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 13, , 14]);
                        stringData = req.params.stringData;
                        _a = req.body, email = _a.email, newPassword = _a.newPassword, oldPassword = _a.oldPassword, baseUrl = _a.baseUrl;
                        if (!email || !stringData)
                            throw new http_errors_1.BadRequest(resultMessage_1.userMessage.error.allFieldsRequired);
                        return [4, models_1.UserSchema.findOne({ email: email })];
                    case 1:
                        findUser = _b.sent();
                        if (!findUser)
                            throw new http_errors_1.BadRequest(resultMessage_1.userMessage.error.userNotFound);
                        if (!(stringData === "changePassword")) return [3, 5];
                        if (!email || !newPassword || !oldPassword)
                            throw new http_errors_1.BadRequest(resultMessage_1.userMessage.error.allFieldsRequired);
                        return [4, new services_1.PasswordHasServices().compare(oldPassword, findUser.password)];
                    case 2:
                        isMatch = _b.sent();
                        if (!isMatch)
                            throw new http_errors_1.BadRequest(resultMessage_1.userMessage.error.oldPassword);
                        return [4, new services_1.PasswordHasServices().hash(newPassword)];
                    case 3:
                        hashedPassword = _b.sent();
                        return [4, models_1.UserSchema.findOneAndUpdate({ email: email }, { password: hashedPassword })];
                    case 4:
                        updateUser = _b.sent();
                        if (!updateUser)
                            throw new http_errors_1.GatewayTimeout(resultMessage_1.userMessage.error.passwordNotMatch);
                        res.json({
                            success: {
                                message: resultMessage_1.userMessage.success.passwordSet,
                            },
                        });
                        return [3, 12];
                    case 5:
                        if (!(findUser === null || findUser === void 0 ? void 0 : findUser.password))
                            throw new http_errors_1.NotAcceptable(resultMessage_1.userMessage.error.forgetPasswordNot);
                        return [4, models_1.EmailToken.findOne({
                                userRef: findUser === null || findUser === void 0 ? void 0 : findUser._id,
                            })];
                    case 6:
                        findUserToken = _b.sent();
                        if (findUserToken) {
                            currentTime = new Date().getTime();
                            timeInterval = currentTime - new Date(findUserToken === null || findUserToken === void 0 ? void 0 : findUserToken.timestamp).getTime();
                            if (timeInterval <= 60000 * 15)
                                throw new http_errors_1.NotAcceptable(resultMessage_1.userMessage.error.forgetPasswordLinkTimeHave);
                        }
                        return [4, new services_1.JwtService().emailTokenGenerator(findUser === null || findUser === void 0 ? void 0 : findUser._id)];
                    case 7:
                        token = _b.sent();
                        return [4, models_1.EmailToken.updateOne({ userRef: findUser === null || findUser === void 0 ? void 0 : findUser._id }, { emailTokenString: token, timestamp: new Date() }, { multi: false })];
                    case 8:
                        updateEmailToken = _b.sent();
                        if (!((updateEmailToken === null || updateEmailToken === void 0 ? void 0 : updateEmailToken.matchedCount) === 0)) return [3, 10];
                        return [4, models_1.EmailToken.create({
                                userRef: findUser === null || findUser === void 0 ? void 0 : findUser._id,
                                emailTokenString: token,
                                timestamp: new Date(),
                            })];
                    case 9:
                        saveEmailToken = _b.sent();
                        _b.label = 10;
                    case 10:
                        emailContent = new emailContent_1.UserContent().emailForgetPassword(baseUrl, token);
                        return [4, new services_1.EmailService().LinkEmailSend(email, emailContent.subject, emailContent.text)];
                    case 11:
                        SendEmail = _b.sent();
                        res.json({
                            success: {
                                message: resultMessage_1.userMessage.success.forgetPasswordLinkMail,
                            },
                        });
                        _b.label = 12;
                    case 12: return [3, 14];
                    case 13:
                        error_10 = _b.sent();
                        next(error_10);
                        return [3, 14];
                    case 14: return [2];
                }
            });
        });
    };
    UserController.prototype.categoryUpdate = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, userId, categoryId, subcategories, genres, findUser, updateProfile, error_11;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.body, userId = _a.userId, categoryId = _a.categoryId, subcategories = _a.subcategories, genres = _a.genres;
                        return [4, models_1.UserSchema.findById(userId)];
                    case 1:
                        findUser = _b.sent();
                        return [4, models_1.UserSchema.findByIdAndUpdate(userId, {
                                category: categoryId ? categoryId : findUser.category,
                                subcategories: subcategories.length
                                    ? subcategories
                                    : findUser.subcategories,
                                genres: genres.length ? genres : findUser.genres,
                            })];
                    case 2:
                        updateProfile = _b.sent();
                        if (!updateProfile)
                            throw new http_errors_1.GatewayTimeout(resultMessage_1.userMessage.error.notUpdate);
                        res.json({
                            success: {
                                message: resultMessage_1.userMessage.success.update,
                            },
                        });
                        return [3, 4];
                    case 3:
                        error_11 = _b.sent();
                        next(error_11);
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    UserController.prototype.topSearchArtist = function (req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, limit, country, findVisitors, sortData, ids, findArtist, dataArray, error_12;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 3, , 4]);
                        _c = req.params, limit = _c.limit, country = _c.country;
                        return [4, models_1.VisitorSchema.find({}).populate({
                                path: "artist",
                                select: "-password  -fcmToken -__v",
                                match: { "location.country": country },
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
                                    {
                                        path: "services",
                                        model: "Service",
                                    },
                                ],
                            })];
                    case 1:
                        findVisitors = _d.sent();
                        if (!findVisitors.length)
                            return [2, res.json({
                                    success: {
                                        data: [],
                                    },
                                })];
                        sortData = __spreadArray([], findVisitors.filter(function (element) { return (element === null || element === void 0 ? void 0 : element.artist) !== null; }), true).sort(function (a, b) { return a.users.length - b.users.length; });
                        ids = sortData.map(function (item) { return item.artist._id; });
                        return [4, models_1.UserSchema.find({
                                _id: { $nin: ids },
                                role: "artist",
                                "location.country": country,
                                status: "active",
                            })
                                .populate("category")
                                .populate("languages")
                                .populate("subcategories")
                                .populate("genres")
                                .select("-password  -fcmToken -__v")];
                    case 2:
                        findArtist = _d.sent();
                        dataArray = (_b = __spreadArray(__spreadArray([], (_a = __spreadArray([], sortData, true).map(function (item) { return item === null || item === void 0 ? void 0 : item.artist; })) === null || _a === void 0 ? void 0 : _a.reverse(), true), findArtist, true)) === null || _b === void 0 ? void 0 : _b.slice(0, +limit);
                        res.json({
                            success: {
                                data: dataArray,
                            },
                        });
                        return [3, 4];
                    case 3:
                        error_12 = _d.sent();
                        next(error_12);
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    UserController.prototype.topSearchArtist2 = function (req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var limit, findVisitors, sortData, ids, findArtist, dataArray, error_13;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        limit = req.params.limit;
                        return [4, models_1.VisitorSchema.find({}).populate({
                                path: "artist",
                                select: "-password  -fcmToken -__v",
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
                            })];
                    case 1:
                        findVisitors = _c.sent();
                        if (!findVisitors.length)
                            return [2, res.json({
                                    success: {
                                        data: [],
                                    },
                                })];
                        sortData = __spreadArray([], findVisitors.filter(function (element) { return (element === null || element === void 0 ? void 0 : element.artist) !== null; }), true).sort(function (a, b) { return a.users.length - b.users.length; });
                        ids = sortData.map(function (item) { return item.artist._id; });
                        return [4, models_1.UserSchema.find({
                                _id: { $nin: ids },
                                role: "artist",
                                status: "active",
                            })
                                .populate("category")
                                .populate("languages")
                                .populate("subcategories")
                                .populate("genres")
                                .select("-password  -fcmToken -__v")];
                    case 2:
                        findArtist = _c.sent();
                        dataArray = (_b = __spreadArray(__spreadArray([], (_a = __spreadArray([], sortData, true).map(function (item) { return item === null || item === void 0 ? void 0 : item.artist; })) === null || _a === void 0 ? void 0 : _a.reverse(), true), findArtist, true)) === null || _b === void 0 ? void 0 : _b.slice(0, +limit);
                        res.json({
                            success: {
                                data: dataArray,
                            },
                        });
                        return [3, 4];
                    case 3:
                        error_13 = _c.sent();
                        next(error_13);
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    UserController.prototype.fakeDataUpdate = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var dat, genresSchema, booking, error_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        dat = ["61eb047162fc8fd6c11f82a3", "61eec6c0083100ff93536b26"];
                        return [4, models_1.RequestSchema.deleteMany({
                                receiverUser: "61eb047162fc8fd6c11f82a3",
                            })];
                    case 1:
                        genresSchema = _a.sent();
                        return [4, models_1.BookingSchema.deleteMany({
                                artist: "61eec6c0083100ff93536b26",
                            })];
                    case 2:
                        booking = _a.sent();
                        res.json({ data: genresSchema });
                        return [3, 4];
                    case 3:
                        error_14 = _a.sent();
                        next(error_14);
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    return UserController;
}(DeleteOperation));
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map