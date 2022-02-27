"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RequestContent = (function () {
    function RequestContent() {
    }
    RequestContent.prototype.managerRemove = function (user) {
        return {
            subject: "Manager Remove Request",
            text: "Hi " + user.firstName + "\n                \n        Your manager wants to remove his access to managing your account. \n        Kindly visit your request option to take action. \n        Thanks.",
        };
    };
    return RequestContent;
}());
exports.default = RequestContent;
//# sourceMappingURL=request.content.js.map