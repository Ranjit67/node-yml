import { Router } from "express";
import { UserController, EmailTokenController } from "../controllers";

class AuthRoutes {
  public router: Router;
  public path = "/api/v1/auth";
  private userController = new UserController();
  private emailTokenController = new EmailTokenController();
  constructor() {
    this.router = Router();
    this.routes();
  }
  private routes() {
    this.router.post("/register", this.userController.create);

    this.router.post("/login", this.userController.signIn);

    this.router.put(
      "/set-password/:stringData",
      this.userController.setPassword
    );
    this.router.post("/send-reset-link", this.emailTokenController.emailVerify); //send reset link
  }
}

export default AuthRoutes;
