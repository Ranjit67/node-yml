import { Request, Response, NextFunction } from "express";
import { EmailToken, UserSchema } from "../models";
import {
  InternalServerError,
  NotFound,
  BadRequest,
  NotAcceptable,
} from "http-errors";
import {
  JwtService,
  NotificationServices,
  PasswordHasServices,
} from "../services";
import { UserContent } from "../emailContent";
import {
  newArtistApprovalIcon,
  newManagerApprovalIcon,
} from "../notificationIcon";
import { emailTokenMessage } from "../resultMessage";

class EmailTokenController {
  private jwtServices = new JwtService();
  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const emailTokensList = await EmailToken.find();
      res.json({
        data: emailTokensList,
      });
    } catch (error) {
      next(error);
    }
  }
  public async emailVerify(req: Request, res: Response, next: NextFunction) {
    try {
      const { token, password } = req.body;
      if (!token || !password)
        throw new BadRequest(emailTokenMessage.error.allField);
      if (password.length < 4)
        throw new NotAcceptable(emailTokenMessage.error.password);
      const data = new JwtService().emailTokenVerify(token);
      const userId = data?.aud?.[0];
      if (!userId) throw new NotFound(emailTokenMessage.error.userNotFound);
      const findUser: any = await UserSchema.findById(userId);
      const currentDate = new Date().getTime();
      const creationTimeInterval =
        currentDate - new Date(findUser.timestamp).getTime();

      if (creationTimeInterval >= 60000 * 15)
        throw new NotAcceptable(emailTokenMessage.error.emailTokenExpired);

      const hashedPassword = await new PasswordHasServices().hash(password);

      const deleteData = await EmailToken.findOneAndDelete({
        userRef: userId,
      });
      if (!deleteData) throw new NotFound(emailTokenMessage.error.tokenExpired);
      if (findUser.role === "user") {
        const updatePassword = await UserSchema.findByIdAndUpdate(userId, {
          password: hashedPassword,
          status: "active",
        });
        if (!updatePassword)
          throw new InternalServerError(
            emailTokenMessage.error.passwordNotUpdated
          );
        return res.json({
          success: { message: emailTokenMessage.success.updated },
        });
      } else {
        const updatePassword = await UserSchema.findByIdAndUpdate(userId, {
          password: hashedPassword,
          status: findUser?.password ? findUser.status : "pending",
        });
        if (!findUser?.password) {
          // notification start
          const findAdmins = await UserSchema.find({ role: "admin" }).select(
            "_id"
          );

          const userContent = new UserContent();
          const title =
            findUser.role === "artist"
              ? userContent.newArtistApproveRequestReceived().subject
              : userContent.newManagerApprove().subject;
          const description =
            findUser.role === "artist"
              ? userContent.newArtistApproveRequestReceived().text
              : userContent.newManagerApprove().text;
          const icon =
            findUser.role === "artist"
              ? newArtistApprovalIcon
              : newManagerApprovalIcon;
          for (let index of [...findAdmins.map((item) => item._id)]) {
            await new NotificationServices().notificationGenerate(
              index,
              userId,
              title,
              description,
              icon,
              {
                subject: title,
                text: description,
              },
              {
                title,
                body: description,
                sound: "default",
              }
            );
          }
          // notification end
        }

        if (!updatePassword)
          throw new InternalServerError(
            emailTokenMessage.error.passwordNotUpdated
          );
        return res.json({
          success: { message: emailTokenMessage.success.updated },
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

export default EmailTokenController;
