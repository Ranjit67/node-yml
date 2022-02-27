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
var resultMessage_1 = require("../resultMessage");
var models_1 = require("../models");
var WalletController = (function () {
    function WalletController() {
    }
    WalletController.prototype.create = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, userId, balance, spent, transactionType, walletSave, walletHistory, walletHistorySave, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.body, userId = _a.userId, balance = _a.balance, spent = _a.spent, transactionType = _a.transactionType;
                        if (!userId)
                            throw new http_errors_1.BadRequest(resultMessage_1.walletMessage.error.allField);
                        return [4, models_1.WalletSchema.create({
                                user: userId,
                                balance: balance !== null && balance !== void 0 ? balance : 0,
                                spent: spent !== null && spent !== void 0 ? spent : 0,
                            })];
                    case 1:
                        walletSave = _b.sent();
                        if (!walletSave)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.walletMessage.error.notCreated);
                        walletHistory = new models_1.WalletHistorySchema({
                            user: userId,
                        });
                        walletHistory.transactionHistory.push({
                            type: transactionType,
                            amount: balance !== null && balance !== void 0 ? balance : 0,
                            title: "Add money",
                            description: "Add money in wallet.",
                            timestamp: new Date(),
                        });
                        return [4, walletHistory.save()];
                    case 2:
                        walletHistorySave = _b.sent();
                        if (!walletHistorySave)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.walletMessage.error.notAddedHistory);
                        res.json({
                            success: {
                                message: resultMessage_1.walletMessage.success.created,
                            },
                        });
                        return [3, 4];
                    case 3:
                        error_1 = _b.sent();
                        next(error_1);
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    WalletController.prototype.getWallet = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, findWallet, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = req.params.userId;
                        return [4, models_1.WalletSchema.findOne({ user: userId }).select("-__v")];
                    case 1:
                        findWallet = _a.sent();
                        if (!findWallet)
                            return [2, res.json({ success: { data: { balance: 0, spent: 0 } } })];
                        return [2, res.json({ success: { data: findWallet } })];
                    case 2:
                        error_2 = _a.sent();
                        next(error_2);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    WalletController.prototype.walletUpdate = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, userId, balance, spent, transactionAmount, transactionType, title, description, findWalletAndUpdate, updateWalletHistory, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.body, userId = _a.userId, balance = _a.balance, spent = _a.spent, transactionAmount = _a.transactionAmount, transactionType = _a.transactionType, title = _a.title, description = _a.description;
                        if (!userId)
                            throw new http_errors_1.BadRequest(resultMessage_1.walletMessage.error.allField);
                        return [4, models_1.WalletSchema.findOneAndUpdate({ user: userId }, {
                                balance: balance,
                                spent: spent,
                            })];
                    case 1:
                        findWalletAndUpdate = _b.sent();
                        return [4, models_1.WalletHistorySchema.findOneAndUpdate({ user: userId }, {
                                $push: {
                                    transactionHistory: {
                                        type: transactionType,
                                        amount: transactionAmount,
                                        title: title,
                                        description: description,
                                    },
                                },
                            })];
                    case 2:
                        updateWalletHistory = _b.sent();
                        res.json({ success: { message: resultMessage_1.walletMessage.success.updated } });
                        return [3, 4];
                    case 3:
                        error_3 = _b.sent();
                        next(error_3);
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    return WalletController;
}());
exports.default = WalletController;
//# sourceMappingURL=wallet.controller.js.map