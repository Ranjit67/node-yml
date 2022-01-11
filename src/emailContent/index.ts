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
}
export default EmailContent;
