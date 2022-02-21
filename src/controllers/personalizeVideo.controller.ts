import { Request, Response, NextFunction } from "express";
import { BadRequest, GatewayTimeout, NotAcceptable } from "http-errors";
import { PersonalizeVideoSchema, BookingSchema } from "../models";
import { personalizeVideoMessage } from "../resultMessage";
import { AwsS3Services, NotificationServices } from "../services";
import { PersonalizeMessageContent } from "../emailContent";
import { personalizeMessageReceiving } from "../notificationIcon";
class PersonalizedVideoController {
  public async create(req: any, res: Response, next: NextFunction) {
    try {
      const { bookingId } = req.body;
      const video = req.files.video;
      if (!bookingId || !video)
        throw new BadRequest(personalizeVideoMessage.error.allField);
      const findBooking: any = await BookingSchema.findById(bookingId).populate(
        "user"
      );
      if (!findBooking)
        throw new NotAcceptable(personalizeVideoMessage.error.noBookingFound);
      const awsS3Services = new AwsS3Services();
      const uploadVideo = await awsS3Services.upload(video);
      const createPersonalizeVideo = await PersonalizeVideoSchema.create({
        user: findBooking.user._id.toString(),
        artist: findBooking.artist.toString(),
        booking: bookingId,
        videoUrl: uploadVideo.Location,
        videoFile: uploadVideo.Key,
        timestamp: new Date(),
      });
      if (!createPersonalizeVideo)
        throw new NotAcceptable(personalizeVideoMessage.error.notCreated);
      const updateBooking = await BookingSchema.updateOne(
        { _id: bookingId },
        { personalizedVideo: createPersonalizeVideo._id }
      );
      if (updateBooking.matchedCount !== 1)
        throw new NotAcceptable(personalizeVideoMessage.error.notUpdated);
      // notification start only for user
      const personalizeMessageContent = new PersonalizeMessageContent();
      const title = personalizeMessageContent.personalizeMessageReceived(
        findBooking.user
      ).subject;
      const description = personalizeMessageContent.personalizeMessageReceived(
        findBooking.user
      ).text;

      await new NotificationServices().notificationGenerate(
        findBooking.user._id.toString(),
        findBooking.artist.toString(),
        title,
        description,
        personalizeMessageReceiving,
        {
          subject: title,
          text: description,
        },
        {
          title,
          body: description,
          sound: "default",
        }
      );

      // notification end
      return res.json({
        success: {
          message: personalizeVideoMessage.success.created,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  public async getPersonalizedVideoUser(
    req: any,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userId } = req.params;
      const findVideoUser = await PersonalizeVideoSchema.find({
        user: userId,
        isDeletesId: { $ne: userId },
      })
        .populate({
          path: "artist",
          select: "-password -__v -fcmToken",
        })
        .populate({
          path: "booking",
          populate: [
            {
              path: "eventType",
              model: "Event",
            },
            {
              path: "serviceType",
              model: "Service",
            },
          ],
        });

      res.json({
        success: {
          data: findVideoUser,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  public async getPersonalizedVideoArtist(
    req: any,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { artistId } = req.params;
      const findVideoUser = await PersonalizeVideoSchema.find({
        artist: artistId,
        isDeletesId: { $ne: artistId },
      })
        .populate({
          path: "user",
          select: "-password -__v -fcmToken",
        })
        .populate({
          path: "booking",
          populate: [
            {
              path: "eventType",
              model: "Event",
            },
            {
              path: "serviceType",
              model: "Service",
            },
          ],
        });
      res.json({
        success: {
          data: findVideoUser,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async deletePersonalizedVideo(req: any, res: Response, next: NextFunction) {
    try {
      const { personalizeId, userId } = req.body;
      if (!personalizeId || !userId)
        throw new BadRequest(personalizeVideoMessage.error.allField);
      const findPersonalizeVideo = await PersonalizeVideoSchema.updateOne(
        { _id: personalizeId },
        {
          $addToSet: {
            isDeletesId: userId,
          },
        }
      );
      if (!findPersonalizeVideo.matchedCount)
        throw new NotAcceptable(personalizeVideoMessage.error.notFound);
      if (!findPersonalizeVideo.modifiedCount)
        throw new NotAcceptable(personalizeVideoMessage.error.nothingChange);
      res.json({
        success: {
          message: personalizeVideoMessage.success.deleted,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default PersonalizedVideoController;
