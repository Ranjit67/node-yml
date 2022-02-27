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
var ArtistBlockDateController = (function () {
    function ArtistBlockDateController() {
    }
    ArtistBlockDateController.prototype.create = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, artistId, datesArray, currentTime_1, structDates, firstUpdate, removeOlderDates, checkArtist, firstTimeSave, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        _a = req.body, artistId = _a.artistId, datesArray = _a.datesArray;
                        if (!artistId || !datesArray.length)
                            throw new http_errors_1.BadRequest(resultMessage_1.artistBlockDateMessage.error.allField);
                        currentTime_1 = new Date();
                        structDates = datesArray.map(function (date) { return ({
                            date: new Date(date).getTime(),
                            dateDayFormat: new Date(date).toDateString(),
                            timestamp: currentTime_1,
                        }); });
                        return [4, models_1.ArtistBlockDateSchema.updateOne({ artist: artistId }, {
                                $push: { blockedDates: { $each: structDates } },
                            })];
                    case 1:
                        firstUpdate = _b.sent();
                        return [4, models_1.ArtistBlockDateSchema.updateOne({ artist: artistId }, {
                                $pull: {
                                    blockedDates: {
                                        date: { $lt: new Date().getTime() },
                                    },
                                },
                            })];
                    case 2:
                        removeOlderDates = _b.sent();
                        if (firstUpdate.matchedCount === 1)
                            return [2, res.json({
                                    success: { message: resultMessage_1.artistBlockDateMessage.success.blockDateInput },
                                })];
                        return [4, models_1.UserSchema.findOne({
                                _id: artistId,
                                status: "active",
                                role: "artist",
                            })];
                    case 3:
                        checkArtist = _b.sent();
                        if (!checkArtist)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.artistBlockDateMessage.error.notAcceptable);
                        return [4, models_1.ArtistBlockDateSchema.create({
                                artist: artistId,
                                blockedDates: structDates,
                            })];
                    case 4:
                        firstTimeSave = _b.sent();
                        if (!firstTimeSave)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.artistBlockDateMessage.error.notUpdated);
                        return [2, res.json({
                                success: { message: resultMessage_1.artistBlockDateMessage.success.blockDateInput },
                            })];
                    case 5:
                        error_1 = _b.sent();
                        next(error_1);
                        return [3, 6];
                    case 6: return [2];
                }
            });
        });
    };
    ArtistBlockDateController.prototype.getBlockDateByArtist = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var artistId, artistBlockDate, structDates, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        artistId = req.params.artistId;
                        if (!artistId)
                            throw new http_errors_1.BadRequest(resultMessage_1.artistBlockDateMessage.error.allField);
                        return [4, models_1.ArtistBlockDateSchema.findOne({
                                artist: artistId,
                            }).select("blockedDates")];
                    case 1:
                        artistBlockDate = _a.sent();
                        if (!artistBlockDate)
                            res.json({ success: { data: [] } });
                        structDates = artistBlockDate.blockedDates.map(function (element) { return ({
                            _id: element._id,
                            timestamp: element.timestamp,
                            date: new Date(element.date),
                        }); });
                        return [2, res.json({ success: { data: structDates } })];
                    case 2:
                        error_2 = _a.sent();
                        next(error_2);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    ArtistBlockDateController.prototype.deleteBlockDateByArtist = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var blockDateIds, deleteBlockDate, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        blockDateIds = req.body.blockDateIds;
                        if (!blockDateIds.length)
                            throw new http_errors_1.BadRequest(resultMessage_1.artistBlockDateMessage.error.allField);
                        return [4, models_1.ArtistBlockDateSchema.updateOne({ "blockedDates._id": { $in: blockDateIds } }, {
                                $pull: {
                                    blockedDates: {
                                        _id: { $in: blockDateIds },
                                    },
                                },
                            })];
                    case 1:
                        deleteBlockDate = _a.sent();
                        if (!deleteBlockDate.matchedCount)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.artistBlockDateMessage.error.notDeleted);
                        return [2, res.json({
                                success: {
                                    message: resultMessage_1.artistBlockDateMessage.success.deleteBlockDate,
                                },
                            })];
                    case 2:
                        error_3 = _a.sent();
                        if ((error_3 === null || error_3 === void 0 ? void 0 : error_3.path) === "_id")
                            return [2, res.status(406).json({
                                    error: {
                                        message: resultMessage_1.artistBlockDateMessage.error.notDeleted,
                                    },
                                })];
                        next(error_3);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    return ArtistBlockDateController;
}());
exports.default = ArtistBlockDateController;
//# sourceMappingURL=artistBlockDate.controller.js.map