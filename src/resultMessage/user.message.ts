const userMessage = {
  error: {
    allFieldsRequired: "All fields are required",
    currentlyRegistered:
      "You are already registered, Please check your email and set your password",
    notUpdatedBlockOrUnblock:
      "User is verified so you can't block or active the users.",
    duplicateEmail: "This email is already registered.",
    duplicatePhone: "This phone number is already registered.",
    invalidRole: "Invalid role You have enter.",
    invalidUserId: "Invalid user id.",
    userNotFound: "No user found.",
    notDelete: "User is not deleted.",
    notCreated: "User is not created.",
    emailToken: "Email token is not valid.",
    profileImage: "Profile image is not uploaded.",
    notUpdate: "User is not updated.",
    passwordNotSet: "Your password is not set.",
    wrongPassword: "Wrong password you have enter.",
    tokenGenerate: "Token is not generated.",
    oldPassword: "Old password is not match.",
    passwordNotMatch: "Password is not match.",
    forgetPasswordNot:
      "Your account is not verified, please verify your account.",
    forgetPasswordLinkTimeHave:
      "Your password set link sent to your email, please check your email.",
    // userNotFound:"User not found."
  },
  success: {
    userBlocked: "User is blocked successfully.",
    userUnblocked: "User is active successfully.",
    userPendingToActive: "User request accepted Successfully.",
    managerDelete: "Manager is deleted successfully.",
    userDelete: "User is deleted successfully.",
    artistDelete: "Artist is deleted successfully.",
    mailVerification:
      "User is created successfully. Email send to user mail for verification.",
    update: "User is updated successfully.",
    passwordSet: "Password is set successfully.",
    forgetPasswordLinkMail: "Password reset link send to your mail.",
  },
};
export default userMessage;
