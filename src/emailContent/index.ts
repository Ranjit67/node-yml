interface emailStructureObject {
  from: string;
  to: string;
  subject: string;
  text: string;
}
class EmailContent {
  public emailOnSelfVerification(
    email: string,
    token: string
  ): emailStructureObject {
    return {
      from: "noreply.skyrisecelebrity@gmail.com",
      to: email,
      subject: `Email verification.`,
      text: `Go to the dome url http://localhost:3000/verifyEmail/${token}`,
    };
  }
  public emailForgetPassword(
    email: string,
    token: string
  ): emailStructureObject {
    return {
      from: "noreply.skyrisecelebrity@gmail.com",
      to: email,
      subject: `Forget Password.`,
      text: `Go to the dome url http://localhost:3000/verifyEmail/${token}`,
    };
  }
  public emailResetPassword(
    email: string,
    token: string
  ): emailStructureObject {
    return {
      from: "noreply.skyrisecelebrity@gmail.com",
      to: email,
      subject: `Reset Password.`,
      text: `Go to the dome url http://localhost:3000/verifyEmail/${token}`,
    };
  }

  public supportEmailContent(
    email: string,
    user: any,
    message: string
  ): emailStructureObject {
    return {
      from: "noreply.skyrisecelebrity@gmail.com",
      to: email,
      subject: `Email from Sky-rise Team.`,
      text: `Hi  ${user.firstName}.

        ${message}`,
    };
  }
}
export default EmailContent;
