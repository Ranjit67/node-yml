import { Request, Response, NextFunction } from "express";
import { BadRequest, GatewayTimeout, InternalServerError } from "http-errors";
import { UserSchema, EmailToken } from "../models";
import {
  EmailService,
  JwtService,
  AwsS3Services,
  PasswordHasServices,
} from "../services";

class UserController {
  //   private jwtServices = new JwtService();
  public async create(req: any, res: Response, next: NextFunction) {
    try {
      //   languagesId = is the array of languages id
      const {
        email,
        countryCode,
        mobileNumber,
        displayName,
        role,
        gender,
        countryName,
        yearOfExperience,
        languagesId,
      } = req.body;
      const profilePicture = req?.files?.profilePicture;
      if (profilePicture) {
        const awsS3 = new AwsS3Services();
        const profileImage = await awsS3.upload(profilePicture);
        if (!profileImage)
          throw new InternalServerError("Profile image is not uploaded.");

        const user = new UserSchema({
          email,
          profileImageFileName: profileImage.key,
          profileImageUrl: profileImage.Location,
          countryCode,
          mobileNumber,
          displayName,
          role,
          gender,
          countryName,
          yearOfExperience,
          languageArray: languagesId,
        });
        const userSave = await user.save();
        if (!userSave) throw new InternalServerError("User is not created.");
        const token = await new JwtService().emailTokenGenerator(userSave?._id);
        const saveEmailToken = await EmailToken.create({
          userRef: userSave?._id,
          emailTokenString: token,
        });
        if (!saveEmailToken)
          throw new InternalServerError("Email token is not created.");
        const emailCredentials = {
          from: "noreply.skyrisecelebrity@gmail.com",
          to: userSave?.email,
          subject: `Forget password.`,
          text: `Your reset password url is ${token}/forgetPassword `,
        };

        const SendEmail = await new EmailService().emailSend(emailCredentials);
        res.json({
          data: "User is created successfully. Email send to user mail for verification.",
        });
        // have an profile picture
      } else {
        const user = new UserSchema({
          email,

          countryCode,
          mobileNumber,
          displayName,
          role,
          gender,
          countryName,
          yearOfExperience,
          languageArray: languagesId,
        });
        const userSave = await user.save();
        if (!userSave) throw new InternalServerError("User is not created.");

        const token = await new JwtService().emailTokenGenerator(userSave?._id);
        const saveEmailToken = await EmailToken.create({
          userRef: userSave?._id,
          emailTokenString: token,
        });
        if (!saveEmailToken)
          throw new InternalServerError("Email token is not created.");
        const emailCredentials = {
          from: "noreply.skyrisecelebrity@gmail.com",
          to: userSave?.email,
          subject: `Forget password.`,
          text: `Your reset password url is ${token}/forgetPassword `,
        };

        const SendEmail = await new EmailService().emailSend(emailCredentials);
        res.json({
          data: "User is created successfully. Email send to user mail for verification.",
        });
      }
    } catch (error) {
      next(error);
    }
  }

  public async getAll(req: any, res: Response, next: NextFunction) {
    try {
      const { aud } = req.payload;
      console.log(aud);
      const findAllUser = await UserSchema.find({ isDeleted: false });
      res.json({ data: findAllUser });
    } catch (error) {
      next(error);
    }
  }

  public async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const findOneUser = await UserSchema.findById(id);
      res.json({ data: findOneUser });
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        countryCode,
        mobileNumber,
        displayName,

        gender,
        countryName,
        yearOfExperience,
        languagesId,
      } = req.body;
      const { id } = req.params;

      if (!id) throw new BadRequest("All fields are required.");
      const findUser = await UserSchema.findById(id);
      if (!findUser) throw new BadRequest("User is not found.");
      const profilePicture = req?.files?.profilePicture;
      let profileImage;
      if (profilePicture) {
        const awsS3 = new AwsS3Services();
        profileImage = await awsS3.upload(profilePicture);
        if (!profileImage)
          throw new InternalServerError("Profile image is not uploaded.");
      }

      const updateUser = await UserSchema.findByIdAndUpdate(id, {
        profileImageFileName:
          profileImage?.key || findUser.profileImageFileName || "",
        profileImageUrl:
          profileImage?.Location || findUser.profileImageUrl || "",
        countryCode: countryCode || findUser.countryCode || "",
        mobileNumber: mobileNumber || findUser.mobileNumber || "",
        displayName: displayName || findUser.displayName || "",
        gender: gender || findUser?.gender || "",
        countryName: countryName || findUser?.countryName || "",
        yearOfExperience: yearOfExperience || findUser?.yearOfExperience || "",
        languageArray: Array.isArray(languagesId)
          ? languagesId
          : findUser?.languageArray || [],
      });
      if (!updateUser) throw new GatewayTimeout("User is not updated.");
      res.json({ data: "User is updated successfully." });
    } catch (error) {
      next(error);
    }
  }
  // signIn process
  public async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const findUser = await UserSchema.findOne({ email, isDeleted: false });
      if (!findUser) throw new BadRequest("User is not found.");
      const isMatch = await new PasswordHasServices().compare(
        password,
        findUser.password
      );
      if (!isMatch) throw new BadRequest("Password is not match.");
      if (findUser.role === "user" || findUser.role === "super-admin") {
        const token = await new JwtService().accessTokenGenerator(
          findUser?._id
        );
        if (!token) throw new InternalServerError("Token is not generated.");
        return res.json({ data: token, user: findUser });
      }
      if (findUser.isBlocked)
        throw new BadRequest("You are blocked by super admin.");
      if (!findUser?.isRequestAccepted)
        throw new BadRequest("Your request is not accepted by super admin.");
      const token = await new JwtService().accessTokenGenerator(findUser?._id);
      if (!token) throw new InternalServerError("Token is not generated.");
      return res.json({ data: token, user: findUser });
      // res.json({ data: "Log in successfully." });
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deleteUser = await UserSchema.findOneAndDelete({ email: id });
      if (!deleteUser) throw new GatewayTimeout("User is not deleted.");
      res.json({ data: "User is deleted successfully." });
    } catch (error) {
      next(error);
    }
  }
}
export default UserController;
