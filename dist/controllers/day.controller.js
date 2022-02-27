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
var DayController = (function () {
    function DayController() {
    }
    DayController.prototype.create = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var num, findData, day, saveDay, checkNumIsThere, updateData, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        num = req.body.num;
                        if (num < 1 || !num)
                            throw new http_errors_1.BadRequest(resultMessage_1.dayMessage.error.num);
                        return [4, models_1.DaySchema.findOne()];
                    case 1:
                        findData = _a.sent();
                        if (!!findData) return [3, 3];
                        day = new models_1.DaySchema({
                            days: [
                                {
                                    day: num,
                                    timestamp: new Date(),
                                },
                            ],
                        });
                        return [4, day.save()];
                    case 2:
                        saveDay = _a.sent();
                        if (!saveDay)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.dayMessage.error.notSave);
                        return [2, res.json({
                                success: {
                                    message: resultMessage_1.dayMessage.success.save,
                                },
                            })];
                    case 3: return [4, models_1.DaySchema.findOne({ "days.day": num })];
                    case 4:
                        checkNumIsThere = _a.sent();
                        if (checkNumIsThere)
                            throw new http_errors_1.BadRequest(resultMessage_1.dayMessage.error.duplicateName);
                        return [4, models_1.DaySchema.findOneAndUpdate({}, {
                                $push: {
                                    days: {
                                        day: num,
                                        timestamp: new Date(),
                                    },
                                },
                            })];
                    case 5:
                        updateData = _a.sent();
                        if (!updateData)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.dayMessage.error.notSave);
                        return [2, res.json({
                                success: {
                                    message: resultMessage_1.dayMessage.success.save,
                                },
                            })];
                    case 6: return [3, 8];
                    case 7:
                        error_1 = _a.sent();
                        next(error_1);
                        return [3, 8];
                    case 8: return [2];
                }
            });
        });
    };
    DayController.prototype.getAllDay = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var day, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, models_1.DaySchema.findOne().select("-__v")];
                    case 1:
                        day = _a.sent();
                        if (!day)
                            return [2, res.json({ data: [] })];
                        res.json({
                            success: {
                                data: day.days,
                            },
                        });
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
    DayController.prototype.update = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, oldNum, newNum, updateData, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, oldNum = _a.oldNum, newNum = _a.newNum;
                        if (newNum < 1)
                            throw new http_errors_1.BadRequest(resultMessage_1.dayMessage.error.num);
                        return [4, models_1.DaySchema.findOneAndUpdate({ "days.day": oldNum }, {
                                "days.$.day": newNum,
                            })];
                    case 1:
                        updateData = _b.sent();
                        if (!updateData)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.dayMessage.error.notUpdated);
                        return [2, res.json({
                                success: {
                                    message: resultMessage_1.dayMessage.success.updated,
                                },
                            })];
                    case 2:
                        error_3 = _b.sent();
                        next(error_3);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    DayController.prototype.delete = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var numArray, deleteDay, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        numArray = req.body.numArray;
                        if (!numArray.length)
                            throw new http_errors_1.BadRequest(resultMessage_1.dayMessage.error.numArray);
                        return [4, models_1.DaySchema.findOneAndUpdate({}, {
                                $pull: {
                                    days: {
                                        day: {
                                            $in: numArray,
                                        },
                                    },
                                },
                            })];
                    case 1:
                        deleteDay = _a.sent();
                        if (!deleteDay)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.dayMessage.error.notDelete);
                        return [2, res.json({
                                success: {
                                    message: resultMessage_1.dayMessage.success.delete,
                                },
                            })];
                    case 2:
                        error_4 = _a.sent();
                        next(error_4);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    return DayController;
}());
exports.default = DayController;
//# sourceMappingURL=day.controller.js.map