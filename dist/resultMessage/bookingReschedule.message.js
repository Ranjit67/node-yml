"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bookingRescheduleMessage = {
    error: {
        bookingNotFound: "No booking is found.",
        notCreated: "Booking reschedule is not created.",
        bookingRescheduleAlreadyExist: "Your booking reschedule is already pending.",
        actionDenied: "Request action has attempted, So you can not attempt again.",
        allField: "All field are required",
        bookingId: "Booking Id is required",
    },
    success: {
        createdUser: "Booking reschedule is request send to user successfully.",
        createdArtist: "Booking reschedule is request send to artist successfully.",
        accepted: "Booking reschedule is accepted successfully.",
        rejected: "Booking reschedule is rejected successfully.",
    },
};
exports.default = bookingRescheduleMessage;
//# sourceMappingURL=bookingReschedule.message.js.map