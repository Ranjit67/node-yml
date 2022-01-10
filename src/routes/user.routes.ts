import { Router } from "express";
import { UserController } from "../controllers";
import { ProtectedMiddleware } from "../middleware";
class UserRoutes {
  public router: Router;
  public path = "/api/v1/users";
  private userController = new UserController();
  // private privateRoutes = new ProtectedMiddleware();
  constructor() {
    this.router = Router();
    this.routes();
  }
  private routes() {
    this.router.post("/create", this.userController.create);
    this.router.get(
      "/list-of-users",
      // new ProtectedMiddleware().protected,
      this.userController.getAll
    );
    this.router.get(
      "/list-of-users/:id",
      new ProtectedMiddleware().protected,
      this.userController.getOne
    );
    //
    this.router.post("/signIn", this.userController.signIn);
    this.router.put(
      "/update/:id",
      // new ProtectedMiddleware().protected,
      this.userController.update
    );
    this.router.delete("/delete/:id", this.userController.delete); // delete for temporary
  }
}
export default UserRoutes;
