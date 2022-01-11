import { Router } from "express";
import { UserController, EmailTokenController } from "../controllers";
import { ProtectedMiddleware } from "../middleware";
class UserRoutes {
  public router: Router;
  public path = "/api/v1/user";
  private userController = new UserController();
  private emailTokenController = new EmailTokenController();
  // private privateRoutes = new ProtectedMiddleware();
  constructor() {
    this.router = Router();
    this.routes();
  }
  private routes() {
    // this.router.post("/register", this.userController.create);
    this.router.get(
      "/accounts",
      // new ProtectedMiddleware().protected,
      this.userController.getAll
    );
    this.router.get(
      "/accounts/:id",
      new ProtectedMiddleware().protected,
      this.userController.getOne
    );
    //
    // this.router.post("/login", this.userController.signIn);
    this.router.put(
      "/account-update/:id",
      // new ProtectedMiddleware().protected,
      this.userController.update
    );
    // this.router.put(
    //   "/set-password/:stringData",
    //   this.userController.setPassword
    // );
    // this.router.post("/send-reset-link", this.emailTokenController.emailVerify); //send reset link

    this.router.delete("/accounts-delete/:id", this.userController.delete); // delete for temporary
  }
}
export default UserRoutes;
