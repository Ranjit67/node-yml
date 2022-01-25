import { Request, Response, NextFunction } from "express";
import { BadRequest, GatewayTimeout, NotAcceptable } from "http-errors";
import { PersonalizeVideoSchema, BookingSchema } from "../models";
import { personalizeVideoMessage } from "../resultMessage";
import { AwsS3Services } from "../services";

class PersonalizedVideoController {
  public async create(req: any, res: Response, next: NextFunction) {
    try {
      const { bookingId } = req.body;
      const video = req.files.video;
      if (!bookingId || !video)
        throw new BadRequest(personalizeVideoMessage.error.allField);
      const findBooking = await BookingSchema.findById({ bookingId });
      if (!findBooking)
        throw new NotAcceptable(personalizeVideoMessage.error.noBookingFound);
      const awsS3Services = new AwsS3Services();
      const uploadVideo = await awsS3Services.upload(video);
      const createPersonalizeVideo = await PersonalizeVideoSchema.create({
        userRef: findBooking.userRef,
        artistRef: findBooking.artistRef,
        bookingRef: bookingId,
        videoUrl: uploadVideo.Location,
        videoFile: uploadVideo.Key,
        timestamp: new Date(),
      });
      if (!createPersonalizeVideo)
        throw new NotAcceptable(personalizeVideoMessage.error.notCreated);
      const updateBooking = await BookingSchema.updateOne(
        { _id: bookingId },
        { personalizeVideoRef: createPersonalizeVideo._id }
      );
      if (updateBooking.matchedCount !== 1)
        throw new NotAcceptable(personalizeVideoMessage.error.notUpdated);

      return res.json({
        success: {
          message: personalizeVideoMessage.success.created,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default PersonalizedVideoController;
