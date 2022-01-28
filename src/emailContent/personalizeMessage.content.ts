class PersonalizeMessageContent {
  public personalizeMessageReceived(user: any) {
    return {
      subject: "Personalize Video Received",
      text: `Hi ${user.firstName}
            
      Hello, you have received your personalized video which you had booked for. 
      Kindly check it in your personalized message option. 
      Thanks`,
    };
  }
}
export default PersonalizeMessageContent;
