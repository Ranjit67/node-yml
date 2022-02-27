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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config");
var https_1 = __importDefault(require("https"));
var http_errors_1 = require("http-errors");
var models_1 = require("../../models");
var resultMessage_1 = require("../../resultMessage");
var PaymentController = (function () {
    function PaymentController() {
    }
    PaymentController.prototype.refund = function (reqs, ress, next) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function () {
            var _g, transactionId, bookingId, booking, updatePaymentStatus, params, options, req, error_1;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        _h.trys.push([0, 3, , 4]);
                        _g = reqs.body, transactionId = _g.transactionId, bookingId = _g.bookingId;
                        if (!transactionId || !bookingId)
                            throw new http_errors_1.BadRequest(resultMessage_1.paymentMessage.error.allField);
                        return [4, models_1.BookingSchema.findById(bookingId).populate("payment")];
                    case 1:
                        booking = _h.sent();
                        if (!booking)
                            throw new http_errors_1.NotFound(resultMessage_1.paymentMessage.error.bookingNotFound);
                        if (!((_b = (_a = booking === null || booking === void 0 ? void 0 : booking.payment) === null || _a === void 0 ? void 0 : _a._id) === null || _b === void 0 ? void 0 : _b.toString()))
                            throw new http_errors_1.NotAcceptable(resultMessage_1.paymentMessage.error.paymentNot);
                        if (!((_c = booking === null || booking === void 0 ? void 0 : booking.payment) === null || _c === void 0 ? void 0 : _c.bankAmount))
                            throw new http_errors_1.NotAcceptable(resultMessage_1.paymentMessage.error.noAnyAmount);
                        if ((_d = booking === null || booking === void 0 ? void 0 : booking.payment) === null || _d === void 0 ? void 0 : _d.bankRefund)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.paymentMessage.error.paymentActionRefunded);
                        return [4, models_1.PaymentSchema.findByIdAndUpdate((_e = booking === null || booking === void 0 ? void 0 : booking.payment) === null || _e === void 0 ? void 0 : _e._id, { bankRefund: true, refundDate: new Date() })];
                    case 2:
                        updatePaymentStatus = _h.sent();
                        if (!updatePaymentStatus)
                            throw new http_errors_1.NotAcceptable(resultMessage_1.paymentMessage.error.paymentNotUpdated);
                        params = JSON.stringify({
                            transaction: transactionId,
                            amount: (_f = booking === null || booking === void 0 ? void 0 : booking.payment) === null || _f === void 0 ? void 0 : _f.bankAmount,
                        });
                        options = {
                            hostname: config_1.baseUrl,
                            port: 443,
                            path: "/refund",
                            method: "POST",
                            headers: {
                                Authorization: "Bearer " + config_1.testSecretKey,
                                "Content-Type": "application/json",
                            },
                        };
                        req = https_1.default
                            .request(options, function (res) {
                            var data = "";
                            res.on("data", function (chunk) {
                                data += chunk;
                            });
                            res.on("end", function () {
                                ress.json({
                                    success: {
                                        message: resultMessage_1.paymentMessage.success.paymentRefunded,
                                        data: JSON.parse(data),
                                    },
                                });
                            });
                        })
                            .on("error", function (error) {
                            throw error;
                        });
                        req.write(params);
                        req.end();
                        return [3, 4];
                    case 3:
                        error_1 = _h.sent();
                        next(error_1);
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    return PaymentController;
}());
exports.default = PaymentController;
//# sourceMappingURL=payment.controller.js.map