class UserContent {
  public superAdminBlockUser(user: any) {
    return {
      subject: "Account Blocked",
      text: `Hi ${user.firstName}
            
            We are sorry to let you know due to certain reasons your account has been blocked by the team. 
            Kindly contact us for more details. 
            Thanks.`,
    };
  }
  public superAdminUnblockUser(user: any) {
    return {
      subject: "Account Unblocked.",
      text: `Hi ${user.firstName}
            
      Congratulations, your account is now unblocked & now you can access our platform easily. 
      Sorry for the inconvenience caused. 
      Thanks.`,
    };
  }

  public newManagerApprove() {
    return {
      subject: "New Manager.",
      text: `Hi
          
    A new manager has created an account on the platform & is currently under pending. 
    Kindly visit your manage users option to take action. 
    Thanks`,
    };
  }
  public newArtistApprove() {
    return {
      subject: "New Artist.",
      text: `Hi
          
      A new artist has created an account on the platform & is currently under pending. 
      Kindly visit your manage users option to take action. 
      Thanks`,
    };
  }
}
export default UserContent;
