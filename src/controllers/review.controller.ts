import { Request, Response, NextFunction } from "express";
import { ReviewSchema, UserSchema } from "../models";
import { BadRequest, NotAcceptable, NotFound } from "http-errors";
import { reviewMessage } from "../resultMessage";
import { ReviewContent } from "../emailContent";
import { NotificationServices } from "../services";
import { artistReviewIcon } from "../notificationIcon";
class ReviewController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { artistId, userId, title, description, ratings } = req.body;
      if (!artistId || !userId || !title)
        throw new BadRequest(reviewMessage.error.allField);
      // notification common
      const findArtist = await UserSchema.findOne({ _id: artistId });
      if (!findArtist) throw new NotFound(reviewMessage.error.artistNotFound);
      const emailContentTitle = new ReviewContent().newReview(
        findArtist
      ).subject;
      const emailContentDescription = new ReviewContent().newReview(
        findArtist
      ).text;
      await new NotificationServices().notificationGenerate(
        artistId,
        userId,
        emailContentTitle,
        emailContentDescription,
        artistReviewIcon,
        {
          subject: emailContentTitle,
          text: emailContentDescription,
        },
        {
          title: emailContentTitle,
          body: emailContentDescription,
          sound: "default",
        }
      );

      // notification common end

      const createReview = await ReviewSchema.create({
        artist: artistId,
        user: userId,
        title,
        description,
        ratings: +ratings,
        timestamp: new Date(),
        artistID: artistId,
      });
      if (!createReview) throw new NotAcceptable(reviewMessage.error.notSave);
      const findAllByArtist = await ReviewSchema.find({ artist: artistId });
      if (findAllByArtist?.length) {
        const ratingTotal = findAllByArtist.reduce(
          (accumulate, currentValue) => {
            return accumulate + currentValue.ratings;
          },
          0
        );
        if (ratingTotal > 0) {
          const ratingAverage = ratingTotal / findAllByArtist.length;
          await UserSchema.findOneAndUpdate(
            { _id: artistId },
            { ratings: Math.floor(ratingAverage) }
          );
        }
      }
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
      const findReview: any = await ReviewSchema.find({
        artist: artistId,
      }).populate("user");
      // if (!findReview) return res.json({ success: { data: [] } });
      return res.json({
        success: {
          data: findReview,
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
        _id: reviewId,
      });
      if (!findReview) throw new NotFound(reviewMessage.error.notFound);

      return res.json({
        success: {
          data: findReview,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  public async getAllReview(req: Request, res: Response, next: NextFunction) {
    try {
      const findReview = await ReviewSchema.find({})
        .populate("user")
        .populate("artist");
      res.json({ success: { data: findReview } });
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { artistId, reviewIds } = req.body;
      if (!artistId || !reviewIds.length)
        throw new BadRequest(reviewMessage.error.allField);

      const deleteReview = await ReviewSchema.deleteMany({
        _id: { $in: reviewIds },
        artist: artistId,
      });
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
