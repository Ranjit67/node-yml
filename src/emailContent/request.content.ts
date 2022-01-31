class RequestContent {
  public managerRemove(user: any) {
    return {
      subject: "Manager Remove Request",
      text: `Hi ${user.firstName}
                
        Your manager wants to remove his access to managing your account. 
        Kindly visit your request option to take action. 
        Thanks.`,
    };
  }
}
export default RequestContent;
