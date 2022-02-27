"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var resultMessage_1 = require("../resultMessage");
var EventErrorHandler = (function () {
    function EventErrorHandler() {
    }
    EventErrorHandler.prototype.alreadyExistsName = function (res) {
        return res.status(409).json({
            error: { message: resultMessage_1.eventMessage.error.duplicateName },
        });
    };
    return EventErrorHandler;
}());
exports.default = EventErrorHandler;
//# sourceMappingURL=event.errorHandler.js.map