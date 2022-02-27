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
var OrderController = (function () {
    function OrderController() {
    }
    OrderController.prototype.create = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, bookingId, status_1, orderSave, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, bookingId = _a.bookingId, status_1 = _a.status;
                        if (!bookingId || !status_1)
                            throw new http_errors_1.BadRequest(resultMessage_1.orderMessage.error.allField);
                        return [4, models_1.OrderSchema.create({
                                booking: bookingId,
                                status: status_1,
                            })];
                    case 1:
                        orderSave = _b.sent();
                        if (!orderSave)
                            throw new http_errors_1.GatewayTimeout(resultMessage_1.orderMessage.error.notCreated);
                        res.json({
                            success: {
                                message: resultMessage_1.orderMessage.success.created,
                            },
                        });
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
    OrderController.prototype.update = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, orderId, bookingId, status_2, updateOrder, orderDelete, createOrder, bookingUpdate, bookingUpdate, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 8, , 9]);
                        _a = req.body, orderId = _a.orderId, bookingId = _a.bookingId, status_2 = _a.status;
                        if (!orderId || !bookingId)
                            throw new http_errors_1.BadRequest(resultMessage_1.orderMessage.error.allField);
                        return [4, models_1.OrderSchema.findOneAndUpdate({
                                _id: orderId,
                                booking: bookingId,
                                status: {
                                    $ne: "confirm",
                                },
                            }, { status: status_2 })];
                    case 1:
                        updateOrder = _b.sent();
                        if (!updateOrder)
                            throw new http_errors_1.GatewayTimeout(resultMessage_1.orderMessage.error.notMatch);
                        if (!(status_2 === "cancel" || status_2 === "failed")) return [3, 5];
                        return [4, models_1.OrderSchema.findOneAndDelete({
                                _id: orderId,
                            })];
                    case 2:
                        orderDelete = _b.sent();
                        if (!orderDelete)
                            throw new http_errors_1.GatewayTimeout(resultMessage_1.orderMessage.error.notDelete);
                        return [4, models_1.OrderSchema.create({
                                booking: bookingId,
                                status: status_2,
                            })];
                    case 3:
                        createOrder = _b.sent();
                        return [4, models_1.BookingSchema.findOneAndUpdate({
                                _id: bookingId,
                            }, {
                                orderId: createOrder._id,
                            })];
                    case 4:
                        bookingUpdate = _b.sent();
                        if (!createOrder)
                            throw new http_errors_1.GatewayTimeout(resultMessage_1.orderMessage.error.newNotCreated);
                        return [3, 7];
                    case 5: return [4, models_1.BookingSchema.findOneAndUpdate({
                            _id: bookingId,
                        }, {
                            orderId: orderId,
                        })];
                    case 6:
                        bookingUpdate = _b.sent();
                        _b.label = 7;
                    case 7:
                        res.json({
                            success: {
                                message: resultMessage_1.orderMessage.success.paymentSuccess,
                            },
                        });
                        return [3, 9];
                    case 8:
                        error_2 = _b.sent();
                        next(error_2);
                        return [3, 9];
                    case 9: return [2];
                }
            });
        });
    };
    OrderController.prototype.getByBookingId = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var bookingId, findOrder, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        bookingId = req.params.bookingId;
                        if (!bookingId)
                            throw new http_errors_1.BadRequest(resultMessage_1.orderMessage.error.allField);
                        return [4, models_1.OrderSchema.findOne({ booking: bookingId })];
                    case 1:
                        findOrder = _a.sent();
                        if (!findOrder)
                            throw new http_errors_1.GatewayTimeout(resultMessage_1.orderMessage.error.notFound);
                        res.json({
                            success: {
                                data: findOrder,
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
    return OrderController;
}());
exports.default = OrderController;
//# sourceMappingURL=order.controller.js.map