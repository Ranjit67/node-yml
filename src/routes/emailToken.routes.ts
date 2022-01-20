import { Router } from "express";
import { EmailTokenController } from "../controllers";

class EmailTokenRoutes {
  public router: Router;
  public path = "/email-token";
  private emailTokenController = new EmailTokenController();
  constructor() {
    this.router = Router();
    this.routes();
  }
  public routes() {
    this.router.get("/list-of-email-token", this.emailTokenController.getAll);
    // this.router.post("/send-reset-link", this.emailTokenController.emailVerify);
  }
}
export default EmailTokenRoutes;
