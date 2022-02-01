const userMessage = {
  error: {
    notUpdatedBlockOrUnblock:
      "User is verified so you can't block or active the users.",
    duplicateEmail: "This email is already registered.",
    duplicatePhone: "This phone number is already registered.",
    invalidRole: "Invalid role You have enter.",
    invalidUserId: "Invalid user id.",
    userNotFound: "No user found.",
  },
  success: {
    userBlocked: "User is blocked successfully.",
    userUnblocked: "User is active successfully.",
    userPendingToActive: "User request accepted Successfully.",
  },
};
export default userMessage;
