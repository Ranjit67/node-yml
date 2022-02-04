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
  UserSchema,
  PromoCodeSchema,
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
  bookingRequestIcon,
  pastBookingCancelIcon,
  pastBookingConfirmIcon,
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
        bankAmount,
        walletAmount,
        promoCodeAmount,
        promoCodeId,
      } = req.body;
      let promoCodeData;
      if (promoCodeId) {
        promoCodeData = await PromoCodeSchema.findOne({ _id: promoCodeId });
      }
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
        promoCodeData,
        bankAmount,
        walletAmount,
        promoCodeAmount,
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
          ...findArtistManager.map((item) => item.manager),
        ]) {
          const title =
            index === userId
              ? bookingContent.bookingRequestSubmit().subject
              : bookingContent.bookingRequestReceivedByArtist().subject;

          const description =
            index === userId
              ? bookingContent.bookingRequestSubmit().text
              : bookingContent.bookingRequestReceivedByArtist().text;

          const bookingNotificationIcon =
            index === userId
              ? newBookingUser
              : index === artistId
              ? bookingRequestIcon
              : bookingRequestIcon;
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
          ...findArtistManager.map((item) => item.manager),
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
        isDeletesId: { $ne: artistId },
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
        isDeletesId: { $ne: userId },
      })
        .populate({
          path: "artist",
          populate: [
            {
              path: "category",
              model: "Category",
            },
            {
              path: "subcategories",
              model: "SubCategory",
            },
            {
              path: "genres",
              model: "Genres",
            },
            {
              path: "languages",
              model: "Language",
            },
            {
              path: "events",
              model: "Event",
            },
          ],
        })
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
      const {
        bookingId,
        paymentAmount,
        requestDetails,
        bankAmount,
        walletAmount,
        promoCodeAmount,
        promoCodeId,
      } = req.body;
      const findBooking: any = await BookingSchema.findById(bookingId)
        .populate({
          path: "user",
        })
        .populate({
          path: "artist",
        });
      let promoCodeData;
      if (promoCodeId) {
        promoCodeData = await PromoCodeSchema.findById(promoCodeId);
      }
      if (findBooking?.bookingPrice !== +paymentAmount)
        throw new NotAcceptable(bookingMessage.error.bookingPriceNotAccept);
      const bookingStatusUpdate = await BookingSchema.findByIdAndUpdate(
        bookingId,
        {
          isPayment: true,
          promoCodeData: promoCodeData ?? {},
          bankAmount: bankAmount ?? findBooking.bookingPrice,
          walletAmount: walletAmount ?? 0,
          promoCodeAmount: promoCodeAmount ?? 0,
        }
      );
      if (!bookingStatusUpdate)
        throw new InternalServerError(bookingMessage.error.statusNotUpdate);
      // request to artist
      const requestCreate = await RequestSchema.create({
        requestType: "payment",
        senderUser: findBooking.user?._id.toString(),
        receiverUser: findBooking.artist?._id.toString(),
        booking: findBooking._id,
        details: requestDetails,
        timestamp: new Date(),
      });
      if (!requestCreate)
        throw new NotAcceptable(bookingMessage.error.bookingRequest);

      // notification start
      const findArtistManager = await AssignArtistSchema.find({
        "artists.artist": findBooking.artist._id.toString(),
      }).select("manager -_id");
      const bookingContent = new BookingContent();
      for (let index of [
        findBooking.user._id.toString(),
        findBooking.artist._id.toString(),
        ...findArtistManager.map((item) => item.manager),
      ]) {
        const title =
          index === findBooking.user._id.toString()
            ? bookingContent.newBookingUser().subject
            : bookingContent.newBookingArtist().subject;
        const description =
          index === findBooking.user._id.toString()
            ? bookingContent.newBookingUser().text
            : bookingContent.newBookingArtist().text;
        const bookingNotificationIcon =
          index === findBooking.user._id.toString()
            ? newBookingUser
            : newBookingArtist;
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

      // notification end
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
      const bookingContent = new BookingContent();
      const findBooking: any = await BookingSchema.findById(bookingId)
        .populate("user")
        .populate("artist");
      if (!isComplete) {
        // send notification mail to super admin
        const superAdmin = await UserSchema.find({ role: "admin" });

        for (let index of [
          findBooking.artist._id.toString(),
          superAdmin.map((item) => item._id),
        ]) {
          const title =
            index === findBooking.artist._id.toString()
              ? bookingContent.customerCancelPastEventArtist(findBooking.artist)
                  .subject
              : bookingContent.customerCancelPastEventSuperAdmin().subject;
          const description =
            index === findBooking.artist._id.toString()
              ? bookingContent.customerCancelPastEventArtist(findBooking.artist)
                  .subject
              : bookingContent.customerCancelPastEventSuperAdmin().subject;
          await new NotificationServices().notificationGenerate(
            index,
            findBooking.user._id.toString(),
            title,
            description,
            pastBookingCancelIcon,
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
        // confirm booking
        const title = bookingContent.customerConfirmPastEventArtist(
          findBooking.artist
        ).subject;
        const description = bookingContent.customerConfirmPastEventArtist(
          findBooking.artist
        ).text;
        await new NotificationServices().notificationGenerate(
          findBooking.artist._id.toString(),
          findBooking.user._id.toString(),
          title,
          description,
          pastBookingConfirmIcon,
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
        OtherDetails,
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
          cancelBy: cancelBy,
          OtherDetails,
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
            findBooking.artist._id.toString(),
            ...findArtistManager.map((item) => item.manager),
          ]) {
            const title = bookingContent.bookingCancelByUser(
              findBooking.artist
            ).subject;
            const description = bookingContent.bookingCancelByUser(
              findBooking.artist
            ).text;

            await new NotificationServices().notificationGenerate(
              index,
              findBooking.user._id.toString(),
              title,
              description,
              bookingCancelByUserIcon,
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
            // findBooking.user._id.toString(),
            findBooking.artist._id.toString(),
            findArtistManager.map((item) => item.manager),
          ]) {
            const title = bookingContent.bookingCancelByUser(
              findBooking.artist
            ).subject;
            const description = bookingContent.bookingCancelByUser(
              findBooking.artist
            ).text;

            await new NotificationServices().notificationGenerate(
              index,
              findBooking.user._id.toString(),
              title,
              description,
              bookingCancelByUserIcon,
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
      const { bookingId, amount, cancelBy, OtherDetails } = req.body;
      // cancelBy- user/artist
      if (!bookingId || !amount || !cancelBy)
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
          cancelBy: cancelBy,
          OtherDetails,
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
          findBooking.artist._id.toString(),
          findArtistManager.map((item) => item.manager),
        ]) {
          const title = bookingContent.bookingCancelByUser(
            findBooking.artist
          ).subject;
          const description = bookingContent.bookingCancelByUser(
            findBooking.artist
          ).text;
          bookingCancelByUserIcon;
          await new NotificationServices().notificationGenerate(
            index,
            findBooking.user._id.toString(),
            title,
            description,
            bookingCancelByUserIcon,
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
  async getAllBooking(req: Request, res: Response, next: NextFunction) {
    try {
      const allBooking = await BookingSchema.find({}).populate(
        "artist user eventType serviceType"
      );
      res.json({
        success: {
          data: allBooking,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async bookingTest(req: Request, res: Response, next: NextFunction) {
    try {
      const allBooking = await BookingSchema.find({
        "eventDate.end": { $gt: new Date("2022-02-04T07:47:24.000Z") },
      }).select("-__v");
      res.json({
        success: {
          data: allBooking,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async removeBooking(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, bookingsIds } = req.body;
      if (!userId || !Array.isArray(bookingsIds))
        throw new BadRequest(bookingMessage.error.allField);
      const updateBookings = await BookingSchema.updateMany(
        { _id: { $in: bookingsIds } },
        {
          $addToSet: {
            isDeletesId: userId,
          },
        }
      );
      res.json({
        success: {
          message: bookingMessage.success.removeBooking,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async bookingDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const { bookingId } = req.params;
      const bookingDetails = await BookingSchema.findById(bookingId);
      res.json({
        success: {
          data: bookingDetails,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default BookingController;
