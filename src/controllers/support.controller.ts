import { Request, Response, NextFunction } from "express";
import { BadRequest, NotAcceptable } from "http-errors";
import { SupportSchema, UserSchema } from "../models";
import { supportMessage } from "../resultMessage";
import { SupportContent } from "../emailContent";
import { EmailService, NotificationServices } from "../services";
import { newSupportMessageAddIcon } from "../notificationIcon";

class SupportController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        message,
        firstName,
        lastName,
        phoneNumber,
        countryCode,
        email,
        userId,
      } = req.body;
      if (
        !firstName ||
        !message ||
        !lastName ||
        !phoneNumber ||
        !countryCode ||
        !email
      )
        throw new BadRequest(supportMessage.error.allField);
      const saveSupport = await SupportSchema.create({
        firstName,
        lastName,
        phoneNumber,
        countryCode,
        email,
        message,
        user: userId ?? null,
        timestamp: new Date(),
      });
      if (!saveSupport)
        throw new NotAcceptable(supportMessage.error.dataNotAdded);
      // notification start
      const supportContent = new SupportContent();
      const findAdmins = await UserSchema.find({ role: "admin" }).select("_id");
      const title = supportContent.supportNotification().subject;
      const description = supportContent.supportNotification().text;

      for (let index of [...findAdmins.map((item) => item._id)]) {
        await new NotificationServices().notificationGenerate(
          index,
          userId,
          title,
          description,
          newSupportMessageAddIcon,
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
        success: { message: supportMessage.success.supportMessageSent },
      });
    } catch (error) {
      next(error);
    }
  }
  public async getAllSupportList(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const supportList = await SupportSchema.find().populate({
        path: "user",
        select: "-password",
      });

      res.json({ success: { data: supportList } });
    } catch (error) {
      next(error);
    }
  }
  public async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { supportId } = req.params;
      if (!supportId) throw new BadRequest(supportMessage.error.allField);
      const support = await SupportSchema.findById(supportId).populate({
        path: "user",
        select: "-password -fcmToken -__v",
      });
      if (!support) throw new NotAcceptable(supportMessage.error.dataNotFound);
      res.json({ success: { data: support } });
    } catch (error) {
      next(error);
    }
  }
  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { supportIds } = req.body;
      if (!supportIds.length)
        throw new BadRequest(supportMessage.error.allField);
      const support = await SupportSchema.deleteMany({
        _id: { $in: supportIds },
      });
      if (!support) throw new NotAcceptable(supportMessage.error.dataNotFound);
      res.json({
        success: { message: supportMessage.success.deleteSuccesses },
      });
    } catch (error) {
      next(error);
    }
  }
  public async supportEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const { message, subject } = req.body;
      if (!userId || !message)
        throw new BadRequest(supportMessage.error.allField);
      const findUser = await UserSchema.findById(userId);
      if (!findUser?.email)
        throw new NotAcceptable(supportMessage.error.supportEmail);
      const emailContent = new SupportContent().supportEmailContent(
        findUser,
        message,
        subject
      );
      const SendEmail = await new EmailService().emailSend(
        findUser?.email,
        emailContent.subject,
        emailContent.text
      );

      res.json({
        success: {
          message: supportMessage.success.supportMessageSendToUser,
          SendEmail,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default SupportController;
