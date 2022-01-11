import { Request, Response, NextFunction } from "express";
import { EmailToken, UserSchema, userModel } from "../models";
import { InternalServerError, NotFound } from "http-errors";
import { JwtService, PasswordHasServices } from "../services";
import { userRole } from "../types";
interface userData extends userModel {
  role: userRole;
}
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
      if (!userId) throw new NotFound("User is not found.");
      const hashedPassword = await new PasswordHasServices().hash(password);
      const findUser: any = await UserSchema.findById(userId);
      await EmailToken.findOneAndDelete({
        userRef: userId,
      });
      if (findUser.role === "user") {
        const updatePassword = await UserSchema.findByIdAndUpdate(userId, {
          password: hashedPassword,
          status: "active",
        });
        if (!updatePassword)
          throw new InternalServerError("Password is not updated.");
        return res.json({ data: "Password is updated successfully." });
      } else {
        const updatePassword = await UserSchema.findByIdAndUpdate(userId, {
          password: hashedPassword,
          status: "pending",
        });
        if (!updatePassword)
          throw new InternalServerError("Password is not updated.");
        return res.json({
          data: "Password is updated successfully. Wait for admin approval.",
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

export default EmailTokenController;
