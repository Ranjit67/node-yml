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
  public newArtistApproveRequestReceived() {
    return {
      subject: "New Artist.",
      text: `Hi
          
      A new artist has created an account on the platform & is currently under pending. 
      Kindly visit your manage users option to take action. 
      Thanks`,
    };
  }
  public afterApproveRequest(user: any) {
    return {
      subject: "Account Approved.",
      text: `Hello ${user.firstName}
          
       We are happy to let you know that your account has now been approved by the Skyrise team & you can now easily access all our functionalities. 
      Thanks for joining with Skyrise.⁣`,
    };
  }
  public emailOnSelfVerification(baseUrl: string, token: string) {
    return {
      subject: `Email verification.`,
      text: `Thanks for registering with us. Kindly click on below link to verify your account and start using our platform.
      The link validity is 15mins. 
      Link is 
      ${baseUrl}/password-reset/${token}
      `,
      // link: `${baseUrl}/password-reset/${token}`,
    };
  }
  public emailForgetPassword(baseUrl: string, token: string) {
    return {
      subject: `Forget Password.`,
      text: `Kindly click on below link to set a new password for your account.
      The link validity is 15mins.
      link is 
      ${baseUrl}/password-reset/${token}`,
      // link: `${baseUrl}/password-reset/${token}`,
    };
  }

  public emailResetPassword(token: string) {
    return {
      subject: `Reset Password.`,
      text: `Go to the dome url http://localhost:3000/verifyEmail/${token}`,
    };
  }
  public managerRemoveRejection(user: any) {
    return {
      subject: `Remove Request Rejected.`,
      text: `Hello ${user.firstName},
      
      Your request to get removed from managing your artist has been rejected by the artist. Kindly do contact the artist directly for queries or do reach us anytime. 
      Thanks`,
    };
  }
}
export default UserContent;
