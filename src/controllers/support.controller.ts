import { Request, Response, NextFunction } from "express";
import { BadRequest, NotAcceptable } from "http-errors";
import { SupportSchema, UserSchema } from "../models";
import { supportMessage } from "../resultMessage";
import EmailContent from "../emailContent";
import { EmailService } from "../services";

class SupportController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, message } = req.body;
      if (!userId || !message)
        throw new BadRequest(supportMessage.error.allField);
      const saveSupport = await SupportSchema.create({
        userRef: userId,
        message,
      });
      if (!saveSupport)
        throw new NotAcceptable(supportMessage.error.dataNotAdded);
      res.json({ data: supportMessage.success.supportMessageSent });
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
        path: "userRef",
        select: "-password",
      });

      res.json({ data: supportList });
    } catch (error) {
      next(error);
    }
  }
  public async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { supportId } = req.params;
      if (!supportId) throw new BadRequest(supportMessage.error.allField);
      const support = await SupportSchema.findById(supportId).populate({
        path: "userRef",
        select: "-password",
      });
      if (!support) throw new NotAcceptable(supportMessage.error.dataNotFound);
      res.json({ data: support });
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
      res.json({ data: supportMessage.success.deleteSuccesses });
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
      const emailContent = new EmailContent().supportEmailContent(
        findUser?.email,
        findUser,
        message,
        subject
      );
      const SendEmail = await new EmailService().emailSend(emailContent);

      res.json({
        data: supportMessage.success.supportMessageSendToUser,
        SendEmail,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default SupportController;
