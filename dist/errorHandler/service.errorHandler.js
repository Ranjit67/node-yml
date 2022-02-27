"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var resultMessage_1 = require("../resultMessage");
var ServiceErrorHandler = (function () {
    function ServiceErrorHandler() {
    }
    ServiceErrorHandler.prototype.allAlreadyExists = function (res) {
        return res.status(409).json({
            error: { message: resultMessage_1.serviceMessage.error.duplicateName },
        });
    };
    return ServiceErrorHandler;
}());
exports.default = ServiceErrorHandler;
//# sourceMappingURL=service.errorHandler.js.map