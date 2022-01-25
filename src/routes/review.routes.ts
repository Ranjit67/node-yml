import { Router } from "express";
import { ReviewController } from "../controllers";

class ReviewRoutes {
  public router = Router();
  public path = "/review";
  private reviewController = new ReviewController();
  constructor() {
    this.routes();
  }
  private routes() {
    this.router.post("/create", this.reviewController.create);
    this.router.get("/all-review", this.reviewController.getAllReview);
    this.router.get(
      "/all-review/:artistId",
      this.reviewController.getArtistReview
    );
    this.router.get(
      "/all-review-details/:reviewId",
      this.reviewController.getReviewDetails
    );
    this.router.put("/delete", this.reviewController.delete);
  }
}
export default ReviewRoutes;
