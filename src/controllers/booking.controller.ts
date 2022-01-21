import { Response, Request, NextFunction } from "express";
import {
  BadRequest,
  InternalServerError,
  Conflict,
  NotFound,
} from "http-errors";

class BookingController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      res.json({ data: "Booking is created successfully." });
    } catch (error) {
      next(error);
    }
  }
}
export default BookingController;
