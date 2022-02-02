import { Request, Response, NextFunction } from "express";
import { BookingSchema, UserSchema } from "../models";
import { NotificationServices } from "../services";
import { eventCompleteIcon, pastBookingConfirmIcon } from "../notificationIcon";
import { BookingContent } from "../emailContent";
class BookingSchedule {
  async checkEventExpire() {
    try {
      const getAllBooking: any = await BookingSchema.find({
        "eventDate.end": { $lt: new Date() },
        status: "confirm",
      })
        .populate("user")
        .populate("artist");
      const updateToStatusPast = await BookingSchema.updateMany(
        {
          "eventDate.end": { $lt: new Date() },
          status: "confirm",
        },
        {
          status: "past",
        }
      );

      if (getAllBooking.length) {
        const findSuperAdmin: any = await UserSchema.findOne({ role: "admin" });
        const bookingContent = new BookingContent();
        for (let index of getAllBooking) {
          if (index?.user?._id) {
            const title = bookingContent.eventDateCross(index.user).subject;
            const description = bookingContent.eventDateCross(index.user).text;

            await new NotificationServices().notificationGenerate(
              index?.user?._id.toString(),
              findSuperAdmin._id.toString(),
              title,
              description,
              eventCompleteIcon,
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
      }
    } catch (error: any) {
      new Error(error);
    }
  }

  async afterEndEventLongDays() {
    try {
      const completeEvent: any = await BookingSchema.find({
        status: "past",
        isComplete: false,
        "eventDate.end": {
          $lte: new Date(new Date().getTime() - 86400000 * 14),
        },
      }).populate("artist");

      const updateBooking = await BookingSchema.updateMany(
        {
          status: "past",
          isComplete: false,
          "eventDate.end": {
            $lte: new Date(new Date().getTime() - 86400000 * 14),
          },
        },
        {
          isComplete: true,
        }
      );

      if (completeEvent?.length) {
        const bookingContent = new BookingContent();
        for (let index of completeEvent) {
          const title = bookingContent.customerConfirmPastEventArtist(
            index.artist
          ).subject;
          const description = bookingContent.customerConfirmPastEventArtist(
            index.artist
          ).text;
          await new NotificationServices().notificationGenerate(
            index.artist._id.toString(),
            index.user.toString(),
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
      }
    } catch (error) {
      new Error();
    }
  }
}
export default BookingSchedule;
