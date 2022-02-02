import { Router } from "express";
import { EmailController } from "../controllers";

class EmailTestRoute {
  public router: Router;
  public path = "/email";
  private emailTokenController = new EmailController();
  constructor() {
    this.router = Router();
    this.routes();
  }
  public routes() {
    this.router.post("/email", this.emailTokenController.sendEmail);
    // this.router.post("/send-reset-link", this.emailTokenController.emailVerify);
  }
}
export default EmailTestRoute;
