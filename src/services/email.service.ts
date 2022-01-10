import nodemailer from "nodemailer";
import { email, password } from "../config";
class EmailService {
  public emailSend(emailCredentials: any): any {
    return new Promise((resolve, reject) => {
      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          //   user: email,
          //   pass: password,
          user: "noreply.skyrisecelebrity@gmail.com",
          pass: "jbkxjjqjoavslcaf",
        },
      });
      transport
        .sendMail(emailCredentials)
        .then((info) => {
          console.log("success", info);
          return resolve(info);
        })
        .catch((err) => {
          console.log("fail");
          return reject(err);
        });
    });
  }
}
export default EmailService;
