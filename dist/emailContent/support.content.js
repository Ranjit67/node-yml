"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SupportContent = (function () {
    function SupportContent() {
    }
    SupportContent.prototype.supportNotification = function () {
        return {
            subject: "New Support Message",
            text: "Hi\n                \n        You have received a new support message. \n        Kindly visit your support option to take action. \n        Thanks.",
        };
    };
    SupportContent.prototype.supportEmailContent = function (user, message, subject) {
        return {
            subject: subject,
            text: "Hi  " + user.firstName + ".\n\n        " + message,
        };
    };
    return SupportContent;
}());
exports.default = SupportContent;
//# sourceMappingURL=support.content.js.map