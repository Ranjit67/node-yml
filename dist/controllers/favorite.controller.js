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
var resultMessage_1 = require("../resultMessage");
var FavoriteController = (function () {
    function FavoriteController() {
    }
    FavoriteController.prototype.addFavorite = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, userId, artistId, checkAddedOrNot, secondUpdate, findArtist, createFavorite, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        _a = req.body, userId = _a.userId, artistId = _a.artistId;
                        if (!userId || !artistId)
                            throw new http_errors_1.BadRequest(resultMessage_1.favoriteMessage.error.allField);
                        return [4, models_1.FavoriteSchema.findOne({
                                artist: artistId,
                                "favorites.user": userId,
                            })];
                    case 1:
                        checkAddedOrNot = _b.sent();
                        if (checkAddedOrNot)
                            throw new http_errors_1.Conflict(resultMessage_1.favoriteMessage.error.alreadyFavorite);
                        return [4, models_1.FavoriteSchema.updateOne({ artist: artistId }, {
                                $push: {
                                    favorites: {
                                        user: userId,
                                    },
                                },
                            })];
                    case 2:
                        secondUpdate = _b.sent();
                        if (secondUpdate.matchedCount)
                            return [2, res.json({
                                    success: { message: resultMessage_1.favoriteMessage.success.addFavorite },
                                })];
                        return [4, models_1.UserSchema.findOne({ _id: artistId })];
                    case 3:
                        findArtist = _b.sent();
                        if (findArtist.role !== "artist")
                            throw new http_errors_1.NotFound(resultMessage_1.favoriteMessage.error.notArtist);
                        return [4, models_1.FavoriteSchema.create({
                                artist: artistId,
                                favorites: [
                                    {
                                        user: userId,
                                        timestamp: new Date(),
                                    },
                                ],
                            })];
                    case 4:
                        createFavorite = _b.sent();
                        if (!createFavorite)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.favoriteMessage.error.addFavorite);
                        res.json({ success: { message: resultMessage_1.favoriteMessage.success.addFavorite } });
                        return [3, 6];
                    case 5:
                        error_1 = _b.sent();
                        next(error_1);
                        return [3, 6];
                    case 6: return [2];
                }
            });
        });
    };
    FavoriteController.prototype.favoriteRemove = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, userId, artistId, firstUpdate, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, userId = _a.userId, artistId = _a.artistId;
                        return [4, models_1.FavoriteSchema.updateOne({ artist: artistId, "favorites.user": userId }, {
                                $pull: {
                                    favorites: {
                                        user: userId,
                                    },
                                },
                            })];
                    case 1:
                        firstUpdate = _b.sent();
                        if (!firstUpdate.matchedCount)
                            throw new http_errors_1.NotFound(resultMessage_1.favoriteMessage.error.noFavoriteAdded);
                        return [2, res.json({
                                success: {
                                    message: resultMessage_1.favoriteMessage.success.removeFavorite,
                                },
                            })];
                    case 2:
                        error_2 = _b.sent();
                        next(error_2);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    FavoriteController.prototype.viewUserList = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var artistId, findFavoriteArtist, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        artistId = req.params.artistId;
                        if (!artistId)
                            throw new http_errors_1.BadRequest(resultMessage_1.favoriteMessage.error.allField);
                        return [4, models_1.FavoriteSchema.findOne({
                                artist: artistId,
                            }).populate({
                                path: "favorites.user",
                                select: "-password",
                            })];
                    case 1:
                        findFavoriteArtist = _b.sent();
                        if (!((_a = findFavoriteArtist === null || findFavoriteArtist === void 0 ? void 0 : findFavoriteArtist.favorites) === null || _a === void 0 ? void 0 : _a.length))
                            return [2, res.json({ success: { data: [] } })];
                        res.json({
                            success: {
                                data: findFavoriteArtist.favorites,
                            },
                        });
                        return [3, 3];
                    case 2:
                        error_3 = _b.sent();
                        next(error_3);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    FavoriteController.prototype.viewArtistList = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, findArtistsUserMakeFavorite, removeNullField, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = req.params.userId;
                        if (!userId)
                            throw new http_errors_1.BadRequest(resultMessage_1.favoriteMessage.error.allField);
                        return [4, models_1.FavoriteSchema.find({
                                "favorites.user": userId,
                            }).populate({
                                path: "artist",
                                match: { status: { $eq: "active" } },
                                select: "-password",
                            })];
                    case 1:
                        findArtistsUserMakeFavorite = _a.sent();
                        if (!(findArtistsUserMakeFavorite === null || findArtistsUserMakeFavorite === void 0 ? void 0 : findArtistsUserMakeFavorite.length))
                            return [2, res.json({
                                    success: {
                                        data: [],
                                    },
                                })];
                        removeNullField = findArtistsUserMakeFavorite.filter(function (item) { return item.artist !== null; });
                        return [2, res.json({ success: { data: removeNullField } })];
                    case 2:
                        error_4 = _a.sent();
                        next(error_4);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    return FavoriteController;
}());
exports.default = FavoriteController;
//# sourceMappingURL=favorite.controller.js.map