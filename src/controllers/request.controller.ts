import { Request, Response, NextFunction } from "express";
import {
  NotAcceptable,
  BadRequest,
  Conflict,
  InternalServerError,
  NotFound,
} from "http-errors";
import {
  RequestSchema,
  BookingSchema,
  UserSchema,
  AssignArtistSchema,
  BookingRescheduleSchema,
} from "../models";
import {
  requestMessage,
  // managerAccept
  assignArtistMessage,
  // bookingReschedule
  bookingRescheduleMessage,
} from "../resultMessage";
import {
  BookingContent,
  RequestContent,
  // manageraccept
  AssignArtistContent,
} from "../emailContent";
import { NotificationServices } from "../services";
import {
  bookingPriceReceivedByUser,
  bookingConfirm,
  bookingCancelByArtistIcon,
  removeManagerIcon,
  // manager accept
  assignArtistToManager,
  bookingRescheduleAcceptedByArtistIcon,
} from "../notificationIcon";
// manager accept

class RequestHandler {
  public async managerAccept(
    res: Response,
    next: NextFunction,
    findRequest: any
  ) {
    try {
      //  here sender is manager
      // here receiver is artist
      const artistId = findRequest?.receiverUser?._id;
      const managerId = findRequest?.senderUser?._id;
      const findManager = await UserSchema.find({
        _id: { $in: [artistId, managerId] },
      });
      const findArtistData = findManager.find(
        (item) =>
          item.role === "artist" && item._id.toString() === artistId.toString()
      );
      const findManagerData = findManager.find(
        (item) =>
          item.role === "manager" &&
          item._id.toString() === managerId.toString()
      );
      // notification
      const assignArtistContent = new AssignArtistContent();
      const title =
        assignArtistContent.managerRequestAcceptedByArtist(
          findManagerData
        ).subject;

      const description =
        assignArtistContent.managerRequestAcceptedByArtist(
          findManagerData
        ).text;

      // notification credentials end
      if (!findArtistData || !findManagerData)
        throw new BadRequest(assignArtistMessage.error.invalidUser);

      const updateAssignArtist = await AssignArtistSchema.findOneAndUpdate(
        {
          manager: managerId,
          "artists.artist": { $ne: artistId },
        },
        {
          $addToSet: {
            artists: {
              artist: artistId,
            },
          },
        }
      );
      // notification start

      await new NotificationServices().notificationGenerate(
        managerId,
        artistId,
        title,
        description,
        assignArtistToManager,
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
      if (!updateAssignArtist) {
        const saveAssignArtist = await AssignArtistSchema.create({
          manager: managerId,
          artists: [
            {
              artist: artistId,
              timestamp: new Date(),
            },
          ],
        }); // here Error handling throw middleware.

        if (!saveAssignArtist)
          throw new InternalServerError(assignArtistMessage.error.notAssign);
        // notification start  only send to manager

        await new NotificationServices().notificationGenerate(
          managerId,
          artistId,
          title,
          description,
          assignArtistToManager,
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

      //
    } catch (error) {
      throw error;
    }
  }
  public async managerReject(
    res: Response,
    next: NextFunction,
    findRequest: any
  ) {
    try {
      const findManagerData = findRequest.senderUser;
      const findArtistData = findRequest.receiverUser;
      const assignArtistContent = new AssignArtistContent();
      const title =
        assignArtistContent.managerRequestReject(findManagerData).subject;

      const description =
        assignArtistContent.managerRequestReject(findManagerData).text;
      await new NotificationServices().notificationGenerate(
        findManagerData?._id,
        findArtistData?._id,
        title,
        description,
        assignArtistToManager,
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
    } catch (error) {
      // next(error);
      throw error;
    }
  }
  public async rescheduledCustomer(
    res: Response,
    next: NextFunction,
    findRequest: any,
    permissionBoolean: boolean,
    reason: string
  ) {
    try {
      const bookingContent = new BookingContent();
      if (permissionBoolean) {
        //    permission accepted
        if (!findRequest?.reschedule?.booking.toString())
          throw new NotAcceptable(requestMessage.error.actionTaken);
        const bookingUpdate = await BookingSchema.findByIdAndUpdate(
          findRequest.reschedule?.booking.toString(),
          {
            eventDate: {
              start: findRequest.reschedule?.rescheduleDate?.start ?? null,
              end: findRequest.reschedule?.rescheduleDate?.end ?? null,
            },
            bookingReschedule: null,
            reason: reason,
            personalizedMsgDate:
              findRequest?.reschedule?.personalizedMsgDate ?? null,
          }
        );
        // delete reschedule
        const deleteReschedule =
          await BookingRescheduleSchema.findByIdAndDelete(
            findRequest.reschedule?._id.toString()
          );
        // notification start

        const title = bookingContent.bookingPermissionAcceptedByArtist(
          findRequest.senderUser
        ).subject;

        const description = bookingContent.bookingPermissionAcceptedByArtist(
          findRequest.senderUser
        ).text;
        await new NotificationServices().notificationGenerate(
          findRequest.senderUser._id.toString(),
          findRequest.receiverUser._id.toString(),
          title,
          description,
          bookingRescheduleAcceptedByArtistIcon,
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
      } else {
        //    permission rejected
        // request status reject only
        if (!findRequest?.reschedule?.booking.toString())
          throw new NotAcceptable(requestMessage.error.actionTaken);
        const updateBooking = await BookingSchema.findByIdAndUpdate(
          findRequest.reschedule?.booking?.toString(),
          {
            bookingReschedule: null,
            reason: reason,
          }
        );

        // notification start

        const title = bookingContent.bookingPermissionRejectByArtist(
          findRequest.senderUser
        ).subject;
        const description = bookingContent.bookingPermissionRejectByArtist(
          findRequest.senderUser
        ).text;

        await new NotificationServices().notificationGenerate(
          findRequest.senderUser._id.toString(),
          findRequest.receiverUser._id.toString(),
          title,
          description,
          bookingRescheduleAcceptedByArtistIcon,
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
      }
    } catch (error) {
      // next(error);
      throw error;
    }
  }
  public async rescheduledArtist(
    res: Response,
    next: NextFunction,
    findRequest: any,
    permissionBoolean: boolean,
    reason: string
  ) {
    try {
      const bookingContent = new BookingContent();
      if (permissionBoolean) {
        //    permission accepted
        if (!findRequest?.reschedule?.booking.toString())
          throw new NotAcceptable(requestMessage.error.actionTaken);
        const bookingUpdate = await BookingSchema.findByIdAndUpdate(
          findRequest.reschedule?.booking.toString(),
          {
            eventDate: {
              start: findRequest.reschedule?.rescheduleDate?.start ?? null,
              end: findRequest.reschedule?.rescheduleDate?.end ?? null,
            },
            bookingReschedule: null,
            reason: reason,
            personalizedMsgDate:
              findRequest?.reschedule?.personalizedMsgDate ?? null,
          }
        );
        // delete reschedule
        const deleteReschedule =
          await BookingRescheduleSchema.findByIdAndDelete(
            findRequest.reschedule?._id.toString()
          );
        // notification start

        const findArtistManager = await AssignArtistSchema.find({
          "artists.artist": findRequest.senderUser._id.toString(),
        }).select("manager -_id");
        for (let index of [
          findRequest.senderUser._id.toString(),
          ...findArtistManager.map((item) => item.manager),
        ]) {
          const title = bookingContent.bookingPermissionAcceptedByUser(
            findRequest.senderUser
          ).subject;
          const description = bookingContent.bookingPermissionAcceptedByUser(
            findRequest.senderUser
          ).text;
          await new NotificationServices().notificationGenerate(
            index,
            findRequest.receiverUser._id.toString(),
            title,
            description,
            bookingRescheduleAcceptedByArtistIcon,
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
        //    permission rejected
        // request status reject only
        if (!findRequest?.reschedule?.booking.toString())
          throw new NotAcceptable(requestMessage.error.actionTaken);
        const updateBooking = await BookingSchema.findByIdAndUpdate(
          findRequest.reschedule?.booking?.toString(),
          {
            bookingReschedule: null,
            reason: reason,
          }
        );

        // notification start

        const findArtistManager = await AssignArtistSchema.find({
          "artists.artist": findRequest.senderUser._id.toString(),
        }).select("manager -_id");

        for (let index of [
          findRequest.senderUser._id.toString(),
          ...findArtistManager.map((item) => item.manager),
        ]) {
          const title = bookingContent.bookingPermissionRejectedByUser(
            findRequest.senderUser
          ).subject;
          const description = bookingContent.bookingPermissionRejectedByUser(
            findRequest.senderUser
          ).text;
          await new NotificationServices().notificationGenerate(
            index,
            findRequest.receiverUser._id.toString(),
            title,
            description,
            bookingRescheduleAcceptedByArtistIcon,
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
    } catch (error) {
      // next(error);
      throw error;
    }
  }
  public async priceAccept(
    res: Response,
    next: NextFunction,
    findRequest: any,
    price: number
  ) {
    try {
      const userData = findRequest.senderUser;
      const artistData = findRequest.receiverUser;
      const findUpdateBooking = await BookingSchema.findByIdAndUpdate(
        findRequest.booking,
        {
          bookingPrice: +price,
        }
      );
      if (!findUpdateBooking)
        throw new Conflict(requestMessage.error.bookingPriceNotUpdated);

      const title = new BookingContent().bookingPriceSetByArtistSendToUser(
        userData
      ).subject;
      const description =
        new BookingContent().bookingPriceSetByArtistSendToUser(userData).text;

      await new NotificationServices().notificationGenerate(
        userData._id.toString(),
        artistData._id.toString(),
        title,
        description,
        bookingPriceReceivedByUser,
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
    } catch (error) {
      // next(error);
      throw error;
    }
  }
  async paymentAcceptReject(
    res: Response,
    next: NextFunction,
    findRequest: any,
    isAccept: boolean,
    reason: string
  ) {
    try {
      const bookingContent = new BookingContent();
      if (isAccept) {
        const bookingUpdate = await BookingSchema.findByIdAndUpdate(
          findRequest.booking._id.toString(),
          {
            status: "confirm",
          }
        );
        // notification start
        const findArtistManager = await AssignArtistSchema.find({
          "artists.artist": findRequest.receiverUser._id.toString(),
        }).select("manager -_id");

        const title = bookingContent.bookingConfirmUser(
          findRequest.senderUser
        ).subject;

        const description = bookingContent.bookingConfirmUser(
          findRequest.senderUser
        ).text;
        // bookingConfirm
        await new NotificationServices().notificationGenerate(
          findRequest.senderUser._id.toString(),
          findRequest.receiverUser._id.toString(),
          title,
          description,
          bookingConfirm,
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
      } else {
        // reject

        const bookingUpdate = await BookingSchema.findByIdAndUpdate(
          findRequest.booking._id.toString(),
          {
            status: "cancel",
            cancelBy: "artist",
          }
        );
        const findSuperAdmin = await UserSchema.find({ role: "admin" }).select(
          "_id"
        );
        for (let index of [
          findRequest.senderUser._id.toString(),
          ...findSuperAdmin.map((item) => item._id),
        ]) {
          const title =
            index === findRequest.senderUser._id.toString()
              ? bookingContent.bookingCancelArtist(findRequest.senderUser)
                  .subject
              : bookingContent.bookingCancelNotifyToSuperAdmin().subject;
          const description =
            index === findRequest.senderUser._id.toString()
              ? bookingContent.bookingCancelArtist(findRequest.senderUser).text
              : bookingContent.bookingCancelNotifyToSuperAdmin().text;
          const cancelIcon =
            index === findRequest.senderUser._id.toString()
              ? bookingCancelByArtistIcon
              : bookingCancelByArtistIcon;
          await new NotificationServices().notificationGenerate(
            index,
            findRequest.receiverUser._id.toString(),
            title,
            description,
            cancelIcon,
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
    } catch (error) {
      throw error;
      //  return next(error);
      // new Error(error);
    }
  }
  async managerRemoveAccept(
    res: Response,
    next: NextFunction,
    findRequest: any,
    reason: string
  ) {
    try {
      const managerId = findRequest.senderUser._id.toString();
      const artistId = findRequest.receiverUser._id.toString();
      const findAndUpdate = await AssignArtistSchema.updateOne(
        { manager: managerId },
        {
          $pull: {
            artists: {
              artist: artistId,
            },
          },
        }
      );
      if (!findAndUpdate.matchedCount)
        throw new NotFound(assignArtistMessage.error.managerNotFound);
      if (!findAndUpdate.modifiedCount)
        throw new Conflict(assignArtistMessage.error.artistNotAssignManger);
      const findManger = await UserSchema.findOne({ _id: managerId });
      const assignArtistContent = new AssignArtistContent();
      const title =
        assignArtistContent.artistAssignRemoveManagerSide(findManger).subject;

      const description =
        assignArtistContent.artistAssignRemoveManagerSide(findManger).text;
      await new NotificationServices().notificationGenerate(
        managerId,
        artistId,
        title,
        description,
        assignArtistToManager,
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
    } catch (error) {
      // next(error);
      throw error;
    }
  }
}

class RequestController extends RequestHandler {
  public async requestTracker(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        isAccept,
        requestId,

        // mangerAccept
        // bookingReschdul
        reason,
        // pricing, personalize
        price,
      } = req.body;
      if (!requestId) throw new BadRequest(requestMessage.error.allField);
      const findRequest = await RequestSchema.findById(requestId)
        .populate("senderUser")
        .populate("receiverUser")
        .populate("reschedule")
        .populate("booking");
      if (!findRequest) throw new NotAcceptable(requestMessage.error.noRequest);
      if (findRequest.requestType === "manager") {
        // action by artist
        isAccept
          ? await super.managerAccept(res, next, findRequest)
          : await super.managerReject(res, next, findRequest);
      } else if (findRequest.requestType === "pricing" && isAccept) {
        if (!price) throw new BadRequest(requestMessage.error.priceImportant);
        await super.priceAccept(res, next, findRequest, price);
        // action by artist
      } else if (findRequest.requestType === "rescheduledCustomer") {
        // action by artist
        const reasonManipulation: string = reason ?? "";
        await super.rescheduledCustomer(
          res,
          next,
          findRequest,
          isAccept,
          reasonManipulation
        );
      } else if (findRequest.requestType === "rescheduledArtist") {
        const reasonManipulation: string = reason ?? "";
        await super.rescheduledArtist(
          res,
          next,
          findRequest,
          isAccept,
          reasonManipulation
        );
        // action by user
      } else if (findRequest.requestType === "personalize" && isAccept) {
        if (!price) throw new BadRequest(requestMessage.error.priceImportant);
        await super.priceAccept(res, next, findRequest, price);
        // action by artist
      } else if (findRequest.requestType === "payment") {
        const reasonManipulation: string = reason ?? "";
        await super.paymentAcceptReject(
          res,
          next,
          findRequest,
          isAccept,
          reasonManipulation
        );
        // action by artist
      } else if (findRequest.requestType === "managerRemove" && isAccept) {
        const reasonManipulation: string = reason ?? "";

        await super.managerRemoveAccept(
          res,
          next,
          findRequest,
          reasonManipulation
        );
        // action by artist
      }
      const findRequestUpdate = await RequestSchema.findByIdAndUpdate(
        requestId,
        {
          status: isAccept ? "accept" : "reject",
          reason,
        }
      );
      if (!findRequestUpdate)
        throw new NotAcceptable(requestMessage.error.noRequest);
      res.json({
        success: {
          message: isAccept
            ? requestMessage.success.requestAccept
            : requestMessage.success.rejectRequest,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { requestType, receiverUserId, senderUserId, details, reason } =
        req.body;
      if (!receiverUserId || !senderUserId || !requestType)
        throw new BadRequest(requestMessage.error.allField);

      if (requestType === "manager") {
        const findRequestHaveOrNot = await RequestSchema.findOne({
          requestType: "manager",
          status: { $in: ["pending", "accept"] },
          receiverUser: receiverUserId,
          senderUser: senderUserId,
          deletedUsers: { $ne: receiverUserId },
        });
        if (findRequestHaveOrNot)
          throw new Conflict(requestMessage.error.yourRequestPending);
      }

      const createRequest = await RequestSchema.create({
        requestType,
        receiverUser: receiverUserId,
        senderUser: senderUserId,
        details,
        reason,
        timestamp: new Date(),
      });
      if (!createRequest)
        throw new NotAcceptable(requestMessage.error.notCreated);
      res.json({
        success: {
          message: requestMessage.success.created,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  public async getRequestReceiver(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { receiverUserId } = req.params;
      if (!receiverUserId) throw new BadRequest(requestMessage.error.allField);
      const requestReceiver = await RequestSchema.find({
        receiverUser: receiverUserId,
        deletedUsers: { $ne: receiverUserId },
      })
        .populate({
          path: "senderUser",
          select: "-password -fcmToken",
          populate: [
            {
              path: "events",
              module: "Event",
            },
            {
              path: "category",
              module: "Category",
              select: "-subcategories",
            },
            {
              path: "languages",
              module: "Language",
            },
            {
              path: "genres",
              module: "Genres",
            },
            {
              path: "subcategories",
              module: "SubCategory",
            },
          ],
        })
        .select("-deletedUsers")
        .populate({
          path: "booking",

          populate: [
            {
              path: "serviceType",
              module: "Service",
            },
            {
              path: "personalizedVideo",
              module: "PersonalizeVideo",
            },
            {
              path: "eventType",
              module: "Event",
            },
          ],
        })
        .populate({
          path: "reschedule",
          select: "rescheduleDate rescheduleBy",
        });
      const findUser: any = await UserSchema.findById(receiverUserId);
      if (findUser?.role === "manager") {
        const findAssignArtist = await AssignArtistSchema.findOne({
          manager: receiverUserId,
        }).select("artists.artist -_id");
        const mapArtist = findAssignArtist?.artists.map(
          (artist: any) => artist.artist
        );
        const requestArtistReceiver = await RequestSchema.find({
          receiverUser: { $in: mapArtist },
          requestType: { $ne: "manager" },
          deletedUsers: { $ne: receiverUserId },
        })
          .populate("senderUser")
          .populate("receiverUser");
        const makeTogether = [...requestReceiver, ...requestArtistReceiver];
        return res.json({
          success: {
            data: makeTogether,
          },
        });
      }
      return res.json({
        success: {
          data: requestReceiver,
        },
      });
    } catch (error: any) {
      if (error?.path === "receiverUser")
        return res.json({
          success: {
            data: [],
          },
        });
      next(error);
    }
  }
  public async getRequestSender(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { senderUserId } = req.params;
      if (!senderUserId) throw new BadRequest(requestMessage.error.allField);
      const requestSender = await RequestSchema.find({
        senderUser: senderUserId,
        deletedUsers: { $ne: senderUserId },
      })
        .populate({
          path: "receiverUser",
          select: "-password -fcmToken",
          populate: [
            {
              path: "events",
              module: "Event",
            },
            {
              path: "category",
              module: "Category",
              select: "-subcategories",
            },
            {
              path: "languages",
              module: "Language",
            },
            {
              path: "genres",
              module: "Genres",
            },
            {
              path: "subcategories",
              module: "SubCategory",
            },
          ],
        })
        .populate({
          path: "booking",
          populate: [
            {
              path: "serviceType",
              module: "Service",
            },
            {
              path: "personalizedVideo",
              module: "PersonalizeVideo",
            },
            {
              path: "eventType",
              module: "Event",
            },
          ],
        })
        .populate({
          path: "reschedule",
          select: "rescheduleDate rescheduleBy",
        })
        .select("-deletedUsers");
      res.json({
        success: {
          data: requestSender,
        },
      });
    } catch (error: any) {
      if (error?.path === "senderUser")
        return res.json({
          success: {
            data: [],
          },
        });
      next(error);
    }
  }
  public async acceptPriceSet(req: Request, res: Response, next: NextFunction) {
    try {
      const { requestId, price } = req.body;
      if (!requestId || !price)
        throw new BadRequest(requestMessage.error.allField);
      const findRequest = await RequestSchema.findById(requestId);
      if (!findRequest)
        throw new Conflict(requestMessage.error.requestNotFound);
      const findUpdateBooking = await BookingSchema.findByIdAndUpdate(
        findRequest.booking,
        {
          bookingPrice: price,
        }
      );
      if (!findUpdateBooking)
        throw new Conflict(requestMessage.error.bookingPriceNotUpdated);
      const deleteRequest = await RequestSchema.findByIdAndUpdate(requestId, {
        status: "accept",
      });
      if (!deleteRequest)
        throw new Conflict(requestMessage.error.requestNotDeleted);
      // notification start to user only
      const bookingContent = new BookingContent();
      const findBooking: any = await BookingSchema.findById(findRequest.booking)
        .populate("artist")
        .populate("user");

      const title = new BookingContent().bookingPriceSetByArtistSendToUser(
        findBooking.user
      ).subject;
      const description =
        new BookingContent().bookingPriceSetByArtistSendToUser(
          findBooking.user
        ).text;

      await new NotificationServices().notificationGenerate(
        findBooking.user._id.toString(),
        findBooking.artist._id.toString(),
        title,
        description,
        bookingPriceReceivedByUser,
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
      res.json({
        success: {
          message: requestMessage.success.acceptPriceSet,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async paymentBookingAcceptRejectArtist(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { isAccept, requestId, reason } = req.body;
      if (!requestId) throw new BadRequest(requestMessage.error.allField);
      const findRequest: any = await RequestSchema.findById(requestId)
        .populate("senderUser")
        .populate("receiverUser");

      const bookingContent = new BookingContent();
      if (!findRequest)
        throw new Conflict(requestMessage.error.requestNotFound);
      if (isAccept) {
        const updateRequest = await RequestSchema.findByIdAndUpdate(requestId, {
          status: "accept",
        });
        const bookingUpdate = await BookingSchema.findByIdAndUpdate(
          findRequest.booking.toString(),
          {
            status: "confirm",
          }
        );
        // notification start
        const findArtistManager = await AssignArtistSchema.find({
          "artists.artist": findRequest.receiverUser._id.toString(),
        }).select("manager -_id");

        const title = bookingContent.bookingConfirmUser(
          findRequest.senderUser
        ).subject;

        const description = bookingContent.bookingConfirmUser(
          findRequest.senderUser
        ).text;
        // bookingConfirm
        await new NotificationServices().notificationGenerate(
          findRequest.senderUser._id.toString(),
          findRequest.receiverUser._id.toString(),
          title,
          description,
          bookingConfirm,
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
      } else {
        // reject

        const updateRequest = await RequestSchema.findByIdAndUpdate(requestId, {
          status: "reject",
          reason,
        });
        const bookingUpdate = await BookingSchema.findByIdAndUpdate(
          findRequest.booking.toString(),
          {
            status: "cancel",
            cancelBy: "artist",
          }
        );
        const findSuperAdmin = await UserSchema.find({ role: "admin" }).select(
          "_id"
        );
        for (let index of [
          findRequest.senderUser._id.toString(),
          ...findSuperAdmin.map((item) => item._id),
        ]) {
          const title =
            index === findRequest.senderUser._id.toString()
              ? bookingContent.bookingCancelArtist(findRequest.senderUser)
                  .subject
              : bookingContent.bookingCancelNotifyToSuperAdmin().subject;
          const description =
            index === findRequest.senderUser._id.toString()
              ? bookingContent.bookingCancelArtist(findRequest.senderUser).text
              : bookingContent.bookingCancelNotifyToSuperAdmin().text;
          const cancelIcon =
            index === findRequest.senderUser._id.toString()
              ? bookingCancelByArtistIcon
              : bookingCancelByArtistIcon;
          await new NotificationServices().notificationGenerate(
            index,
            findRequest.receiverUser._id.toString(),
            title,
            description,
            cancelIcon,
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
          message: isAccept
            ? requestMessage.success.bookingAccept
            : requestMessage.success.bookingReject,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async acceptRejectRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const { requestId, reason, details, isAccept } = req.body;
      if (!requestId) throw new BadRequest(requestMessage.error.allField);
      const updateRequest = await RequestSchema.findOneAndUpdate(
        { _id: requestId },
        {
          status: isAccept ? "accept" : "reject",
          reason,
          details,
        }
      );
      if (!updateRequest)
        throw new NotAcceptable(requestMessage.error.notRequestUpdate);
      res.json({
        success: {
          message: isAccept
            ? requestMessage.success.requestAccept
            : requestMessage.success.rejectRequest,
        },
      });
    } catch (error: any) {
      if (error?.path === "_id" || error?.path === "receiverUser")
        return res.status(404).json({
          error: {
            message: requestMessage.error.wrongDataEnter,
          },
        });
      next(error);
    }
  }
  public async createMangerRemoveRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { managerId, artistId, requestDetails } = req.body;
      const findArtist = await UserSchema.findById(artistId);
      if (!findArtist) throw new Conflict(requestMessage.error.artistNotFound);
      const createRequest = await RequestSchema.create({
        senderUser: managerId,
        receiverUser: artistId,
        requestType: "managerRemove",
        details: requestDetails,
        timeStamp: new Date(),
      });
      if (!createRequest)
        throw new NotAcceptable(requestMessage.error.requestNotCreated);
      // notification send start
      const requestContent = new RequestContent();
      const title = requestContent.managerRemove(findArtist).subject;
      const description = requestContent.managerRemove(findArtist).text;

      await new NotificationServices().notificationGenerate(
        artistId,
        managerId,
        title,
        description,
        removeManagerIcon,
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

      // notification send end
      res.json({
        success: {
          message: requestMessage.success.managerRequestCreate,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { requestIds, userId } = req.body;
      if (!Array.isArray(requestIds))
        throw new BadRequest(requestMessage.error.requestIdIsArray);

      const updateRequest = await RequestSchema.updateMany(
        { _id: { $in: requestIds } },
        {
          $addToSet: {
            deletedUsers: userId,
          },
        }
      );
      const deletePendingRequest = await RequestSchema.deleteMany({
        _id: { $in: requestIds },
        senderUser: userId,
        status: "pending",
        requestType: {
          $nin: ["payment", "personalize", "pricing"],
        },
      });

      if (updateRequest.modifiedCount === 0)
        throw new NotAcceptable(requestMessage.error.notDelete);
      if (updateRequest.modifiedCount !== requestIds?.length)
        throw new NotAcceptable(requestMessage.error.allAreNotDelete);
      res.json({
        success: {
          message: requestMessage.success.requestDeleted,
        },
      });
    } catch (error: any) {
      if (error?.path === "_id")
        return res.json({
          error: {
            message: requestMessage.error.invalid,
          },
        });
      next(error);
    }
  }
}
export default RequestController;
