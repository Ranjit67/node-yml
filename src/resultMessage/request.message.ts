const requestMessage = {
  error: {
    allField: "All fields are required.",
    notCreated: "Something went wrong. Request is not created.",
    requestNotFound: "Request is not found.",
    bookingPriceNotUpdated: "Booking price is not set.",
    requestNotDeleted: "Request is not deleted.",
    requestNotCreated: "Something went wrong. Request is not send to Artist.",
    artistNotFound: "Something went wrong. Artist is not found.",
  },
  success: {
    created: "Request data created successfully.",
    acceptPriceSet: "Request price set successfully.",
    bookingAccept: "Booking accepted successfully.",
    bookingReject: "Booking rejected successfully.",
    managerRequestCreate: "Your Request has been sent successfully to Artist.",
  },
};
export default requestMessage;
