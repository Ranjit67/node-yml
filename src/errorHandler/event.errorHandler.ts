import { Response } from "express";
import { eventMessage } from "../resultMessage";
class EventErrorHandler {
  public alreadyExistsName(res: Response) {
    return res.status(409).json({
      error: { message: eventMessage.error.duplicateName },
    });
  }
}
export default EventErrorHandler;
