import { Response } from "express";
import { serviceMessage } from "../resultMessage";
class ServiceErrorHandler {
  public allAlreadyExists(res: Response) {
    return res.status(409).json({
      error: { message: serviceMessage.error.duplicateName },
    });
  }
}
export default ServiceErrorHandler;
