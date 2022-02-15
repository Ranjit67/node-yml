const requestMessage = {
  error: {
    allField: "All fields are required.",
    notCreated: "Something went wrong. Request is not created.",
    requestNotFound: "Request is not found.",
    bookingPriceNotUpdated: "Booking price is not set.",
    requestNotDeleted: "Request is not deleted.",
    requestNotCreated: "Something went wrong. Request is not send to Artist.",
    artistNotFound: "Something went wrong. Artist is not found.",
    requestIdIsArray: "Array require.",
    notDelete: "Requests are not deleted.",
    notRequestUpdate: "Something went wrong, Request Not rejected.",
    wrongDataEnter: "Wrong id, you have enter.",
    yourRequestPending:
      "Your request is already pending. Wait for the Artist actions.",
    allAreNotDelete: "Something want Wrong, All the data are not deleted.",
    invalid: "Invalid ids entry.",
  },
  success: {
    requestAccept: "Request is accepted successfully.",
    created: "Request data created successfully.",
    acceptPriceSet: "Request price set successfully.",
    bookingAccept: "Booking accepted successfully.",
    bookingReject: "Booking rejected successfully.",
    managerRequestCreate: "Your Request has been sent successfully to Artist.",
    requestDeleted: "Request deleted successfully.",
    rejectRequest: "Requested rejected Successfully.",
  },
};
export default requestMessage;
