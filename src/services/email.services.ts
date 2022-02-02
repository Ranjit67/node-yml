import nodemailer from "nodemailer";
import { email, password } from "../config";
class EmailService {
  public emailSend(emails: string, subject: string, message: string): any {
    const emailCredentials = {
      from: "noreply.skyrisecelebrity@gmail.com",
      to: emails,
      subject: subject,
      text: `${message}`,
    };
    return new Promise((resolve, reject) => {
      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: email,
          pass: password,
        },
      });
      transport
        .sendMail(emailCredentials)
        .then((info) => {
          return resolve(info);
        })
        .catch((err) => {
          return resolve(err);
        });
    });
  }
}
export default EmailService;
