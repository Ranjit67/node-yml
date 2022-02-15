class SupportContent {
  public supportNotification() {
    return {
      subject: "New Support Message",
      text: `Hi
                
        You have received a new support message. 
        Kindly visit your support option to take action. 
        Thanks.`,
    };
  }
  public supportEmailContent(user: any, message: string, subject: string) {
    return {
      subject: subject,
      text: `Hi  ${user.firstName}.

        ${message}`,
    };
  }
}
export default SupportContent;
