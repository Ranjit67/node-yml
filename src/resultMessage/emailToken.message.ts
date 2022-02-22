const emailTokenMessage = {
  error: {
    allField: "All field is required",
    password: "Password length must be grater than 4.",
    userNotFound: "User is not found.",
    tokenExpired: "Your token has expired.",
    passwordNotUpdated: "Password is not updated.",
    emailTokenExpired: "Your token has expired. Please register again.",
  },
  success: {
    updated: "Password is updated successfully.",
    passwordUpdateSuccess:
      "Password is updated successfully. Wait for admin approval.",
  },
};
export default emailTokenMessage;
