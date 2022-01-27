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
}

export default BookingContent;
