import { Response } from "express";
import { userMessage } from "../resultMessage";
class UserErrorHandler {
  public emailAlreadyExists(res: Response) {
    return res.status(409).json({
      error: { message: userMessage.error.duplicateEmail },
    });
  }
  public phoneAlreadyExists(res: Response) {
    return res.status(409).json({
      error: { message: userMessage.error.duplicatePhone },
    });
  }
}
export default UserErrorHandler;
