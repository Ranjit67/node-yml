"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserContent = (function () {
    function UserContent() {
    }
    UserContent.prototype.superAdminBlockUser = function (user) {
        return {
            subject: "Account Blocked",
            text: "Hi " + user.firstName + "\n            \n            We are sorry to let you know due to certain reasons your account has been blocked by the team. \n            Kindly contact us for more details. \n            Thanks.",
        };
    };
    UserContent.prototype.superAdminUnblockUser = function (user) {
        return {
            subject: "Account Unblocked.",
            text: "Hi " + user.firstName + "\n            \n      Congratulations, your account is now unblocked & now you can access our platform easily. \n      Sorry for the inconvenience caused. \n      Thanks.",
        };
    };
    UserContent.prototype.newManagerApprove = function () {
        return {
            subject: "New Manager.",
            text: "Hi\n          \n    A new manager has created an account on the platform & is currently under pending. \n    Kindly visit your manage users option to take action. \n    Thanks",
        };
    };
    UserContent.prototype.newArtistApproveRequestReceived = function () {
        return {
            subject: "New Artist.",
            text: "Hi\n          \n      A new artist has created an account on the platform & is currently under pending. \n      Kindly visit your manage users option to take action. \n      Thanks",
        };
    };
    UserContent.prototype.afterApproveRequest = function (user) {
        return {
            subject: "Account Approved.",
            text: "Hello " + user.firstName + "\n          \n       We are happy to let you know that your account has now been approved by the Skyrise team & you can now easily access all our functionalities. \n      Thanks for joining with Skyrise.\u2063",
        };
    };
    UserContent.prototype.emailOnSelfVerification = function (baseUrl, token) {
        return {
            subject: "Email verification.",
            text: "Thanks for registering with us. Kindly click on below link to verify your account and start using our platform.\n      The link validity is 15mins. \n      Link is \n     \n      ",
            link: baseUrl + "/password-reset/" + token,
        };
    };
    UserContent.prototype.emailForgetPassword = function (baseUrl, token) {
        return {
            subject: "Forget Password.",
            text: "Kindly click on below link to set a new password for your account.\n      The link validity is 15mins.\n      link is ",
            link: baseUrl + "/password-reset/" + token,
        };
    };
    UserContent.prototype.emailResetPassword = function (token) {
        return {
            subject: "Reset Password.",
            text: "Go to the dome url http://localhost:3000/verifyEmail/" + token,
        };
    };
    UserContent.prototype.managerRemoveRejection = function (user) {
        return {
            subject: "Remove Request Rejected.",
            text: "Hello " + user.firstName + ",\n      \n      Your request to get removed from managing your artist has been rejected by the artist. Kindly do contact the artist directly for queries or do reach us anytime. \n      Thanks",
        };
    };
    return UserContent;
}());
exports.default = UserContent;
//# sourceMappingURL=user.content.js.map