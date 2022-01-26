import { Response, Request, NextFunction } from "express";
import {
  BadRequest,
  InternalServerError,
  Conflict,
  NotFound,
  NotAcceptable,
} from "http-errors";
import {
  BookingSchema,
  RequestSchema,
  BookingRescheduleSchema,
  WalletSchema,
  WalletHistorySchema,
  NotificationSchema,
} from "../models";
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
        artist: artistId,
        user: userId,
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
          receiverUser: artistId,
          senderUser: userId,
          details: requestDetails,
          timestamp: new Date(),
          booking: createBooking._id,
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
        artist: artistId,
      })
        .populate("user")
        .populate("eventType")
        .populate("serviceType")
        .populate({
          path: "personalizedVideo",

          select: "-__v -booking -artist -user -booking -videoFile ",
        });
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
        user: userId,
      })
        .populate("artist")
        .populate("eventType")
        .populate("serviceType")
        .populate({
          path: "personalizedVideo",
          select: "-__v -booking -artist -user -booking -videoFile ",
        });
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

  async bookingPayment(req: Request, res: Response, next: NextFunction) {
    try {
      const { bookingId, paymentAmount } = req.body;
      const findBooking = await BookingSchema.findById(bookingId);
      if (findBooking?.bookingPrice !== +paymentAmount)
        throw new NotAcceptable(bookingMessage.error.bookingPriceNotAccept);
      const bookingStatusUpdate = await BookingSchema.findByIdAndUpdate(
        bookingId,
        {
          status: "confirm",
        }
      );
      if (!bookingStatusUpdate)
        throw new InternalServerError(bookingMessage.error.statusNotUpdate);
      res.json({
        success: {
          message: bookingMessage.success.bookingConfirm,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async bookingPastConfirmation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { bookingId, isComplete } = req.body;
      const updateBooking = await BookingSchema.findByIdAndUpdate(bookingId, {
        isComplete: Boolean(isComplete),
        status: "past",
      });
      if (!updateBooking)
        throw new NotAcceptable(bookingMessage.error.bookingComplete);
      if (!isComplete) {
        // send notification mail to super admin
      }
      res.json({
        success: {
          message: bookingMessage.success.bookingComplete,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async bookingCancelWallet(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        bookingId,
        refundAmount,
        walletHistoryTitle,
        walletHistoryDescription,
      } = req.body;
      const findBooking: any = await BookingSchema.findById(bookingId);
      const updateBookingStatus = await BookingSchema.findByIdAndUpdate(
        bookingId,
        {
          status: "cancel",
        }
      );
      const firstWalletUpdate = await WalletSchema.updateOne(
        { user: findBooking.user.toString() },
        {
          $inc: {
            balance: +refundAmount,
          },
        }
      );
      if (firstWalletUpdate.matchedCount === 1) {
        const walletHistory = await WalletHistorySchema.findOneAndUpdate(
          { user: findBooking.user.toString() },
          {
            $push: {
              transactionHistory: {
                title: walletHistoryTitle,
                type: "CR",
                amount: +refundAmount,
                description: walletHistoryDescription,
                timestamp: new Date(),
              },
            },
          }
        );
        return res.json({
          success: {
            message: bookingMessage.success.bookingCancelWallet,
          },
        });
      } else {
        const walletCreate = await WalletSchema.create({
          user: findBooking.user.toString(),
          balance: +refundAmount,
          spent: 0,
        });
        if (!walletCreate)
          throw new NotAcceptable(bookingMessage.error.walletNotCreated);
        const createWalletHistory = await WalletHistorySchema.create({
          user: findBooking.user.toString(),
          transactionHistory: [
            {
              title: walletHistoryTitle,
              type: "CR",
              amount: +refundAmount,
              description: walletHistoryDescription,
              timestamp: new Date(),
            },
          ],
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

export default BookingController;
