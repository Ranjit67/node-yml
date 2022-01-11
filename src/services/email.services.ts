import nodemailer from "nodemailer";
import { email, password } from "../config";
class EmailService {
  public emailSend(emailCredentials: any): any {
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
          return reject(err);
        });
    });
  }
}
export default EmailService;
