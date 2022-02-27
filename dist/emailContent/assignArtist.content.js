"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AssignArtistContent = (function () {
    function AssignArtistContent() {
    }
    AssignArtistContent.prototype.managerRequestSendManagerSide = function (user) {
        return {
            subject: "Artist Manage Request Pending",
            text: "Hi " + user.firstName + "\n                  \n      We have sent your request to manage the artist\u2019s account on skyrise to the artist. \n      Kindly wait for the artist's confirmation. \n      Thanks",
        };
    };
    AssignArtistContent.prototype.managerRequestSendArtistSide = function (user) {
        return {
            subject: "New Manager Request",
            text: "Hi " + user.firstName + "\n                    \n        You have received a new manager request who wants to manage your account. \n        Kindly visit your request option to take action. \n        Thanks",
        };
    };
    AssignArtistContent.prototype.managerRequestAcceptedByArtist = function (user) {
        return {
            subject: "Artist Manage Request Accepted",
            text: "Hi " + user.firstName + "\n                      \n      Congratulations, the artist has accepted your request to manage his account. \n      You can now manage your artist. \n      Thanks.",
        };
    };
    AssignArtistContent.prototype.artistAssignRemoveManagerSide = function (user) {
        return {
            subject: "Artist Access Removed",
            text: "Hi " + user.firstName + "\n                        \n        We are sorry to let you know that the artist has removed your access to manage his account. \n        Thanks",
        };
    };
    AssignArtistContent.prototype.managerRequestReject = function (user) {
        return {
            subject: "Artist Manage Request Rejected",
            text: "Hi " + user.firstName + "\n                        \n      We are sorry to let you know that the artist has rejected your request to manage his account. \n      Thanks.",
        };
    };
    return AssignArtistContent;
}());
exports.default = AssignArtistContent;
//# sourceMappingURL=assignArtist.content.js.map