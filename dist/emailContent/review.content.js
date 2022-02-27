"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReviewContent = (function () {
    function ReviewContent() {
    }
    ReviewContent.prototype.newReview = function (user) {
        return {
            subject: "New Review Received",
            text: "Hi " + user.firstName + "\n              \n      You have received a new review on your profile. \n      Kindly visit your profile to check. \n      Thanks.",
        };
    };
    return ReviewContent;
}());
exports.default = ReviewContent;
//# sourceMappingURL=review.content.js.map