import { Router } from "express";
import { UserController } from "../controllers";
import { ProtectedMiddleware } from "../middleware";

/**
 * @swagger
 * tags:
 *  name: User
 * description: User management
 * /api/v1/user/account-update/{id}:
 *  put:
 *   summary: Update User
 *   tags: [user]
 *   requestBody:
 *     description: User can update profile fcm token super-admin can block and unblock user.
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *               required: true
 *               default: searching yard
 *             lastName:
 *               type: string
 *               required: true
 *               default: technology
 *             email:
 *               type: string
 *               required: true
 *               default: validEmail@gmail.com
 *             role:
 *               type: string
 *               default: artist
 *               required: true
 *             phoneNumber:
 *               type: string
 *               default: 9856373839
 *             gender:
 *               type: string
 *               default: Male
 *             location:
 *               type: string
 *               default: India
 *             yearsOfExperience:
 *               type: string
 *               default: 20
 *             languagesId:
 *               type: array
 *               default: ["61d83c467e0b66fc9a7162c8"]
 *             Dob:
 *               type: string
 *               default: "Tue Jan 11 2022 15:44:40 GMT+0530 (India Standard Time)"
 *   responses:
 *      default:
 *        description: default response
 *
 */
/**
 * @swagger
 * tags:
 *  name: User
 * description: User management
 * /api/v1/user/accounts:
 *  get:
 *   summary: Get all Users
 *   tags: [user]
 *   requestBody:
 *     description: Nothing need to pass.
 *     content:
 *       application/json:
 *   responses:
 *      default:
 *        description: default response
 *
 */
/**
 * @swagger
 * tags:
 *  name: User
 * description: User management
 * /api/v1/user//accounts/{id}:
 *  get:
 *   summary: Get Single User
 *   tags: [user]
 *   requestBody:
 *     description: Nothing need to pass.
 *     content:
 *       application/json:
 *   responses:
 *      default:
 *        description: default response
 *
 */
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
