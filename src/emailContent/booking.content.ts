class BookingContent {
  public newBookingUser() {
    return {
      subject: "Booking Successful",
      text: `Hi
      Congratulations, your booking is successfully completed.
      Kindly wait for the artist's confirmation.
      Thanks`,
    };
  }
  public newBookingArtist() {
    return {
      subject: "New Booking Received.",
      text: `Hi
      You have received a new booking. 
      Kindly check in your booking option to take action. 
      Thanks`,
    };
  }
  public bookingCancelArtist(user: any) {
    return {
      subject: "Booking Cancelled By Artist.",
      text: `Hi ${user.firstName}
      We are sorry to inform you that your last booking got cancelled by the artist. 
      Your 100% refund has already been initiated. 
      Thanks`,
    };
  }
  public bookingCancelByUser(artist: any) {
    return {
      subject: "Booking Cancelled By Customer.",
      text: `Hi ${artist.firstName}

      We are sorry to let you know that the customer has cancelled his booking due to certain reasons. 
      Thanks`,
    };
  }
  public bookingCancelByUserSelf(user: any) {
    return {
      subject: "Booking Cancelled.",
      text: `Hi ${user.firstName}

      We are sorry to let you know that the customer has cancelled his booking due to certain reasons. 
      Thanks`,
    };
  }
  public bookingCancelByArtistSelf(user: any) {
    return {
      subject: "Booking Cancelled",
      text: `Hi ${user.firstName}

      We are sorry to let you know that the customer has cancelled his booking due to certain reasons. 
      Thanks`,
    };
  }
  public bookingRequestReceivedByArtist() {
    return {
      subject: "Booking Request Received",
      text: `Hi 
      
      You have received a booking request. 
      Kindly visit your request option to take action. 
      Thanks`,
    };
  }
  public bookingRescheduleByUserPendingUser(user: any) {
    return {
      subject: "Booking Reschedule Pending",
      text: `Hi ${user.firstName}
      
      Hello, your booking reschedule request has been submitted & is currently pending. 
      Kindly wait for the artist's confirmation. 
      Thanks`,
    };
  }
  public bookingRescheduleByUserPendingArtist(user: any) {
    return {
      subject: "Booking Reschedule Request",
      text: `Hi ${user.firstName}
      
      You have received a booking reschedule request to new dates. 
      Kindly check your request option to take action. 
      Thanks`,
    };
  }
  public bookingConfirmByUser(user: any) {
    return {
      subject: "Booking Confirmed",
      text: `Hi ${user.firstName}
      
      Congratulations, your booking has been accepted by the artist. 
      Thanks for booking with us`,
    };
  }
  public bookingConfirmArtist(user: any) {
    return {
      subject: "Booking Confirmed",
      text: `Hi ${user.firstName}
      
      Congratulations, your got one booking. 
      Thanks`,
    };
  }
  public bookingRescheduleByArtistPendingUser(user: any) {
    return {
      subject: "Booking Reschedule Request",
      text: `Hi ${user.firstName}
      
      You have received your booking reschedule request to new dates. 
      Kindly check your request option to take action. 
      Thanks`,
    };
  }
  public bookingRescheduleByArtistPendingArtist(user: any) {
    return {
      subject: "Booking Reschedule Pending",
      text: `Hi ${user.firstName}
      
      Hello, your booking reschedule request has been submitted & is currently pending. 
      Kindly wait for the customer’s confirmation. 
      Thanks`,
    };
  }
  public bookingPriceSetByArtistSendToUser(user: any) {
    return {
      subject: "Booking Price Received",
      text: `Hi ${user.firstName}
      
      Hello, you have received your final booking price for the event which you had requested. Kindly proceed & make the payment to confirm the booking. 
      Thanks`,
    };
  }
  public bookingPermissionAcceptedByArtist(user: any) {
    return {
      subject: "Booking Reschedule Accepted",
      text: `Hi ${user.firstName}
      
      Congratulations, your booking reschedule request has been accepted by the artist. 
      Your booking dates have been updated to new one. 
      Thanks`,
    };
  }
  public bookingPermissionAcceptedByUser(user: any) {
    return {
      subject: "Booking Reschedule Accepted",
      text: `Hi ${user.firstName}
      
      Congratulations, your booking reschedule request has been accepted by the customer. 
      Your booking dates have been updated to new one. 
      Thanks`,
    };
  }
  public bookingPermissionRejectByArtist(user: any) {
    return {
      subject: "Booking Reschedule Rejected.",
      text: `Hi ${user.firstName}
      
      We are sorry to let you know that your booking reschedule request is rejected by the artist. 
      Thanks.`,
    };
  }
  public bookingPermissionRejectedByUser(user: any) {
    return {
      subject: "Booking Reschedule Rejected",
      text: `Hi ${user.firstName}
      
      We are sorry to let you know that your booking reschedule request is rejected by the customer. 
      Thanks`,
    };
  }
}

export default BookingContent;
