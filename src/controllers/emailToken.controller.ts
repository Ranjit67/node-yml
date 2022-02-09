import { Request, Response, NextFunction } from "express";
import { EmailToken, UserSchema } from "../models";
import { InternalServerError, NotFound } from "http-errors";
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
      const data = new JwtService().emailTokenVerify(token);
      const userId = data?.aud?.[0];
      if (!userId) throw new NotFound(emailTokenMessage.error.userNotFound);
      const hashedPassword = await new PasswordHasServices().hash(password);
      const findUser: any = await UserSchema.findById(userId);

      const deleteData = await EmailToken.findOneAndDelete({
        userRef: userId,
      });
      if (!deleteData) throw new NotFound(emailTokenMessage.error.tokenExpired);
      // console.log("deleteData", deleteData);
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
          status: "pending",
        });
        // notification start
        const findAdmins = await UserSchema.find({ role: "admin" }).select(
          "_id"
        );

        const userContent = new UserContent();
        const title =
          findUser.role === "artist"
            ? userContent.newArtistApprove().subject
            : userContent.newManagerApprove().subject;
        const description =
          findUser.role === "artist"
            ? userContent.newArtistApprove().text
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
        if (!updatePassword)
          throw new InternalServerError(
            emailTokenMessage.error.passwordNotUpdated
          );
        return res.json({
          success: { message: emailTokenMessage.error.passwordNotUpdated },
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

export default EmailTokenController;
