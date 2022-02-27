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
var emailContent_1 = require("../emailContent");
var notificationIcon_1 = require("../notificationIcon");
var resultMessage_1 = require("../resultMessage");
var AssignArtistController = (function () {
    function AssignArtistController() {
    }
    AssignArtistController.prototype.assignArtist = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, managerId_1, artistId_1, findManager, findArtistData, findManagerData, assignArtistContent, title, description, updateAssignArtist, saveAssignArtist, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        _a = req.body, managerId_1 = _a.managerId, artistId_1 = _a.artistId;
                        if (!managerId_1 || !artistId_1)
                            throw new http_errors_1.BadRequest(resultMessage_1.assignArtistMessage.error.allField);
                        return [4, models_1.UserSchema.find({
                                _id: { $in: [artistId_1, managerId_1] },
                            })];
                    case 1:
                        findManager = _b.sent();
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
                        updateAssignArtist = _b.sent();
                        return [4, new services_1.NotificationServices().notificationGenerate(managerId_1, artistId_1, title, description, notificationIcon_1.assignArtistToManager, {
                                subject: title,
                                text: description,
                            }, {
                                title: title,
                                body: description,
                                sound: "default",
                            })];
                    case 3:
                        _b.sent();
                        if (updateAssignArtist)
                            return [2, res.json({
                                    success: { message: resultMessage_1.assignArtistMessage.success.assignArtist },
                                })];
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
                        saveAssignArtist = _b.sent();
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
                        _b.sent();
                        res.json({
                            success: { message: resultMessage_1.assignArtistMessage.success.assignArtist },
                        });
                        return [3, 7];
                    case 6:
                        error_1 = _b.sent();
                        next(error_1);
                        return [3, 7];
                    case 7: return [2];
                }
            });
        });
    };
    AssignArtistController.prototype.removeArtist = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, managerId, artistId, findAndUpdate, findManger, assignArtistContent, title, description, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        _a = req.body, managerId = _a.managerId, artistId = _a.artistId;
                        if (!managerId || !artistId)
                            throw new http_errors_1.BadRequest(resultMessage_1.assignArtistMessage.error.allField);
                        return [4, models_1.AssignArtistSchema.updateOne({ manager: managerId }, {
                                $pull: {
                                    artists: {
                                        artist: artistId,
                                    },
                                },
                            })];
                    case 1:
                        findAndUpdate = _b.sent();
                        if (!findAndUpdate.matchedCount)
                            throw new http_errors_1.NotFound(resultMessage_1.assignArtistMessage.error.managerNotFound);
                        if (!findAndUpdate.modifiedCount)
                            throw new http_errors_1.Conflict(resultMessage_1.assignArtistMessage.error.artistNotAssignManger);
                        return [4, models_1.UserSchema.findOne({ _id: managerId })];
                    case 2:
                        findManger = _b.sent();
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
                        _b.sent();
                        res.json({
                            success: { message: resultMessage_1.assignArtistMessage.success.artistRemove },
                        });
                        return [3, 5];
                    case 4:
                        error_2 = _b.sent();
                        next(error_2);
                        return [3, 5];
                    case 5: return [2];
                }
            });
        });
    };
    AssignArtistController.prototype.managerUnderArtist = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var managerId, findManagerData, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        managerId = req.params.managerId;
                        if (!managerId)
                            throw new http_errors_1.BadRequest(resultMessage_1.assignArtistMessage.error.allField);
                        return [4, models_1.AssignArtistSchema.findOne({
                                manager: managerId,
                            }).populate({
                                path: "artists.artist",
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
                            })];
                    case 1:
                        findManagerData = _a.sent();
                        res.json({ success: { data: findManagerData === null || findManagerData === void 0 ? void 0 : findManagerData.artists } });
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
    AssignArtistController.prototype.getManagerByArtist = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var artistId, findManagerData, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        artistId = req.params.artistId;
                        if (!artistId)
                            throw new http_errors_1.BadRequest(resultMessage_1.assignArtistMessage.error.allField);
                        return [4, models_1.AssignArtistSchema.find({
                                "artists.artist": artistId,
                            })
                                .populate("manager")
                                .select("manager -_id")];
                    case 1:
                        findManagerData = _a.sent();
                        res.json({ success: { data: findManagerData } });
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
    return AssignArtistController;
}());
exports.default = AssignArtistController;
//# sourceMappingURL=assignArtist.controller.js.map