import { Request, Response, NextFunction } from "express";
import { BadRequest, GatewayTimeout, NotAcceptable } from "http-errors";
import { NotificationSchema } from "../models";
import { NotificationServices } from "../services";
import { superAdminSendToUserIcon } from "../notificationIcon";
import { notificationMessage } from "../resultMessage";

class NotificationController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { sendToId, selfId, title, description, iconUrl } = req.body;
      if (!sendToId || !selfId || !title || !description || !iconUrl)
        throw new BadRequest(notificationMessage.error.allField);

      const sendNotification =
        await new NotificationServices().notificationGenerate(
          sendToId,
          selfId,
          title,
          description,
          iconUrl,
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

      return res.json({
        success: { message: notificationMessage.success.create },
      });
    } catch (error) {
      next(error);
    }
  }
  public async getSelectedUserNotification(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userId } = req.params;
      if (!userId) throw new BadRequest(notificationMessage.error.allField);

      const getNotification = await NotificationSchema.findOne({
        user: userId,
      });
      if (!getNotification)
        return res.json({
          success: {
            data: [],
          },
        });

      return res.json({
        success: {
          data: getNotification.notification,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async makeRead(req: Request, res: Response, next: NextFunction) {
    try {
      const { notificationIds } = req.body;
      if (!notificationIds.length)
        throw new BadRequest(notificationMessage.error.allField);
      const makeRead = await NotificationSchema.updateOne(
        { "notification._id": { $in: notificationIds } },
        {
          "notification.$[elem].isRead": true,
        },
        {
          arrayFilters: [{ "elem._id": { $in: notificationIds } }],
          upsert: true,
        }
      );
      if (!makeRead)
        throw new NotAcceptable(notificationMessage.error.notUpdate);
      return res.json({
        success: {
          message: notificationMessage.success.makeRed,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { notificationIds } = req.body;
      if (!notificationIds.length)
        throw new BadRequest(notificationMessage.error.allField);
      const deleteNotification = await NotificationSchema.updateMany(
        { "notification._id": { $in: notificationIds } },
        {
          $pull: {
            notification: {
              _id: { $in: notificationIds },
            },
          },
        }
      );
      if (!deleteNotification)
        throw new NotAcceptable(notificationMessage.error.notDelete);
      return res.json({
        success: {
          message: notificationMessage.success.deleted,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
export default NotificationController;
