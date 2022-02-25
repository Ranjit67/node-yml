import { Response, Request, NextFunction } from "express";
import {
  BadRequest,
  InternalServerError,
  GatewayTimeout,
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
  OrderSchema,
  PaymentSchema,
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
class BookingPayment {
  async paymentSuccess(
    artistId: string,
    userId: string,
    bookingId: string,
    paymentData: any,
    walletAmount: number,
    bankAmount: number,
    promoCodeData: any,
    promoCodeAmount: number
  ) {
    try {
      // payment status update
      const createPayment = await PaymentSchema.create({
        booking: bookingId,
        artist: artistId,
        user: userId,
        walletAmount: walletAmount,
        bankAmount: bankAmount,
        paymentData,
        promoCode: promoCodeData,
        promoCodeDisCountAmount: promoCodeAmount,
        timestamp: new Date(),
      });
      if (!createPayment)
        throw new InternalServerError(bookingMessage.error.paymentNotCreated);
      const updateInBooking = await BookingSchema.findByIdAndUpdate(bookingId, {
        payment: createPayment._id,
      });
      if (!updateInBooking)
        throw new InternalServerError(bookingMessage.error.paymentNotUpdated);
    } catch (error) {
      throw error;
    }
  }

  async onlyPaymentTime(
    bookingId: string,
    artistId: string,
    userId: string,
    walletAmount: number,
    bankAmount: number,
    promoCodeData: any,
    paymentData: any,
    promoCodeAmount: number
  ) {
    try {
      const createPayment = await PaymentSchema.create({
        booking: bookingId,
        artist: artistId,
        user: userId,
        walletAmount: walletAmount,
        bankAmount: bankAmount,
        paymentData,
        promoCode: promoCodeData,
        promoCodeDisCountAmount: promoCodeAmount,
        timestamp: new Date(),
      });
      if (!createPayment)
        throw new InternalServerError(bookingMessage.error.paymentNotCreated);
      const updateInBooking = await BookingSchema.findByIdAndUpdate(bookingId, {
        payment: createPayment._id,
        isPayment: true,
      });
      if (!updateInBooking)
        throw new InternalServerError(bookingMessage.error.paymentNotUpdated);
    } catch (error) {
      throw error;
    }
  }

  async WalletRefund(
    findBooking: any,
    walletRefund: number,
    walletHistoryTitle: string,
    walletHistoryDescription: string
  ) {
    try {
      const firstWalletUpdate = await WalletSchema.updateOne(
        { user: findBooking.user._id.toString() },
        {
          $inc: {
            balance: walletRefund,
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
                amount: +walletRefund,
                description: walletHistoryDescription,
                timestamp: new Date(),
              },
            },
          }
        );
        if (!createWalletHistory)
          throw new NotAcceptable(bookingMessage.error.walletHistoryNotCreated);
      } else {
        const walletCreate = await WalletSchema.create({
          user: findBooking.user_id.toString(),
          balance: +walletRefund,
          spent: 0,
        });
        if (!walletCreate)
          throw new NotAcceptable(bookingMessage.error.walletNotCreated);

        const createWalletHistory = await WalletHistorySchema.create({
          user: findBooking.user._id.toString(),
          transactionHistory: [
            {
              title: walletHistoryTitle,
              type: "Credit",
              amount: +walletRefund,
              description: walletHistoryDescription,
              timestamp: new Date(),
            },
          ],
        });
        if (!createWalletHistory)
          throw new NotAcceptable(bookingMessage.error.walletHistoryNotCreated);
      }
    } catch (error) {
      throw error;
    }
  }
  async bookingCancelNotificationByUser(findBooking: any) {
    try {
      const findArtistManager = await AssignArtistSchema.find({
        "artists.artist": findBooking.artist._id.toString(),
      }).select("manager -_id");
      const bookingContent = new BookingContent();

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
    } catch (error) {
      throw error;
    }
  }

  async bookingCancelNotificationByArtist(findBooking: any) {
    try {
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
          index === findBooking.artist._id.toString()
            ? bookingContent.bookingCancelByArtistSelf(findBooking.artist)
                .subject
            : bookingContent.bookingCancelArtist(findBooking.user).subject;
        const description =
          index === findBooking.artist._id.toString()
            ? bookingContent.bookingCancelByArtistSelf(findBooking.artist).text
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
    } catch (error) {
      throw error;
    }
  }
}

