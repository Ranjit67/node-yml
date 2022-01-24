import { Request, Response, NextFunction } from "express";
import { NotAcceptable, BadRequest } from "http-errors";
import { RequestSchema } from "../models";
import { requestMessage } from "../resultMessage";
class RequestController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { requestType, receiverUserId, senderUserId, details } = req.body;
      if (!receiverUserId || !senderUserId || !requestType)
        throw new BadRequest(requestMessage.error.allField);
      const createRequest = await RequestSchema.create({
        requestType,
        receiverUserRef: receiverUserId,
        senderUserRef: senderUserId,
        details,
        timestamp: new Date(),
      });
      if (!createRequest)
        throw new NotAcceptable(requestMessage.error.notCreated);
      res.json({ data: requestMessage.success.created });
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
        receiverUserRef: receiverUserId,
      })
        .populate("senderUserRef")
        .populate("bookingRef");
      res.json({
        success: {
          data: requestReceiver,
        },
      });
    } catch (error) {
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
        senderUserRef: senderUserId,
      })
        .populate("receiverUserRef")
        .populate("bookingRef");
      res.json({
        success: {
          data: requestSender,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  // public async
}
export default RequestController;
