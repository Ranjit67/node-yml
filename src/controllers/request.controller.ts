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
      const { receiverUserId } = req.body;
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
}
export default RequestController;
