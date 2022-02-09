import nodemailer from "nodemailer";
import { email, password, host } from "../config";
const template = require("../emailTempleat");
class EmailService {
  public emailSend(emails: string, subject: string, message: string): any {
    const emailCredentials = {
      from: "support@skyrisecelebrity.com",
      to: emails,
      subject: subject,
      html: template.normalMailBody(message),
    };
    return new Promise((resolve, reject) => {
      const transport = nodemailer.createTransport({
        host,
        port: 465,
        secure: true,
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
