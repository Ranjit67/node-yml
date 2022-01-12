import { Router } from "express";
import { UserController, EmailTokenController } from "../controllers";
/**
 * @swagger
 * tags:
 *  name: User
 * description: User management
 * /api/v1/auth/login:
 *  post:
 *   summary: login as a user
 *   tags: [auth]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               default: sahooranjit519@gmail.com
 *             password:
 *               type: string
 *               default: 1234567
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
 * /api/v1/auth/register:
 *  post:
 *   summary: Register new User
 *   tags: [auth]
 *   requestBody:
 *     description: You have to send request
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
 * /api/v1/auth/set-password/{stringData}:
 *  put:
 *   summary: Forget password and change password
 *   tags: [auth]
 *   requestBody:
 *     description:  You have to write stringData (in url) for change password "changePassword" and  for forget password "forgetPassword" the password set link will be send to email
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               required: true
 *               default: validEmail@gmail.com
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
 * /api/v1/auth/send-reset-link:
 *  post:
 *   summary: Password set link
 *   tags: [auth]
 *   requestBody:
 *     description: In forget password and change password and first time set password in register we have to send  password and tokens(from email) in body (Do not try in default token).
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             password:
 *               type: string
 *               required: true
 *               default: 1234567
 *             token:
 *               type: string
 *               required: true
 *               default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiWW91ciB0cnVzdC4iLCJpc3MiOiJza3ktcmlzZS5jb20iLCJpYXQiOjE2NDE5MDM2MjAsImF1ZCI6WyI2MWRkNzYwNDQxODY4YTM0NDQzYzVmMDgiXX0.g7JAPm3N8r5l_WzIQaWXRwh5ZIQTffYj_XgkZ_foVis
 *   responses:
 *      default:
 *        description: default response
 *
 */
class AuthRoutes {
  public router: Router;
  public path = "/auth";
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
