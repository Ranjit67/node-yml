"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BookingContent = (function () {
    function BookingContent() {
    }
    BookingContent.prototype.newBookingUser = function () {
        return {
            subject: "Booking Successful",
            text: "Hi\n      Congratulations, your booking is successfully completed.\n      Kindly wait for the artist's confirmation.\n      Thanks",
        };
    };
    BookingContent.prototype.bookingRequestSubmit = function () {
        return {
            subject: "Booking Request Submitted Successfully",
            text: "Hi\n      Your booking request has been submitted successfully to the artist. \n      Kindly wait for a reply from the artist. \n      Thanks",
        };
    };
    BookingContent.prototype.newBookingArtist = function () {
        return {
            subject: "New Booking Received.",
            text: "Hi\n      You have received a new booking. \n      Kindly check in your booking option to take action. \n      Thanks",
        };
    };
    BookingContent.prototype.bookingConfirmUser = function (user) {
        return {
            subject: "Booking Confirmed.",
            text: "Hi " + user.firstName + "\n\n      Congratulations, your booking has been accepted by the artist. \n      Thanks for booking with us.",
        };
    };
    BookingContent.prototype.bookingCancelArtist = function (user) {
        return {
            subject: "Booking Cancelled By Artist.",
            text: "Hi " + user.firstName + "\n      We are sorry to inform you that your last booking got cancelled by the artist. \n      Your 100% refund has already been initiated. \n      Thanks",
        };
    };
    BookingContent.prototype.bookingCancelNotifyToSuperAdmin = function () {
        return {
            subject: "Booking Cancelled By Artist.",
            text: "Hi\n      The artist has cancelled the booked event due to certain reasons. 100% refund has been initiated to the customer for the same. \n      Thanks.",
        };
    };
    BookingContent.prototype.bookingCancelByUser = function (artist) {
        return {
            subject: "Booking Cancelled By Customer.",
            text: "Hi " + artist.firstName + "\n\n      We are sorry to let you know that the customer has cancelled his booking due to certain reasons. \n      Thanks",
        };
    };
    BookingContent.prototype.bookingCancelByArtistSelf = function (user) {
        return {
            subject: "Booking Cancelled",
            text: "Hi " + user.firstName + "\n\n      We are sorry to let you know that the customer has cancelled his booking due to certain reasons. \n      Thanks",
        };
    };
    BookingContent.prototype.bookingRequestReceivedByArtist = function () {
        return {
            subject: "Booking Request Received",
            text: "Hi \n      \n      You have received a booking request. \n      Kindly visit your request option to take action. \n      Thanks",
        };
    };
    BookingContent.prototype.bookingRescheduleByUserPendingUser = function (user) {
        return {
            subject: "Booking Reschedule Pending",
            text: "Hi " + user.firstName + "\n      \n      Hello, your booking reschedule request has been submitted & is currently pending. \n      Kindly wait for the artist's confirmation. \n      Thanks",
        };
    };
    BookingContent.prototype.bookingRescheduleByUserPendingArtist = function (user) {
        return {
            subject: "Booking Reschedule Request",
            text: "Hi " + user.firstName + "\n      \n      You have received a booking reschedule request to new dates. \n      Kindly check your request option to take action. \n      Thanks",
        };
    };
    BookingContent.prototype.bookingConfirmByUser = function (user) {
        return {
            subject: "Booking Confirmed",
            text: "Hi " + user.firstName + "\n      \n      Congratulations, your booking has been accepted by the artist. \n      Thanks for booking with us",
        };
    };
    BookingContent.prototype.bookingConfirmArtist = function (user) {
        return {
            subject: "Booking Confirmed",
            text: "Hi " + user.firstName + "\n      \n      Congratulations, your got one booking. \n      Thanks",
        };
    };
    BookingContent.prototype.bookingRescheduleByArtistPendingUser = function (user) {
        return {
            subject: "Booking Reschedule Request",
            text: "Hi " + user.firstName + "\n      \n      You have received your booking reschedule request to new dates. \n      Kindly check your request option to take action. \n      Thanks",
        };
    };
    BookingContent.prototype.bookingRescheduleByArtistPendingArtist = function (user) {
        return {
            subject: "Booking Reschedule Pending",
            text: "Hi " + user.firstName + "\n      \n      Hello, your booking reschedule request has been submitted & is currently pending. \n      Kindly wait for the customer\u2019s confirmation. \n      Thanks",
        };
    };
    BookingContent.prototype.bookingPriceSetByArtistSendToUser = function (user) {
        return {
            subject: "Booking Price Received",
            text: "Hi " + user.firstName + "\n      \n      Hello, you have received your final booking price for the event which you had requested. Kindly proceed & make the payment to confirm the booking. \n      Thanks",
        };
    };
    BookingContent.prototype.bookingPermissionAcceptedByArtist = function (user) {
        return {
            subject: "Booking Reschedule Accepted",
            text: "Hi " + user.firstName + "\n      \n      Congratulations, your booking reschedule request has been accepted by the artist. \n      Your booking dates have been updated to new one. \n      Thanks",
        };
    };
    BookingContent.prototype.bookingPermissionAcceptedByUser = function (user) {
        return {
            subject: "Booking Reschedule Accepted",
            text: "Hi " + user.firstName + "\n      \n      Congratulations, your booking reschedule request has been accepted by the customer. \n      Your booking dates have been updated to new one. \n      Thanks",
        };
    };
    BookingContent.prototype.bookingPermissionRejectByArtist = function (user) {
        return {
            subject: "Booking Reschedule Rejected.",
            text: "Hi " + user.firstName + "\n      \n      We are sorry to let you know that your booking reschedule request is rejected by the artist. \n      Thanks.",
        };
    };
    BookingContent.prototype.bookingPermissionRejectedByUser = function (user) {
        return {
            subject: "Booking Reschedule Rejected",
            text: "Hi " + user.firstName + "\n      \n      We are sorry to let you know that your booking reschedule request is rejected by the customer. \n      Thanks",
        };
    };
    BookingContent.prototype.customerConfirmPastEventArtist = function (user) {
        return {
            subject: "Event Successfully Completed",
            text: "Hi " + user.firstName + "\n      \n      Congratulations for successfully completing the event. We hope that the whole process was seamless. \n      Thanks for your service",
        };
    };
    BookingContent.prototype.customerCancelPastEventArtist = function (user) {
        return {
            subject: "Event Not Completed",
            text: "Hi " + user.firstName + "\n      \n      We are sorry to let you know that as per customer\u2019s record the booked event was not completed by you.",
        };
    };
    BookingContent.prototype.customerCancelPastEventSuperAdmin = function () {
        return {
            subject: "Event Not Completed",
            text: "Hi\n      \n      We are sorry to let you know that as per customer\u2019s record the booked event was not completed by you.",
        };
    };
    BookingContent.prototype.eventDateCross = function (user) {
        return {
            subject: "Confirm Your Event",
            text: "Hi " + user.firstName + "\n      \n      Hi, we hope that your event was conducted successfully. \n      Kindly confirm if the artist performed in your event or not by going to your request option. You have 14 days to confirm otherwise the past 14 days it will be automatically recorded as confirmed. \n      Thanks.",
        };
    };
    BookingContent.prototype.personalizeRejection = function (user) {
        return {
            subject: "Personalized Request Rejected⁣",
            text: "Hello " + user.firstName + "\n      \n      We are really sorry to let you know that the artist has rejected your request for Personalized Messages due to certain reasons. \n      Thanks.",
        };
    };
    BookingContent.prototype.priceSetRejection = function (user) {
        return {
            subject: "Request Rejected⁣",
            text: "Hello " + user.firstName + "\n      \n      Your artist booking request for you event has been rejected by the artist due to certain reasons. We are really sorry for this. For any further queries kindly reach us anytime. \n      Thanks.",
        };
    };
    return BookingContent;
}());
exports.default = BookingContent;
//# sourceMappingURL=booking.content.js.map