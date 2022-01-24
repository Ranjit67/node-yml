import { Response, Request, NextFunction } from "express";
import {
  BadRequest,
  InternalServerError,
  Conflict,
  NotFound,
} from "http-errors";
import { BookingSchema, RequestSchema } from "../models";
import { bookingMessage } from "../resultMessage";

class BookingController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        eventStartDate,
        EventEndDate,
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
          end: EventEndDate,
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
          requestType: "pricing",
          receiverUserRef: artistId,
          senderUserRef: userId,
          details: requestDetails,
          timestamp: new Date(),
          bookingRef: createBooking._id,
        });
        if (!requestCreate)
          throw new InternalServerError(bookingMessage.error.requestNotCreated);
        res.json({ data: bookingMessage.success.bookingCreated });
      } else {
        res.json({ data: bookingMessage.success.bookingCreated });
      }
    } catch (error) {
      next(error);
    }
  }
}
export default BookingController;
