import { Router } from "express";
import { UserController, EmailTokenController } from "../controllers";
// import { RateLimitMiddleware } from "../middleware";
import rateLimit from "express-rate-limit";
class AuthRoutes {
  public router: Router;
  public path = "/auth";
  // private rateLimit = new RateLimitMiddleware();
  private userController = new UserController();
  private emailTokenController = new EmailTokenController();
  constructor() {
    this.router = Router();
    this.routes();
  }
  private routes() {
    this.router.post("/register", this.userController.create);

    this.router.post("/login", this.userController.signIn);
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 1, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
      standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
      legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    });

    this.router.put(
      "/set-password/:stringData",
      // limiter,
      // this.rateLimit.forgerPassword,
      this.userController.setPassword
    );
    this.router.post("/send-reset-link", this.emailTokenController.emailVerify); //send reset link
  }
}

export default AuthRoutes;
