import nodemailer from "nodemailer";
import { email, password } from "../config";
// import templet from "../emailTempleat";
const templet = require("../emailTempleat");
class EmailService {
  public emailSend(emails: string, subject: string, message: string): any {
    const emailCredentials = {
      from: "noreply.skyrisecelebrity@gmail.com",
      to: emails,
      subject: subject,
      // text: `${message}`,
      html: templet.normalMailBody(message),
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
