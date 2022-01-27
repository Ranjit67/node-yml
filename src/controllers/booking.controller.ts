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
  AssignArtistSchema,
  BookingRescheduleSchema,
  WalletSchema,
  WalletHistorySchema,
  NotificationSchema,
} from "../models";
import { bookingMessage } from "../resultMessage";
import { NotificationServices } from "../services";
import { BookingContent } from "../emailContent";
import {
  newBookingArtist,
  newBookingUser,
  newBookingManager,
  bookingCancelByUserIcon,
  bookingCancelByArtistIcon,
} from "../notificationIcon";
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
        const findArtistManager = await AssignArtistSchema.find({
          "artists.artist": artistId,
        }).select("manager -_id");
        const bookingContent = new BookingContent();
        for (let index of [
          userId,
          artistId,
          findArtistManager.map((item) => item.manager),
        ]) {
          const title =
            index === userId
              ? bookingContent.newBookingUser().subject
              : bookingContent.newBookingArtist().subject;
          const description =
            index === userId
              ? bookingContent.newBookingUser().text
              : bookingContent.newBookingArtist().text;
          const bookingNotificationIcon =
            index === userId
              ? newBookingUser
              : index === artistId
              ? newBookingArtist
              : newBookingManager;
          await new NotificationServices().notificationGenerate(
            index,
            userId,
            title,
            description,
            bookingNotificationIcon,
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
        }
        res.json({
          success: {
            message: bookingMessage.success.bookingCreated,
          },
        });
      } else {
        const findArtistManager = await AssignArtistSchema.find({
          "artists.artist": artistId,
        }).select("manager -_id");
        // [artistId,userId, findArtistManager.map(item => item.manager)]
        const bookingContent = new BookingContent();
        for (let index of [
          userId,
          artistId,
          findArtistManager.map((item) => item.manager),
        ]) {
          const title =
            index === userId
              ? bookingContent.newBookingUser().subject
              : bookingContent.newBookingArtist().subject;
          const description =
            index === userId
              ? bookingContent.newBookingUser().text
              : bookingContent.newBookingArtist().text;
          const bookingNotificationIcon =
            index === userId
              ? newBookingUser
              : index === artistId
              ? newBookingArtist
              : newBookingManager;
          await new NotificationServices().notificationGenerate(
            index,
            userId,
            title,
            description,
            bookingNotificationIcon,
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
        }
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
        cancelBy,
      } = req.body;
      if (
        !bookingId ||
        !refundAmount ||
        !walletHistoryTitle ||
        !walletHistoryDescription ||
        !cancelBy
      )
        throw new BadRequest(bookingMessage.error.allField);
      // const findBooking: any = await BookingSchema.findById(bookingId);
      const findBooking: any = await BookingSchema.findById(bookingId)
        .populate("artist")
        .populate("user");
      const updateRequest = await RequestSchema.updateOne(
        { booking: bookingId, status: "pending" },
        {
          isCancel: true,
        }
      ); // nothing need to check if have then update
      const updateBookingStatus = await BookingSchema.findByIdAndUpdate(
        bookingId,
        {
          status: "cancel",
        }
      );
      const firstWalletUpdate = await WalletSchema.updateOne(
        { user: findBooking.user._id.toString() },
        {
          $inc: {
            balance: +refundAmount,
          },
        }
      );
      if (firstWalletUpdate.matchedCount === 1) {
        const createWalletHistory = await WalletHistorySchema.findOneAndUpdate(
          { user: findBooking.user._id.toString() },
          {
            $push: {
              transactionHistory: {
                title: walletHistoryTitle,
                type: "Credit",
                amount: +refundAmount,
                description: walletHistoryDescription,
                timestamp: new Date(),
              },
            },
          }
        );
        if (!createWalletHistory)
          throw new NotAcceptable(bookingMessage.error.walletHistoryNotCreated);
        //  notification
        const findArtistManager = await AssignArtistSchema.find({
          "artists.artist": findBooking.artist._id.toString(),
        }).select("manager -_id");
        const bookingContent = new BookingContent();
        if (cancelBy === "user") {
          for (let index of [
            findBooking.user._id.toString(),
            findBooking.artist._id.toString(),
            findArtistManager.map((item) => item.manager),
          ]) {
            const title =
              index === findBooking.user._id.toString()
                ? bookingContent.bookingCancelByUserSelf(findBooking.user)
                    .subject
                : bookingContent.bookingCancelByUser(findBooking.artist)
                    .subject;
            const description =
              index === findBooking.user._id.toString()
                ? bookingContent.bookingCancelByUserSelf(findBooking.user).text
                : bookingContent.bookingCancelByUser(findBooking.artist).text;
            const bookingNotificationIcon =
              index === findBooking.user._id.toString()
                ? bookingCancelByUserIcon
                : index === findBooking.artist._id.toString()
                ? bookingCancelByUserIcon
                : bookingCancelByUserIcon;
            await new NotificationServices().notificationGenerate(
              index,
              findBooking.user._id.toString(),
              title,
              description,
              bookingNotificationIcon,
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
          }
        } else {
          for (let index of [
            findBooking.user._id.toString(),
            findBooking.artist._id.toString(),
            findArtistManager.map((item) => item.manager),
          ]) {
            const title =
              index === findBooking.artist._id.toString()
                ? bookingContent.bookingCancelByArtistSelf(findBooking.artist)
                    .subject
                : bookingContent.bookingCancelArtist(findBooking.user).subject;
            const description =
              index === findBooking.artist._id.toString()
                ? bookingContent.bookingCancelByArtistSelf(findBooking.artist)
                    .text
                : bookingContent.bookingCancelArtist(findBooking.user).text;
            const bookingNotificationIcon =
              index === findBooking.artist._id.toString()
                ? bookingCancelByArtistIcon
                : index === findBooking.artist._id.toString()
                ? bookingCancelByArtistIcon
                : bookingCancelByArtistIcon;
            await new NotificationServices().notificationGenerate(
              index,
              findBooking.artist._id.toString(),
              title,
              description,
              bookingNotificationIcon,
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
          }
        }
        return res.json({
          success: {
            message: bookingMessage.success.bookingCancelWallet,
          },
        });
      } else {
        const walletCreate = await WalletSchema.create({
          user: findBooking.user_id.toString(),
          balance: +refundAmount,
          spent: 0,
        });
        if (!walletCreate)
          throw new NotAcceptable(bookingMessage.error.walletNotCreated);

        const createWalletHistory = new WalletHistorySchema({
          user: findBooking.user._id.toString(),
        });
        createWalletHistory.transactionHistory.push({
          title: walletHistoryTitle,
          type: "Credit",
          amount: +refundAmount,
          description: walletHistoryDescription,
          timestamp: new Date(),
        });
        const save = createWalletHistory.save();
        if (!save)
          throw new NotAcceptable(bookingMessage.error.walletHistoryNotCreated);
        // notification

        const findArtistManager = await AssignArtistSchema.find({
          "artists.artist": findBooking.artist._id.toString(),
        }).select("manager -_id");
        const bookingContent = new BookingContent();
        if (cancelBy === "user") {
          for (let index of [
            findBooking.user._id.toString(),
            findBooking.artist._id.toString(),
            findArtistManager.map((item) => item.manager),
          ]) {
            const title =
              index === findBooking.user._id.toString()
                ? bookingContent.bookingCancelByUserSelf(findBooking.user)
                    .subject
                : bookingContent.bookingCancelByUser(findBooking.artist)
                    .subject;
            const description =
              index === findBooking.user._id.toString()
                ? bookingContent.bookingCancelByUserSelf(findBooking.user).text
                : bookingContent.bookingCancelByUser(findBooking.artist).text;
            const bookingNotificationIcon =
              index === findBooking.user._id.toString()
                ? bookingCancelByUserIcon
                : index === findBooking.artist._id.toString()
                ? bookingCancelByUserIcon
                : bookingCancelByUserIcon;
            await new NotificationServices().notificationGenerate(
              index,
              findBooking.user._id.toString(),
              title,
              description,
              bookingNotificationIcon,
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
          }
        } else {
          for (let index of [
            findBooking.user._id.toString(),
            findBooking.artist._id.toString(),
            findArtistManager.map((item) => item.manager),
          ]) {
            const title =
              index === findBooking.artist._id.toString()
                ? bookingContent.bookingCancelByArtistSelf(findBooking.artist)
                    .subject
                : bookingContent.bookingCancelArtist(findBooking.user).subject;
            const description =
              index === findBooking.artist._id.toString()
                ? bookingContent.bookingCancelByArtistSelf(findBooking.artist)
                    .text
                : bookingContent.bookingCancelArtist(findBooking.user).text;
            const bookingNotificationIcon =
              index === findBooking.artist._id.toString()
                ? bookingCancelByArtistIcon
                : index === findBooking.artist._id.toString()
                ? bookingCancelByArtistIcon
                : bookingCancelByArtistIcon;
            await new NotificationServices().notificationGenerate(
              index,
              findBooking.artist._id.toString(),
              title,
              description,
              bookingNotificationIcon,
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
          }
        }
        return res.json({
          success: {
            message: bookingMessage.success.bookingCancelWallet,
          },
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async bookingCancelBankAccount(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { bookingId, amount, cancelBy } = req.body;
      // cancelBy- user/artist
      if (!bookingId || !amount)
        throw new BadRequest(bookingMessage.error.allField);
      const updateRequest = await RequestSchema.updateOne(
        { booking: bookingId, status: "pending" },
        {
          isCancel: true,
        }
      ); // nothing need to check if have then update
      const changeBookingStatus = await BookingSchema.findByIdAndUpdate(
        bookingId,
        {
          status: "cancel",
        }
      );
      if (!changeBookingStatus)
        throw new NotAcceptable(bookingMessage.error.bookingCancel);
      const findBooking: any = await BookingSchema.findById(bookingId)
        .populate("artist")
        .populate("user");
      const findArtistManager = await AssignArtistSchema.find({
        "artists.artist": findBooking.artist._id.toString(),
      }).select("manager -_id");
      const bookingContent = new BookingContent();
      if (cancelBy === "user") {
        for (let index of [
          findBooking.user._id.toString(),
          findBooking.artist._id.toString(),
          findArtistManager.map((item) => item.manager),
        ]) {
          const title =
            index === findBooking.user._id.toString()
              ? bookingContent.bookingCancelByUserSelf(findBooking.user).subject
              : bookingContent.bookingCancelByUser(findBooking.artist).subject;
          const description =
            index === findBooking.user._id.toString()
              ? bookingContent.bookingCancelByUserSelf(findBooking.user).text
              : bookingContent.bookingCancelByUser(findBooking.artist).text;
          const bookingNotificationIcon =
            index === findBooking.user._id.toString()
              ? bookingCancelByUserIcon
              : index === findBooking.artist._id.toString()
              ? bookingCancelByUserIcon
              : bookingCancelByUserIcon;
          await new NotificationServices().notificationGenerate(
            index,
            findBooking.user._id.toString(),
            title,
            description,
            bookingNotificationIcon,
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
        }
      } else {
        for (let index of [
          findBooking.user._id.toString(),
          findBooking.artist._id.toString(),
          findArtistManager.map((item) => item.manager),
        ]) {
          const title =
            index === findBooking.artist._id.toString()
              ? bookingContent.bookingCancelByArtistSelf(findBooking.artist)
                  .subject
              : bookingContent.bookingCancelArtist(findBooking.user).subject;
          const description =
            index === findBooking.artist._id.toString()
              ? bookingContent.bookingCancelByArtistSelf(findBooking.artist)
                  .text
              : bookingContent.bookingCancelArtist(findBooking.user).text;
          const bookingNotificationIcon =
            index === findBooking.artist._id.toString()
              ? bookingCancelByArtistIcon
              : index === findBooking.artist._id.toString()
              ? bookingCancelByArtistIcon
              : bookingCancelByArtistIcon;
          await new NotificationServices().notificationGenerate(
            index,
            findBooking.artist._id.toString(),
            title,
            description,
            bookingNotificationIcon,
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
        }
      }

      res.json({
        success: {
          message: bookingMessage.success.bookingCancel,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default BookingController;
