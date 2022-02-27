"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var FilterController = (function () {
    function FilterController() {
    }
    FilterController.prototype.getFilterData = function (req, res, next) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var _e, lat_1, lng_1, range_1, categoriesIds, eventsIds, servicesIds, languagesIds, countriesNames, price, ratings_1, dates, genders, _f, limit, skip, deg2rad_1, getDistanceFromLatLonInKm_1, categoryFilters, distanceFilter, getIds, findPriceMinMax_1, _g, priceFinalResult, ratingData, changeDateFormat, availabilityData_1, _h, findArtistThroughAvailabilityDate, limitRange, error_1;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        _j.trys.push([0, 8, , 9]);
                        _e = req.body, lat_1 = _e.lat, lng_1 = _e.lng, range_1 = _e.range, categoriesIds = _e.categoriesIds, eventsIds = _e.eventsIds, servicesIds = _e.servicesIds, languagesIds = _e.languagesIds, countriesNames = _e.countriesNames, price = _e.price, ratings_1 = _e.ratings, dates = _e.dates, genders = _e.genders;
                        _f = req.params, limit = _f.limit, skip = _f.skip;
                        deg2rad_1 = function (deg) {
                            return deg * (Math.PI / 180);
                        };
                        getDistanceFromLatLonInKm_1 = function (currentLan, currentLng, haveLan, haveLng) {
                            var R = 6371;
                            var dLat = deg2rad_1(haveLan - currentLan);
                            var dLon = deg2rad_1(haveLng - currentLng);
                            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                                Math.cos(deg2rad_1(currentLan)) *
                                    Math.cos(deg2rad_1(haveLan)) *
                                    Math.sin(dLon / 2) *
                                    Math.sin(dLon / 2);
                            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                            var d = R * c;
                            return d;
                        };
                        return [4, models_1.UserSchema.find({
                                role: "artist",
                                status: "active",
                                category: (categoriesIds === null || categoriesIds === void 0 ? void 0 : categoriesIds.length)
                                    ? { $in: categoriesIds }
                                    : { $exists: true },
                                events: (eventsIds === null || eventsIds === void 0 ? void 0 : eventsIds.length) ? { $in: eventsIds } : { $exists: true },
                                gender: (genders === null || genders === void 0 ? void 0 : genders.length) ? { $in: genders } : { $exists: true },
                                services: (servicesIds === null || servicesIds === void 0 ? void 0 : servicesIds.length)
                                    ? {
                                        $in: servicesIds,
                                    }
                                    : { $exists: true },
                                languages: (languagesIds === null || languagesIds === void 0 ? void 0 : languagesIds.length)
                                    ? {
                                        $in: languagesIds,
                                    }
                                    : { $exists: true },
                                "location.country": (countriesNames === null || countriesNames === void 0 ? void 0 : countriesNames.length)
                                    ? {
                                        $in: countriesNames,
                                    }
                                    : {
                                        $exists: true,
                                    },
                            }).select("-fcmToken -password -profileImageRef -__v")];
                    case 1:
                        categoryFilters = _j.sent();
                        distanceFilter = lat_1 && lng_1 && range_1
                            ? categoryFilters
                                .map(function (item) {
                                var _a, _b;
                                return __assign(__assign({}, item === null || item === void 0 ? void 0 : item._doc), { distance: getDistanceFromLatLonInKm_1(lat_1, lng_1, (_a = item === null || item === void 0 ? void 0 : item._doc) === null || _a === void 0 ? void 0 : _a.location.lat, (_b = item === null || item === void 0 ? void 0 : item._doc) === null || _b === void 0 ? void 0 : _b.location.lng) });
                            })
                                .filter(function (item) { return item.distance < range_1; })
                            : categoryFilters;
                        getIds = price ? distanceFilter.map(function (idGet) { return idGet._id; }) : [];
                        if (!(getIds === null || getIds === void 0 ? void 0 : getIds.length)) return [3, 3];
                        return [4, models_1.PricingSchema.find({
                                artist: { $in: getIds },
                                $and: [
                                    { "prices.pricePerHour": { $gte: +price.min } },
                                    { "prices.pricePerHour": { $lte: +price.max } },
                                ],
                            })];
                    case 2:
                        _g = _j.sent();
                        return [3, 4];
                    case 3:
                        _g = distanceFilter;
                        _j.label = 4;
                    case 4:
                        findPriceMinMax_1 = _g;
                        priceFinalResult = ((_b = (_a = findPriceMinMax_1 === null || findPriceMinMax_1 === void 0 ? void 0 : findPriceMinMax_1[0]) === null || _a === void 0 ? void 0 : _a._id) === null || _b === void 0 ? void 0 : _b.toString()) ===
                            ((_d = (_c = distanceFilter === null || distanceFilter === void 0 ? void 0 : distanceFilter[0]) === null || _c === void 0 ? void 0 : _c._id) === null || _d === void 0 ? void 0 : _d.toString())
                            ? findPriceMinMax_1
                            : distanceFilter.filter(function (outer) {
                                return findPriceMinMax_1.find(function (inner) { return (inner === null || inner === void 0 ? void 0 : inner.artist.toString()) === outer._id.toString(); });
                            });
                        ratingData = (ratings_1 === null || ratings_1 === void 0 ? void 0 : ratings_1.length)
                            ? priceFinalResult === null || priceFinalResult === void 0 ? void 0 : priceFinalResult.filter(function (outer) {
                                return ratings_1.indexOf(Math.floor(outer === null || outer === void 0 ? void 0 : outer.ratings)) !== -1;
                            })
                            : priceFinalResult;
                        changeDateFormat = (dates === null || dates === void 0 ? void 0 : dates.length)
                            ? dates.map(function (ele) { return new Date(ele).toDateString(); })
                            : [];
                        if (!(changeDateFormat === null || changeDateFormat === void 0 ? void 0 : changeDateFormat.length)) return [3, 6];
                        return [4, models_1.ArtistBlockDateSchema.find({
                                $or: [
                                    {
                                        "blockedDates.dateDayFormat": { $nin: changeDateFormat },
                                    },
                                ],
                            })];
                    case 5:
                        _h = _j.sent();
                        return [3, 7];
                    case 6:
                        _h = [];
                        _j.label = 7;
                    case 7:
                        availabilityData_1 = _h;
                        findArtistThroughAvailabilityDate = (availabilityData_1 === null || availabilityData_1 === void 0 ? void 0 : availabilityData_1.length)
                            ? ratingData.filter(function (outer) {
                                return availabilityData_1.find(function (inner) {
                                    return inner === null || inner === void 0 ? void 0 : inner.artist.toString().includes(outer._id.toString());
                                });
                            })
                            : ratingData;
                        limitRange = limit && skip
                            ? findArtistThroughAvailabilityDate.slice(+skip, +limit)
                            : findArtistThroughAvailabilityDate;
                        res.json({
                            success: {
                                data: limitRange,
                            },
                        });
                        return [3, 9];
                    case 8:
                        error_1 = _j.sent();
                        next(error_1);
                        return [3, 9];
                    case 9: return [2];
                }
            });
        });
    };
    FilterController.prototype.getFilterData2 = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, lat, lng, range, categoriesIds, eventsIds, servicesIds, languagesIds, countriesNames, price, ratings, _b, limit, skip, deg2rad_2, getDistanceFromLatLonInKm, userData, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _a = req.body, lat = _a.lat, lng = _a.lng, range = _a.range, categoriesIds = _a.categoriesIds, eventsIds = _a.eventsIds, servicesIds = _a.servicesIds, languagesIds = _a.languagesIds, countriesNames = _a.countriesNames, price = _a.price, ratings = _a.ratings;
                        _b = req.params, limit = _b.limit, skip = _b.skip;
                        deg2rad_2 = function (deg) {
                            return deg * (Math.PI / 180);
                        };
                        getDistanceFromLatLonInKm = function (currentLan, currentLng, haveLan, haveLng) {
                            var R = 6371;
                            var dLat = deg2rad_2(haveLan - currentLan);
                            var dLon = deg2rad_2(haveLng - currentLng);
                            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                                Math.cos(deg2rad_2(currentLan)) *
                                    Math.cos(deg2rad_2(haveLan)) *
                                    Math.sin(dLon / 2) *
                                    Math.sin(dLon / 2);
                            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                            var d = R * c;
                            return d;
                        };
                        return [4, models_1.UserSchema.aggregate([
                                { $match: { status: "active", role: "artist" } },
                            ])];
                    case 1:
                        userData = _c.sent();
                        res.json({
                            success: {
                                data: userData,
                            },
                        });
                        return [3, 3];
                    case 2:
                        error_2 = _c.sent();
                        next(error_2);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    return FilterController;
}());
exports.default = FilterController;
//# sourceMappingURL=filter.controller.js.map