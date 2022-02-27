"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PersonalizeMessageContent = (function () {
    function PersonalizeMessageContent() {
    }
    PersonalizeMessageContent.prototype.personalizeMessageReceived = function (user) {
        return {
            subject: "Personalize Video Received",
            text: "Hi " + user.firstName + "\n            \n      Hello, you have received your personalized video which you had booked for. \n      Kindly check it in your personalized message option. \n      Thanks",
        };
    };
    return PersonalizeMessageContent;
}());
exports.default = PersonalizeMessageContent;
//# sourceMappingURL=personalizeMessage.content.js.map