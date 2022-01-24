import { Response, Request, NextFunction } from "express";
import {
  BadRequest,
  InternalServerError,
  Conflict,
  NotFound,
} from "http-errors";
import { BookingSchema, RequestSchema, NotificationSchema } from "../models";
import { bookingMessage } from "../resultMessage";

class BookingController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        eventStartDate,
        eventEndDate,
        cityName,
        eventLocation,
        crowdSize,
        serviceId,
        bookingPrice,
        status,
        artistId,
        userId,
        personalizedMessage,
        eventDuration,
        OtherDetails,
        eventId,
        personalizedMsgDate,
        isRequestSend,
        requestDetails,
      } = req.body;
      const createBooking = await BookingSchema.create({
        eventDate: {
          start: eventStartDate,
          end: eventEndDate,
        },
        cityName,
        eventLocation,
        crowdSize,
        serviceType: serviceId,
        bookingPrice,
        status,
        artistRef: artistId,
        userRef: userId,
        personalizedMessage,
        eventDuration,
        OtherDetails,
        eventType: eventId,
        personalizedMsgDate,
        timestamp: new Date(),
        bookingType: personalizedMessage ? "personalizedMessage" : "other",
      });
      if (!createBooking)
        throw new InternalServerError(bookingMessage.error.notCreated);
      if (isRequestSend) {
        const requestCreate = await RequestSchema.create({
          requestType: personalizedMessage ? "personalize" : "pricing",
          receiverUserRef: artistId,
          senderUserRef: userId,
          details: requestDetails,
          timestamp: new Date(),
          bookingRef: createBooking._id,
        });
        if (!requestCreate)
          throw new InternalServerError(bookingMessage.error.requestNotCreated);
        // notification send
        res.json({
          success: {
            message: bookingMessage.success.bookingCreated,
          },
        });
      } else {
        //notification send
        res.json({
          success: {
            message: bookingMessage.success.bookingCreated,
          },
        });
      }
    } catch (error) {
      next(error);
    }
  }
  public async getAllBookingArtist(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { artistId } = req.params;
      const bookingListArtist = await BookingSchema.find({
        artistRef: artistId,
      })
        .populate("userRef")
        .populate("eventType")
        .populate("serviceType");
      res.json({
        success: {
          message: bookingMessage.success.artistBookingList,
          data: bookingListArtist,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  public async getAllBookingUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userId } = req.params;
      const bookingListUser = await BookingSchema.find({
        userRef: userId,
      })
        .populate("artistRef")
        .populate("eventType")
        .populate("serviceType");
      res.json({
        success: {
          message: bookingMessage.success.userBookingList,
          data: bookingListUser,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default BookingController;
