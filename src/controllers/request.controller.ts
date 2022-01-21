import { Request, Response, NextFunction } from "express";
import { RequestSchema } from "../models";
class RequestController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { requestType, receiverUserId, senderUserId } = req.body;

      // const findAllRequest=await RequestSchema.find({});
      res.json({ data: "Request list" });
    } catch (error) {
      next(error);
    }
  }
}
export default RequestController;
