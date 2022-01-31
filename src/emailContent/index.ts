interface emailStructureObject {
  subject: string;
  text: string;
}
class EmailContent {
  public emailOnSelfVerification(token: string): emailStructureObject {
    return {
      subject: `Email verification.`,
      text: `Go to the dome url http://localhost:3000/verifyEmail/${token}`,
    };
  }
  public emailForgetPassword(token: string): emailStructureObject {
    return {
      subject: `Forget Password.`,
      text: `Go to the dome url http://localhost:3000/verifyEmail/${token}`,
    };
  }
  public emailResetPassword(token: string): emailStructureObject {
    return {
      subject: `Reset Password.`,
      text: `Go to the dome url http://localhost:3000/verifyEmail/${token}`,
    };
  }

  public supportEmailContent(
    user: any,
    message: string,
    subject: string
  ): emailStructureObject {
    return {
      subject: subject,
      text: `Hi  ${user.firstName}.

        ${message}`,
    };
  }
}
export default EmailContent;
export { default as BookingContent } from "./booking.content";
export { default as PersonalizeMessageContent } from "./personalizeMessage.content";
export { default as UserContent } from "./user.content";
export { default as AssignArtistContent } from "./assignArtist.content";
export { default as ReviewContent } from "./review.content";
export { default as RequestContent } from "./request.content";
export { default as SupportContent } from "./support.content";
