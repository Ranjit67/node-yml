"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var resultMessage_1 = require("../resultMessage");
var UserErrorHandler = (function () {
    function UserErrorHandler() {
    }
    UserErrorHandler.prototype.emailAlreadyExists = function (res) {
        return res.status(409).json({
            error: { message: resultMessage_1.userMessage.error.duplicateEmail },
        });
    };
    UserErrorHandler.prototype.phoneAlreadyExists = function (res) {
        return res.status(409).json({
            error: { message: resultMessage_1.userMessage.error.duplicatePhone },
        });
    };
    return UserErrorHandler;
}());
exports.default = UserErrorHandler;
//# sourceMappingURL=user.errorHandler.js.map