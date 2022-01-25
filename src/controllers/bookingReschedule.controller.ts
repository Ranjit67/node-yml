import { Response, Request, NextFunction } from "express";
import {
  BadRequest,
  InternalServerError,
  Conflict,
  NotFound,
  NotAcceptable,
} from "http-errors";
import {
  BookingRescheduleSchema,
  BookingSchema,
  RequestSchema,
} from "../models";
import { bookingRescheduleMessage } from "../resultMessage";

class BookingRescheduleController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        bookingId,
        rescheduleStartDate,
        rescheduleEndDate,
        rescheduleBy,
        requestDetails,
      } = req.body;
      const findBooking = await BookingSchema.findById(bookingId);
      if (!findBooking)
        throw new NotAcceptable(bookingRescheduleMessage.error.bookingNotFound);
      const createReschedule = await BookingRescheduleSchema.create({
        artist: findBooking.artist.toString(),
        user: findBooking.user.toString(),
        rescheduleBy: rescheduleBy,
        booking: findBooking._id.toString(),
        rescheduleDate: {
          start: rescheduleStartDate,
          ending: rescheduleEndDate,
        },
        timestamp: new Date(),
      });
      if (rescheduleBy === "artist") {
        const createRequestReschedule = await RequestSchema.create({
          requestType: "rescheduledArtist",
          senderUser: findBooking.artist.toString(),
          receiverUser: findBooking.user.toString(),
          booking: findBooking._id.toString(),
          details: requestDetails,
          reschedule: createReschedule._id.toString(),
          timestamp: new Date(),
        });
        if (!createReschedule)
          throw new InternalServerError(
            bookingRescheduleMessage.error.notCreated
          );
        res.json({
          success: {
            message: bookingRescheduleMessage.success.createdUser,
          },
        });
      } else {
        const createRequestReschedule = await RequestSchema.create({
          requestType: "rescheduledCustomer",
          senderUser: findBooking.user.toString(),
          receiverUser: findBooking.artist.toString(),
          booking: findBooking._id.toString(),
          details: requestDetails,
          reschedule: createReschedule._id.toString(),
          timestamp: new Date(),
        });
        if (!createReschedule)
          throw new InternalServerError(
            bookingRescheduleMessage.error.notCreated
          );
        res.json({
          success: {
            message: bookingRescheduleMessage.success.createdArtist,
          },
        });
        // booking reschedule by user
      }
    } catch (error) {
      next(error);
    }
  }
  public async ReschedulePermission(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { requestId, permissionBoolean } = req.body;
      const findRequest: any = await RequestSchema.findById(requestId).populate(
        "reschedule"
      );
      if (permissionBoolean) {
        //    permission accepted
        // request status accept
        const updateRequest = await RequestSchema.findByIdAndUpdate(requestId, {
          status: "accept",
        });
        const bookingUpdate = await BookingSchema.findByIdAndUpdate(
          findRequest.reschedule?.booking.toString(),
          {
            eventDate: {
              start: findRequest.reschedule?.rescheduleDate.start,
              end: findRequest.reschedule?.rescheduleDate.ending,
            },
          }
        );
        // delete reschedule
        const deleteReschedule =
          await BookingRescheduleSchema.findByIdAndDelete(
            findRequest.reschedule?._id.toString()
          );

        res.json({
          success: {
            message: bookingRescheduleMessage.success.accepted,
          },
        });
      } else {
        //    permission rejected
        // request status reject only
        const updateRequest = await RequestSchema.findByIdAndUpdate(requestId, {
          status: "reject",
        });
        res.json({
          success: {
            message: bookingRescheduleMessage.success.rejected,
          },
        });
      }
    } catch (error) {
      next(error);
    }
  }
}
export default BookingRescheduleController;
