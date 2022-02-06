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
  AssignArtistSchema,
} from "../models";
import { bookingRescheduleMessage } from "../resultMessage";
import { BookingContent } from "../emailContent";
import {
  bookingRescheduleByUserPendingUserIcon,
  bookingRescheduleByUserPendingArtistIcon,
  bookingRescheduleAcceptedByArtistIcon,
  bookingRescheduleAcceptedByUserIcon,
} from "../notificationIcon";
import { NotificationServices } from "../services";

class BookingRescheduleController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        bookingId,
        rescheduleStartDate,
        rescheduleEndDate,
        personalizedMsgDate,
        rescheduleBy,
        requestDetails,
      } = req.body;
      const checkRescheduledBooking = await BookingRescheduleSchema.findOne({
        booking: bookingId,
      });
      if (checkRescheduledBooking)
        throw new Conflict(
          bookingRescheduleMessage.error.bookingRescheduleAlreadyExist
        );
      const findBooking: any = await BookingSchema.findById(bookingId)
        .populate("artist")
        .populate("user");
      if (!findBooking)
        throw new NotAcceptable(bookingRescheduleMessage.error.bookingNotFound);
      const createReschedule = await BookingRescheduleSchema.create({
        artist: findBooking.artist._id.toString(),
        user: findBooking.user._id.toString(),
        rescheduleBy: rescheduleBy,
        booking: findBooking._id.toString(),
        rescheduleDate: {
          start: rescheduleStartDate,
          end: rescheduleEndDate,
        },
        personalizedMsgDate,
        timestamp: new Date(),
      });
      const updateBooking = await BookingSchema.findByIdAndUpdate(bookingId, {
        bookingReschedule: createReschedule._id,
      });
      const findArtistManager = await AssignArtistSchema.find({
        "artists.artist": findBooking.artist._id.toString(),
      }).select("manager -_id");

      const bookingContent = new BookingContent();

      if (rescheduleBy === "artist") {
        const createRequestReschedule = await RequestSchema.create({
          requestType: "rescheduledArtist",
          senderUser: findBooking.artist._id.toString(),
          receiverUser: findBooking.user._id.toString(),
          booking: findBooking._id.toString(),
          details: requestDetails,
          reschedule: createReschedule._id.toString(),
          timestamp: new Date(),
        });
        if (!createReschedule)
          throw new InternalServerError(
            bookingRescheduleMessage.error.notCreated
          );
        // notification start
        for (let index of [
          findBooking.user._id.toString(),
          findBooking.artist._id.toString(),
          ...findArtistManager.map((item) => item.manager),
        ]) {
          const title =
            index === findBooking.artist._id.toString()
              ? bookingContent.bookingRescheduleByArtistPendingArtist(
                  findBooking.artist
                ).subject
              : bookingContent.bookingRescheduleByArtistPendingUser(
                  findBooking.user
                ).subject;
          const description =
            index === findBooking.artist._id.toString()
              ? bookingContent.bookingRescheduleByArtistPendingArtist(
                  findBooking.artist
                ).text
              : bookingContent.bookingRescheduleByArtistPendingUser(
                  findBooking.user
                ).text;
          const bookingNotificationIcon =
            index === findBooking.artist._id.toString()
              ? bookingRescheduleByUserPendingUserIcon
              : index === findBooking.artist._id.toString()
              ? bookingRescheduleByUserPendingArtistIcon
              : bookingRescheduleByUserPendingArtistIcon;
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

        // notification end
        res.json({
          success: {
            message: bookingRescheduleMessage.success.createdUser,
          },
        });
      } else {
        const createRequestReschedule = await RequestSchema.create({
          requestType: "rescheduledCustomer",
          senderUser: findBooking.user._id.toString(),
          receiverUser: findBooking.artist._id.toString(),
          booking: findBooking._id.toString(),
          details: requestDetails,
          reschedule: createReschedule._id.toString(),
          timestamp: new Date(),
        });
        if (!createReschedule)
          throw new InternalServerError(
            bookingRescheduleMessage.error.notCreated
          );
        // notification start
        // console.log("hit-1");
        for (let index of [
          findBooking.user._id.toString(),
          findBooking.artist._id.toString(),
          ...findArtistManager.map((item) => item.manager),
        ]) {
          const title =
            index === findBooking.user._id.toString()
              ? bookingContent.bookingRescheduleByUserPendingUser(
                  findBooking.user
                ).subject
              : bookingContent.bookingRescheduleByUserPendingArtist(
                  findBooking.artist
                ).subject;
          const description =
            index === findBooking.user._id.toString()
              ? bookingContent.bookingRescheduleByUserPendingUser(
                  findBooking.user
                ).text
              : bookingContent.bookingRescheduleByUserPendingArtist(
                  findBooking.artist
                ).text;
          const bookingNotificationIcon =
            index === findBooking.user._id.toString()
              ? bookingRescheduleByUserPendingUserIcon
              : index === findBooking.artist._id.toString()
              ? bookingRescheduleByUserPendingArtistIcon
              : bookingRescheduleByUserPendingArtistIcon;
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
      const { requestId, permissionBoolean, actionBy, reason } = req.body;
      const findRequest: any = await RequestSchema.findById(requestId)
        .populate("reschedule")
        .populate("senderUser")
        .populate("receiverUser");
      const bookingContent = new BookingContent();
      if (permissionBoolean) {
        //    permission accepted
        // request status accept
        const updateRequest = await RequestSchema.findByIdAndUpdate(requestId, {
          status: "accept",
        });
        if (!findRequest.reschedule)
          throw new InternalServerError(
            bookingRescheduleMessage.error.actionDenied
          );
        // findRequest.personalizedMsgDate
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
        if (actionBy === "artist") {
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
        } else {
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
        }

        // notification end

        res.json({
          success: {
            message: bookingRescheduleMessage.success.accepted,
          },
        });
      } else {
        //    permission rejected
        // request status reject only
        const updateBooking = await BookingSchema.findByIdAndUpdate(
          findRequest.reschedule?.booking?.toString(),
          {
            bookingReschedule: null,
            reason: reason,
          }
        );
        const updateRequest = await RequestSchema.findByIdAndUpdate(requestId, {
          status: "reject",
        });
        // notification start
        if (actionBy === "artist") {
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
        } else {
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
        }

        // notification end
        res.json({
          success: {
            message: bookingRescheduleMessage.success.rejected,
          },
        });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async updateBooking(req: Request, res: Response, next: NextFunction) {
    const { rescheduleEndDate, id } = req.body;
    const update = await BookingRescheduleSchema.findByIdAndUpdate(id, {
      rescheduleDate: {
        end: rescheduleEndDate,
      },
    });
    res.json({ data: "Update Successfully" });
  }
}
export default BookingRescheduleController;
