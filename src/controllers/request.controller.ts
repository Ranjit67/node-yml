import { Request, Response, NextFunction } from "express";
import { NotAcceptable, BadRequest, Conflict } from "http-errors";
import {
  RequestSchema,
  BookingSchema,
  UserSchema,
  AssignArtistSchema,
} from "../models";
import { requestMessage } from "../resultMessage";
import { BookingContent, RequestContent } from "../emailContent";
import { NotificationServices } from "../services";
import {
  bookingPriceReceivedByUser,
  bookingConfirm,
  bookingCancelByArtistIcon,
  removeManagerIcon,
} from "../notificationIcon";
class RequestController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { requestType, receiverUserId, senderUserId, details, reason } =
        req.body;
      if (!receiverUserId || !senderUserId || !requestType)
        throw new BadRequest(requestMessage.error.allField);
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
        .populate("senderUser")
        .populate("booking")
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
        .populate("receiverUser")
        .populate("booking")
        .populate({
          path: "reschedule",
          select: "rescheduleDate rescheduleBy",
        });
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
      const { isAccept, requestId } = req.body;
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
      if (updateRequest.matchedCount === 0)
        throw new NotAcceptable(requestMessage.error.requestNotDeleted);
      res.json({
        success: {
          message: requestMessage.success.requestDeleted,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
export default RequestController;
