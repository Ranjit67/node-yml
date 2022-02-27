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
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models");
var http_errors_1 = require("http-errors");
var resultMessage_1 = require("../resultMessage");
var PriceUpdateUser = (function () {
    function PriceUpdateUser() {
    }
    PriceUpdateUser.prototype.updateMinPriceUser = function (artistId) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var findPriceArtist, updateUserMinPrice, error_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 3, , 4]);
                        return [4, models_1.PricingSchema.findOne({
                                artist: artistId,
                            })];
                    case 1:
                        findPriceArtist = _d.sent();
                        findPriceArtist === null || findPriceArtist === void 0 ? void 0 : findPriceArtist.prices.sort(function (a, b) { return (a === null || a === void 0 ? void 0 : a.pricePerHour) - (b === null || b === void 0 ? void 0 : b.pricePerHour); });
                        return [4, models_1.UserSchema.findByIdAndUpdate(artistId, {
                                minPrice: (_a = findPriceArtist === null || findPriceArtist === void 0 ? void 0 : findPriceArtist.prices) === null || _a === void 0 ? void 0 : _a[0].pricePerHour,
                                maxPrice: (_b = findPriceArtist === null || findPriceArtist === void 0 ? void 0 : findPriceArtist.prices) === null || _b === void 0 ? void 0 : _b[((_c = findPriceArtist === null || findPriceArtist === void 0 ? void 0 : findPriceArtist.prices) === null || _c === void 0 ? void 0 : _c.length) - 1].pricePerHour,
                                pricing: findPriceArtist === null || findPriceArtist === void 0 ? void 0 : findPriceArtist._id,
                            })];
                    case 2:
                        updateUserMinPrice = _d.sent();
                        if (!updateUserMinPrice)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.pricingMessage.error.pricingNotUpdated);
                        return [3, 4];
                    case 3:
                        error_1 = _d.sent();
                        throw error_1;
                    case 4: return [2];
                }
            });
        });
    };
    return PriceUpdateUser;
}());
var PricingController = (function (_super) {
    __extends(PricingController, _super);
    function PricingController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PricingController.prototype.create = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, artistId, numberOfDays, pricePerHour, maxCrowdSize, minCrowdSize, lat, lng, address, country, otherDay, otherCrowdSize, checkData, updateFirst, artistPriceSave, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        _a = req.body, artistId = _a.artistId, numberOfDays = _a.numberOfDays, pricePerHour = _a.pricePerHour, maxCrowdSize = _a.maxCrowdSize, minCrowdSize = _a.minCrowdSize, lat = _a.lat, lng = _a.lng, address = _a.address, country = _a.country, otherDay = _a.otherDay, otherCrowdSize = _a.otherCrowdSize;
                        if (!artistId ||
                            !numberOfDays ||
                            !pricePerHour ||
                            !maxCrowdSize ||
                            !minCrowdSize ||
                            !lat ||
                            !lng ||
                            !address ||
                            !country)
                            throw new http_errors_1.BadRequest(resultMessage_1.pricingMessage.error.allField);
                        return [4, models_1.PricingSchema.findOne({
                                artist: artistId,
                                prices: {
                                    $elemMatch: {
                                        numberOfDays: +numberOfDays,
                                        pricePerHour: +pricePerHour,
                                        maxCrowdSize: +maxCrowdSize,
                                        minCrowdSize: +minCrowdSize,
                                        location: {
                                            lat: +lat,
                                            lng: +lng,
                                            address: address,
                                            country: country,
                                        },
                                    },
                                },
                            })];
                    case 1:
                        checkData = _b.sent();
                        if (checkData)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.pricingMessage.error.samePaired);
                        return [4, models_1.PricingSchema.updateOne({ artist: artistId }, {
                                $push: {
                                    prices: {
                                        numberOfDays: +numberOfDays,
                                        pricePerHour: +pricePerHour,
                                        maxCrowdSize: +maxCrowdSize,
                                        minCrowdSize: +minCrowdSize,
                                        location: {
                                            lat: +lat,
                                            lng: +lng,
                                            address: address,
                                            country: country,
                                        },
                                        timestamp: new Date(),
                                        otherDay: otherDay,
                                        otherCrowdSize: otherCrowdSize,
                                    },
                                },
                            })];
                    case 2:
                        updateFirst = _b.sent();
                        if (!updateFirst.matchedCount) return [3, 4];
                        return [4, _super.prototype.updateMinPriceUser.call(this, artistId)];
                    case 3:
                        _b.sent();
                        return [2, res.json({
                                success: { message: resultMessage_1.pricingMessage.success.newPricingAdded },
                            })];
                    case 4: return [4, models_1.PricingSchema.create({
                            artist: artistId,
                            prices: [
                                {
                                    numberOfDays: +numberOfDays,
                                    pricePerHour: +pricePerHour,
                                    maxCrowdSize: +maxCrowdSize,
                                    minCrowdSize: +minCrowdSize,
                                    location: {
                                        lat: +lat,
                                        lng: +lng,
                                        address: address,
                                        country: country,
                                    },
                                    timestamp: new Date(),
                                    otherDay: otherDay,
                                    otherCrowdSize: otherCrowdSize,
                                },
                            ],
                        })];
                    case 5:
                        artistPriceSave = _b.sent();
                        if (!artistPriceSave)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.pricingMessage.error.notSave);
                        return [4, _super.prototype.updateMinPriceUser.call(this, artistId)];
                    case 6:
                        _b.sent();
                        res.json({ success: { message: resultMessage_1.pricingMessage.success.create } });
                        return [3, 8];
                    case 7:
                        error_2 = _b.sent();
                        next(error_2);
                        return [3, 8];
                    case 8: return [2];
                }
            });
        });
    };
    PricingController.prototype.getAll = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var artistId, findPricing, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        artistId = req.params.artistId;
                        return [4, models_1.PricingSchema.findOne({
                                artist: artistId,
                            })];
                    case 1:
                        findPricing = _a.sent();
                        if (!findPricing)
                            return [2, res.json({ success: { data: [] } })];
                        return [2, res.json({ success: { data: findPricing.prices } })];
                    case 2:
                        error_3 = _a.sent();
                        next(error_3);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    PricingController.prototype.update = function (req, res, next) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function () {
            var _g, artistId, pricingId_1, numberOfDays, pricePerHour, maxCrowdSize, minCrowdSize, lat, lng, address, country, otherDay, otherCrowdSize, findPricing, dataUpdate, updatePricing, error_4;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        _h.trys.push([0, 3, , 4]);
                        _g = req.body, artistId = _g.artistId, pricingId_1 = _g.pricingId, numberOfDays = _g.numberOfDays, pricePerHour = _g.pricePerHour, maxCrowdSize = _g.maxCrowdSize, minCrowdSize = _g.minCrowdSize, lat = _g.lat, lng = _g.lng, address = _g.address, country = _g.country, otherDay = _g.otherDay, otherCrowdSize = _g.otherCrowdSize;
                        return [4, models_1.PricingSchema.findOne({
                                artist: artistId,
                            })];
                    case 1:
                        findPricing = _h.sent();
                        dataUpdate = findPricing.prices.find(function (item) { return item._id.toString() === pricingId_1.toString(); });
                        if (!dataUpdate)
                            throw new http_errors_1.BadRequest(resultMessage_1.pricingMessage.error.notFoundPricingId);
                        return [4, models_1.PricingSchema.updateOne({
                                artist: artistId,
                                "prices._id": pricingId_1,
                            }, {
                                "prices.$.numberOfDays": numberOfDays !== null && numberOfDays !== void 0 ? numberOfDays : dataUpdate.numberOfDays,
                                "prices.$.pricePerHour": pricePerHour !== null && pricePerHour !== void 0 ? pricePerHour : dataUpdate.pricePerHour,
                                "prices.$.maxCrowdSize": maxCrowdSize !== null && maxCrowdSize !== void 0 ? maxCrowdSize : dataUpdate.maxCrowdSize,
                                "prices.$.minCrowdSize": minCrowdSize !== null && minCrowdSize !== void 0 ? minCrowdSize : dataUpdate.minCrowdSize,
                                "prices.$.location.lat": (_a = +lat) !== null && _a !== void 0 ? _a : (_b = dataUpdate === null || dataUpdate === void 0 ? void 0 : dataUpdate.location) === null || _b === void 0 ? void 0 : _b.lat,
                                "prices.$.location.lan": (_c = +lng) !== null && _c !== void 0 ? _c : (_d = dataUpdate === null || dataUpdate === void 0 ? void 0 : dataUpdate.location) === null || _d === void 0 ? void 0 : _d.lng,
                                "prices.$.location.address": address !== null && address !== void 0 ? address : (_e = dataUpdate === null || dataUpdate === void 0 ? void 0 : dataUpdate.location) === null || _e === void 0 ? void 0 : _e.address,
                                "prices.$.location.country": country !== null && country !== void 0 ? country : (_f = dataUpdate === null || dataUpdate === void 0 ? void 0 : dataUpdate.location) === null || _f === void 0 ? void 0 : _f.country,
                                "prices.$.otherDay": otherDay !== null && otherDay !== void 0 ? otherDay : dataUpdate.otherDay,
                                "prices.$.otherCrowdSize": otherCrowdSize !== null && otherCrowdSize !== void 0 ? otherCrowdSize : dataUpdate.otherCrowdSize,
                            })];
                    case 2:
                        updatePricing = _h.sent();
                        if (updatePricing.modifiedCount)
                            return [2, res.json({
                                    success: { message: resultMessage_1.pricingMessage.success.update },
                                })];
                        res.json({ success: { message: resultMessage_1.pricingMessage.success.noChanges } });
                        return [3, 4];
                    case 3:
                        error_4 = _h.sent();
                        next(error_4);
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    PricingController.prototype.delete = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, artistId, pricingIds, removeOnePricing, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, artistId = _a.artistId, pricingIds = _a.pricingIds;
                        if (!artistId || !(pricingIds === null || pricingIds === void 0 ? void 0 : pricingIds.length))
                            throw new http_errors_1.BadRequest(resultMessage_1.pricingMessage.error.allField);
                        return [4, models_1.PricingSchema.findOneAndUpdate({ artist: artistId }, { $pull: { prices: { _id: { $in: pricingIds } } } })];
                    case 1:
                        removeOnePricing = _b.sent();
                        if (!removeOnePricing)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.pricingMessage.error.notRemove);
                        res.json({ success: { message: resultMessage_1.pricingMessage.success.deletePrices } });
                        return [3, 3];
                    case 2:
                        error_5 = _b.sent();
                        next(error_5);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    PricingController.prototype.fake = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var artistId, findAllPrice, getAllArtistId, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        artistId = req.body.artistId;
                        return [4, models_1.PricingSchema.find()];
                    case 1:
                        findAllPrice = _a.sent();
                        getAllArtistId = findAllPrice.map(function (item) { return item.artist; });
                        return [3, 3];
                    case 2:
                        error_6 = _a.sent();
                        next(error_6);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    return PricingController;
}(PriceUpdateUser));
exports.default = PricingController;
//# sourceMappingURL=pricing.controller.js.map