class BookingController extends BookingPayment {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        eventStartDate,
        eventEndDate,

        crowdSize,
        serviceId,
        bookingPrice,

        artistId,
        userId,
        personalizedMessage,
        eventDuration,
        OtherDetails,
        eventId,
        personalizedMsgDate,
        requestDetails,
        bankAmount,
        walletAmount,
        promoCodeAmount,
        promoCodeId,
        paymentStatus,
        paymentData,
        eventTime,

        address,
        lat,
        lng,
        country,
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

        eventLocation: address,
        location: {
          lat: lat ? +lat : 0,
          lng: lng ? +lng : 0,
          country: country ?? "",
        },
        crowdSize,
        serviceType: serviceId,
        bookingPrice,
        status: "pending",
        artist: artistId,
        user: userId,
        personalizedMessage,
        eventDuration: eventDuration ? parseInt(eventDuration) : 0,
        OtherDetails,
        eventType: eventId,
        personalizedMsgDate,
        timestamp: new Date(),
        eventTime,

        bookingType: personalizedMessage ? "personalizedMessage" : "other",

        isPayment: paymentStatus === "success" ? true : false,
      });

      if (!createBooking)
        throw new InternalServerError(bookingMessage.error.notCreated);
      const requestCreate = await RequestSchema.create({
        requestType:
          paymentStatus === "success"
            ? "payment"
            : personalizedMessage
            ? "personalize"
            : "pricing",
        receiverUser: artistId,
        senderUser: userId,
        details: requestDetails,
        timestamp: new Date(),
        booking: createBooking._id,
      });
      if (!requestCreate)
        throw new InternalServerError(bookingMessage.error.requestNotCreated);

      if (paymentStatus !== "success") {
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
      } else {
        // payment status update
        await super.paymentSuccess(
          artistId,
          userId,
          createBooking._id,
          paymentData,
          walletAmount,
          bankAmount,
          promoCodeData,
          promoCodeAmount
        );

        // payment status update end

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
      }
      res.json({
        success: {
          message:
            paymentStatus === "success"
              ? bookingMessage.success.bookingCreatedSuccess
              : bookingMessage.success.bookingCreatedForPaymentSuccess,
        },
      });
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
        .populate("payment")
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
        .populate("bookingReschedule")
        .populate("payment")
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
        promoCodeId,
        promoCodeAmount,
        paymentData,
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

      await super.onlyPaymentTime(
        bookingId,
        findBooking.artist,
        findBooking.user,
        walletAmount,
        bankAmount,
        promoCodeData,
        paymentData,
        promoCodeAmount
      );

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
          ...superAdmin.map((item) => item._id),
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
  async bookingCancel(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        bookingId,
        walletRefund,
        bankRefund,
        cancelBy,
        walletHistoryTitle,
        walletHistoryDescription,
        OtherDetails,
      } = req.body;
      const findBooking: any = await BookingSchema.findById(bookingId)
        .populate("artist")
        .populate("user");
      if (!findBooking)
        throw new NotAcceptable(bookingMessage.error.noBookingFound);
      const updateRequest = await RequestSchema.updateOne(
        { booking: bookingId, status: "pending" },
        {
          isCancel: true,
        }
      );
      const updateBookingStatus = await BookingSchema.findByIdAndUpdate(
        bookingId,
        {
          status: "cancel",
          cancelBy: cancelBy,
          cancelDate: new Date(),
          OtherDetails,
        }
      );
      if (!updateBookingStatus)
        throw new NotAcceptable(bookingMessage.error.bookingNotUpdated);
      if (!findBooking?.payment)
        throw new NotAcceptable(bookingMessage.error.noBookingFound);
      const updatePaymentStatus = await PaymentSchema.findByIdAndUpdate(
        findBooking?.payment.toString(),
        {
          bankRefundAmount: bankRefund ?? 0,
          walletRefundAmount: walletRefund ?? 0,
          walletRefund: true,
          bankRefund: bankRefund ? false : true,
          cancelDate: new Date(),
        }
      );
      if (!updatePaymentStatus)
        throw new NotAcceptable(bookingMessage.error.oldData);
      if (walletRefund) {
        await super.WalletRefund(
          findBooking,
          +walletRefund,

          walletHistoryTitle,
          walletHistoryDescription
        );
      }

      if (cancelBy === "user") {
        await super.bookingCancelNotificationByUser(findBooking);
      } else {
        //cancel by artist
        await super.bookingCancelNotificationByArtist(findBooking);
      }
      res.json({
        success: {
          message: bankRefund
            ? bookingMessage.success.bookingCancel
            : bookingMessage.success.bookingCancelWallet,
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
      const { id, date } = req.body;
      const update = await BookingSchema.findByIdAndUpdate(id, {
        timestamp: date,
      });
      res.json({
        success: {
          data: update,
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
      if (!updateBookings.modifiedCount)
        throw new NotAcceptable(bookingMessage.error.noBookingFound);
      if (updateBookings.modifiedCount !== bookingsIds.length)
        throw new NotAcceptable(bookingMessage.error.allBooking);
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
      const bookingDetails = await BookingSchema.findById(bookingId)
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
          select: "-password -fcmToken",
        })
        .populate("eventType")
        .populate("serviceType")
        .populate("bookingReschedule")
        .populate({ path: "user", select: "-password -fcmToken" })
        .populate("orderId")
        .populate({
          path: "personalizedVideo",
          select: "-__v -booking -artist -user -booking -videoFile ",
        });
      res.json({
        success: {
          data: bookingDetails,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async bookingFail(req: Request, res: Response, next: NextFunction) {
    try {
      const { bookingId, paymentId, newPaymentId, orderId, paymentStatus } =
        req.body;
      if (!orderId) throw new BadRequest("All field are require.");

      const updateBookingData = await BookingSchema.findOneAndUpdate(
        { _id: bookingId, orderId: { $exists: false } },
        {
          paymentId,
          paymentStatus: paymentStatus ?? "fail",
          orderId,
        }
      );
      if (!updateBookingData) {
        const updateOrderData = await BookingSchema.findOneAndUpdate(
          { orderId, paymentId },
          {
            paymentStatus: paymentStatus ?? "fail",
            paymentId: newPaymentId,
          }
        );
        if (!updateOrderData)
          throw new BadRequest(bookingMessage.error.bookingTokenFail);
        res.json({
          success: {
            message: bookingMessage.success.paymentFailed,
          },
        });
      } else {
        res.json({
          success: {
            message: bookingMessage.success.paymentFailed,
          },
        });
      }
    } catch (error) {
      next(error);
    }
  }
  async bookingPaymentConfirm(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        bookingId,
        orderId,
        paymentId,
        newPaymentId,
        //
        // paymentAmount,
        requestDetails,
        bankAmount, //important
        walletAmount,
        promoCodeAmount,
        promoCodeId,
      } = req.body;
      let promoCodeData;
      if (promoCodeId) {
        promoCodeData = await PromoCodeSchema.findById(promoCodeId);
      }
      // if (!orderId) throw new BadRequest(bookingMessage.error.allField);
      if (paymentId) {
        const findBooking: any = await BookingSchema.findOne({ paymentId });
        if (findBooking?.paymentStatus !== "fail")
          throw new BadRequest(bookingMessage.error.bookingTokenFail);
        const updateBookingData = await BookingSchema.findOneAndUpdate(
          { paymentId },
          {
            paymentId: newPaymentId,
            paymentStatus: "success",
            isPayment: true,
            promoCodeData: promoCodeData ?? {},
            bankAmount: +bankAmount ?? findBooking.bookingPrice,
            walletAmount: +walletAmount ?? 0,
            promoCodeAmount: +promoCodeAmount ?? 0,
          }
        );
        if (!updateBookingData)
          throw new GatewayTimeout(bookingMessage.error.somethingWrong);
        // request to artist
        const requestCreate = await RequestSchema.create({
          requestType: "payment",
          senderUser: findBooking.user,
          receiverUser: findBooking.artist,
          booking: findBooking._id,
          details: requestDetails,
          timestamp: new Date(),
        });
        if (!requestCreate)
          throw new NotAcceptable(bookingMessage.error.bookingRequest);
        // notification start
        const findArtistManager = await AssignArtistSchema.find({
          "artists.artist": findBooking?.artist,
        }).select("manager -_id");
        const bookingContent = new BookingContent();
        for (let index of [
          findBooking?.user,
          findBooking?.artist,
          ...findArtistManager.map((item) => item.manager),
        ]) {
          const title =
            index === findBooking?.user
              ? bookingContent.newBookingUser().subject
              : bookingContent.newBookingArtist().subject;
          const description =
            index === findBooking?.user
              ? bookingContent.newBookingUser().text
              : bookingContent.newBookingArtist().text;
          const bookingNotificationIcon =
            index === findBooking?.user ? newBookingUser : newBookingArtist;
          await new NotificationServices().notificationGenerate(
            index,
            findBooking?.user,
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
      } else {
        const findBookingFirst: any = await BookingSchema.findOne({
          _id: bookingId,
        });
        if (findBookingFirst?.orderId)
          throw new BadRequest(bookingMessage.error.bookingTokenFail);
        const updateBookingData = await BookingSchema.findOneAndUpdate(
          { _id: bookingId },
          {
            orderId,
            paymentStatus: "success",
            isPayment: true,
            promoCodeData: promoCodeData ?? {},
            bankAmount: +bankAmount ?? findBookingFirst?.bookingPrice,
            walletAmount: +walletAmount ?? 0,
            promoCodeAmount: +promoCodeAmount ?? 0,
          }
        );
        if (!updateBookingData)
          throw new GatewayTimeout(bookingMessage.error.somethingWrong);
        // request to artist
        const requestCreate = await RequestSchema.create({
          requestType: "payment",
          senderUser: findBookingFirst.user,
          receiverUser: findBookingFirst.artist,
          booking: findBookingFirst._id,
          details: requestDetails,
          timestamp: new Date(),
        });
        if (!requestCreate)
          throw new NotAcceptable(bookingMessage.error.bookingRequest);
        // notification start
        const findArtistManager = await AssignArtistSchema.find({
          "artists.artist": findBookingFirst?.artist,
        }).select("manager -_id");
        const bookingContent = new BookingContent();
        for (let index of [
          findBookingFirst?.user,
          findBookingFirst?.artist,
          ...findArtistManager.map((item) => item.manager),
        ]) {
          const title =
            index === findBookingFirst?.user
              ? bookingContent.newBookingUser().subject
              : bookingContent.newBookingArtist().subject;
          const description =
            index === findBookingFirst?.user
              ? bookingContent.newBookingUser().text
              : bookingContent.newBookingArtist().text;
          const bookingNotificationIcon =
            index === findBookingFirst?.user
              ? newBookingUser
              : newBookingArtist;
          await new NotificationServices().notificationGenerate(
            index,
            findBookingFirst?.user,
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
      }

      res.json({
        success: {
          message: bookingMessage.success.paymentSuccess,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default BookingController;
