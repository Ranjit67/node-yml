import { Router } from "express";
import { UserController } from "../controllers";
import { ProtectedMiddleware } from "../middleware";

class UserRoutes {
  public router: Router;
  public path = "/user";
  private userController = new UserController();

  constructor() {
    this.router = Router();
    this.routes();
  }
  private routes() {
    this.router.get("/accounts", this.userController.getAll);
    this.router.get(
      "/accounts-self",
      new ProtectedMiddleware().protected,
      this.userController.getSelf
    );
    this.router.get(
      "/accounts/:id",
      // new ProtectedMiddleware().protected,
      this.userController.getOne
    );

    this.router.put("/account-update/:id", this.userController.update);
    this.router.post("/account-status", this.userController.blockUnblockUser);
    //
    this.router.patch(
      "/account-update-category",
      this.userController.categoryUpdate
    );
    this.router.get(
      "/top-search/artists/:limit/:country",
      this.userController.topSearchArtist
    );
    this.router.get(
      "/top-search/artists/:limit",
      this.userController.topSearchArtist2
    );

    //

    this.router.delete("/accounts-delete/:id", this.userController.delete); // delete for temporary

    // fake
    this.router.get("/accounts-fake", this.userController.fakeDataUpdate);
  }
}
export default UserRoutes;
