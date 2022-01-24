import { Request, Response, NextFunction } from "express";
import { ReviewSchema } from "../models";
import { BadRequest, NotAcceptable, NotFound } from "http-errors";
import { reviewMessage } from "../resultMessage";

class ReviewController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { artistId, userId, title, description, ratings } = req.body;
      if (!artistId || !userId || !title)
        throw new BadRequest(reviewMessage.error.allField);
      const firstUpdate = await ReviewSchema.updateOne(
        { artistRef: artistId },
        {
          $push: {
            userReview: {
              userRef: userId,
              title,
              description,
              ratings,
            },
          },
        }
      );
      if (firstUpdate.matchedCount)
        return res.json({ data: reviewMessage.success.created });
      const newReview = new ReviewSchema({
        artistRef: artistId,
      });
      newReview.userReview.push({
        userRef: userId,
        title,
        description,
        ratings,
        timestamp: new Date(),
      });
      const saveReview = newReview.save();
      if (!saveReview) throw new NotAcceptable(reviewMessage.error.notSave);

      return res.json({
        success: {
          message: reviewMessage.success.created,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  public async getArtistReview(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { artistId } = req.params;
      const findReview: any = await ReviewSchema.findOne({
        artistRef: artistId,
      }).populate("userReview.userRef");
      if (!findReview) return res.json({ data: [] });
      return res.json({
        success: {
          data: findReview.userReview,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  public async getReviewDetails(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { reviewId } = req.params;
      const findReview: any = await ReviewSchema.findOne({
        "userReview._id": reviewId,
      });
      if (!findReview) throw new NotFound(reviewMessage.error.notFound);
      const reviewDetails = findReview.userReview.find(
        (element: any) => element._id.toString() === reviewId.toString()
      );
      if (!reviewDetails) throw new NotFound(reviewMessage.error.notFound);
      return res.json({
        success: {
          data: reviewDetails,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { artistId, reviewIds } = req.body;
      if (!artistId || !reviewIds.length)
        throw new BadRequest(reviewMessage.error.allField);
      const deleteReview = await ReviewSchema.updateOne(
        { artistRef: artistId },
        {
          $pull: {
            userReview: {
              _id: { $in: reviewIds },
            },
          },
        }
      );
      if (!deleteReview) throw new NotAcceptable(reviewMessage.error.notDelete);
      return res.json({
        success: {
          message: reviewMessage.success.deleted,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
export default ReviewController;
