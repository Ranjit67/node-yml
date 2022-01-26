import { Request, Response, NextFunction } from "express";
import { BadRequest, GatewayTimeout } from "http-errors";
import { NotificationSchema } from "../models";

class NotificationController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }
}
export default NotificationController;
