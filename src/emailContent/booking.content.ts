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
}

export default BookingContent;
