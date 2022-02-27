"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = require("../controllers");
var ReviewRoutes = (function () {
    function ReviewRoutes() {
        this.router = (0, express_1.Router)();
        this.path = "/review";
        this.reviewController = new controllers_1.ReviewController();
        this.routes();
    }
    ReviewRoutes.prototype.routes = function () {
        this.router.post("/create", this.reviewController.create);
        this.router.get("/all-review", this.reviewController.getAllReview);
        this.router.get("/all-review/:artistId", this.reviewController.getArtistReview);
        this.router.get("/all-review-details/:reviewId", this.reviewController.getReviewDetails);
        this.router.put("/delete", this.reviewController.delete);
    };
    return ReviewRoutes;
}());
exports.default = ReviewRoutes;
//# sourceMappingURL=review.routes.js.map