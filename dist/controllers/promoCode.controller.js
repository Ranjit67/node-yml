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
var models_1 = require("../models");
var http_errors_1 = require("http-errors");
var resultMessage_1 = require("../resultMessage");
var PromoCodeController = (function () {
    function PromoCodeController() {
    }
    PromoCodeController.prototype.create = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, numberOfTimeUsed, secretString, percentage, maxCashBack, startingDate, endingDate, promoCodeSave, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, numberOfTimeUsed = _a.numberOfTimeUsed, secretString = _a.secretString, percentage = _a.percentage, maxCashBack = _a.maxCashBack, startingDate = _a.startingDate, endingDate = _a.endingDate;
                        return [4, models_1.PromoCodeSchema.create({
                                numberOfTimeUsed: numberOfTimeUsed || "",
                                secretString: secretString,
                                percentage: percentage,
                                maxCashBack: maxCashBack || "",
                                startingDate: startingDate,
                                endingDate: endingDate,
                                timestamp: new Date(),
                            })];
                    case 1:
                        promoCodeSave = _b.sent();
                        if (!promoCodeSave)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.promoCodeMessage.error.notCreated);
                        res.json({ success: { message: resultMessage_1.promoCodeMessage.success.created } });
                        return [3, 3];
                    case 2:
                        error_1 = _b.sent();
                        next(error_1);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    PromoCodeController.prototype.getAll = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var promoCode, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, models_1.PromoCodeSchema.find()
                                .populate("appliedUser.user")
                                .select("-password")];
                    case 1:
                        promoCode = _a.sent();
                        res.json({ success: { data: promoCode } });
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
    PromoCodeController.prototype.getThroughSecretString = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var secretString, promoCode, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        secretString = req.params.secretString;
                        return [4, models_1.PromoCodeSchema.findOne({
                                secretString: secretString,
                            })
                                .populate("appliedUser.user")
                                .select("-password")];
                    case 1:
                        promoCode = _a.sent();
                        if (!promoCode)
                            throw new http_errors_1.NotFound(resultMessage_1.promoCodeMessage.error.notFound);
                        res.json({ success: { data: promoCode } });
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
    PromoCodeController.prototype.promoCodeApply = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, secretString, userID, amount, updatePromoCodeFirstTime, updatePromoCode, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.body, secretString = _a.secretString, userID = _a.userID, amount = _a.amount;
                        return [4, models_1.PromoCodeSchema.updateOne({
                                secretString: secretString,
                                "appliedUser.user": userID,
                            }, {
                                $push: {
                                    "appliedUser.$.numberOfTimeUsed": {
                                        benefitAmount: amount,
                                    },
                                },
                            })];
                    case 1:
                        updatePromoCodeFirstTime = _b.sent();
                        if (updatePromoCodeFirstTime.matchedCount)
                            return [2, res.json({
                                    success: { message: resultMessage_1.promoCodeMessage.success.applySuccess },
                                })];
                        return [4, models_1.PromoCodeSchema.updateOne({ secretString: secretString }, {
                                $push: {
                                    appliedUser: {
                                        user: userID,
                                        numberOfTimeUsed: [
                                            {
                                                benefitAmount: amount,
                                            },
                                        ],
                                    },
                                },
                            })];
                    case 2:
                        updatePromoCode = _b.sent();
                        if (!updatePromoCode.modifiedCount)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.promoCodeMessage.error.notApply);
                        res.json({ success: { message: resultMessage_1.promoCodeMessage.success.applySuccess } });
                        return [3, 4];
                    case 3:
                        error_4 = _b.sent();
                        next(error_4);
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    PromoCodeController.prototype.update = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, numberOfTimeUsed, secretString, percentage, maxCashBack, startingDate, endingDate, promoCodeId, findPromoCode, updatePromoCode, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.body, numberOfTimeUsed = _a.numberOfTimeUsed, secretString = _a.secretString, percentage = _a.percentage, maxCashBack = _a.maxCashBack, startingDate = _a.startingDate, endingDate = _a.endingDate, promoCodeId = _a.promoCodeId;
                        if (!promoCodeId)
                            throw new http_errors_1.BadRequest(resultMessage_1.promoCodeMessage.error.updateError1);
                        return [4, models_1.PromoCodeSchema.findOne({
                                secretString: secretString,
                            })];
                    case 1:
                        findPromoCode = _b.sent();
                        return [4, models_1.PromoCodeSchema.findByIdAndUpdate(promoCodeId, {
                                numberOfTimeUsed: numberOfTimeUsed || findPromoCode.numberOfTimeUsed,
                                secretString: secretString || findPromoCode.secretString,
                                percentage: percentage || findPromoCode.percentage,
                                maxCashBack: maxCashBack || findPromoCode.maxCashBack,
                                startingDate: startingDate || findPromoCode.startingDate,
                                endingDate: endingDate || findPromoCode.endingDate,
                            })];
                    case 2:
                        updatePromoCode = _b.sent();
                        if (!updatePromoCode)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.promoCodeMessage.error.updateError2);
                        res.json({
                            success: { message: resultMessage_1.promoCodeMessage.success.updateSuccess },
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
    PromoCodeController.prototype.delete = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var promoCodeIds, deletePromoCodes, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        promoCodeIds = req.body.promoCodeIds;
                        if (!promoCodeIds)
                            throw new http_errors_1.BadRequest(resultMessage_1.promoCodeMessage.error.updateError1);
                        return [4, models_1.PromoCodeSchema.deleteMany({
                                _id: { $in: promoCodeIds },
                            })];
                    case 1:
                        deletePromoCodes = _a.sent();
                        if (!deletePromoCodes)
                            throw new http_errors_1.NotFound(resultMessage_1.promoCodeMessage.error.notFound);
                        res.json({
                            success: { message: resultMessage_1.promoCodeMessage.success.deleteSuccess },
                        });
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
    return PromoCodeController;
}());
exports.default = PromoCodeController;
//# sourceMappingURL=promoCode.controller.js.map