import { Request, Response, NextFunction } from "express";
import { EmailToken, UserSchema } from "../models";
import { InternalServerError, NotFound } from "http-errors";
import { JwtService, PasswordHasServices } from "../services";

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
      const updatePassword = await UserSchema.findByIdAndUpdate(userId, {
        password: hashedPassword,
        isEmailVerify: true,
      });
      if (!updatePassword)
        throw new InternalServerError("Password is not updated.");
      await EmailToken.findOneAndDelete({
        userRef: userId,
      });
      res.json({ data: "Email is verify successfully." });
    } catch (error) {
      next(error);
    }
  }
}

export default EmailTokenController;
