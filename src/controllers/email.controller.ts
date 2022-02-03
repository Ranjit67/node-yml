import { Request, Response, NextFunction } from "express";
import { EmailService } from "../services";
class EmailController {
  async sendEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, subject, text } = req.body;
      const SendEmail = await new EmailService().emailSend(
        email,
        subject,
        text
      );
      res.json({
        success: {
          data: SendEmail,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
export default EmailController;
