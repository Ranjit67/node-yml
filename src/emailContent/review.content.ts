class ReviewContent {
  public newReview(user: any) {
    return {
      subject: "New Review Received",
      text: `Hi ${user.firstName}
              
      You have received a new review on your profile. 
      Kindly visit your profile to check. 
      Thanks.`,
    };
  }
}
export default ReviewContent;
