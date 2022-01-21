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
}
export default RequestController;
