class AssignArtistContent {
  public managerRequestSendManagerSide(user: any) {
    //not happening
    return {
      subject: "Artist Manage Request Pending",
      text: `Hi ${user.firstName}
                  
      We have sent your request to manage the artist’s account on skyrise to the artist. 
      Kindly wait for the artist's confirmation. 
      Thanks`,
    };
  }
  public managerRequestSendArtistSide(user: any) {
    //not happening
    return {
      subject: "New Manager Request",
      text: `Hi ${user.firstName}
                    
        You have received a new manager request who wants to manage your account. 
        Kindly visit your request option to take action. 
        Thanks`,
    };
  }
  public managerRequestAcceptedByArtist(user: any) {
    return {
      subject: "Artist Manage Request Accepted",
      text: `Hi ${user.firstName}
                      
      Congratulations, the artist has accepted your request to manage his account. 
      You can now manage your artist. 
      Thanks.`,
    };
  }
  public artistAssignRemoveManagerSide(user: any) {
    return {
      subject: "Artist Access Removed",
      text: `Hi ${user.firstName}
                        
        We are sorry to let you know that the artist has removed your access to manage his account. 
        Thanks`,
    };
  }
  public managerRequestReject(user: any) {
    return {
      subject: "Artist Manage Request Rejected",
      text: `Hi ${user.firstName}
                        
      We are sorry to let you know that the artist has rejected your request to manage his account. 
      Thanks.`,
    };
  }
}

export default AssignArtistContent;
