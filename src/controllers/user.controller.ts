import { Request, Response, NextFunction } from "express";
import { BadRequest, GatewayTimeout, InternalServerError } from "http-errors";
import { UserSchema, EmailToken } from "../models";
import {
  EmailService,
  JwtService,
  AwsS3Services,
  PasswordHasServices,
} from "../services";
import EmailContent from "../emailContent";

class UserController {
  public async create(req: any, res: Response, next: NextFunction) {
    try {
      //   languagesId = is the array of languages id
      const {
        email,
        countryCode,
        phoneNumber,
        firstName,
        lastName,
        role,
        gender,
        location,
        yearsOfExperience,
        languagesId,
        Dob,
      } = req.body;
      const profilePicture = req?.files?.profilePicture;
      if (profilePicture) {
        const awsS3 = new AwsS3Services();
        const profileImage = await awsS3.upload(profilePicture);
        if (!profileImage)
          throw new InternalServerError("Profile image is not uploaded.");

        const user = new UserSchema({
          email,
          profileImageRef: profileImage.key,
          profileImageUrl: profileImage.Location,
          countryCode,
          phoneNumber,
          firstName,
          lastName,
          role,
          gender,
          location,
          yearsOfExperience,
          languages: languagesId,
          Dob,
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

        const SendEmail = await new EmailService().emailSend(
          new EmailContent().emailOnSelfVerification(userSave?.email, token)
        );
        res.json({
          data: "User is created successfully. Email send to user mail for verification.",
        });
        // have an profile picture
      } else {
        const user = new UserSchema({
          email,
          countryCode,
          phoneNumber,
          firstName,
          lastName,
          role,
          gender,
          location,
          yearsOfExperience,
          languages: languagesId,
          Dob,
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

        const SendEmail = await new EmailService().emailSend(
          new EmailContent().emailOnSelfVerification(userSave?.email, token)
        );
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
      const findAllUser = await UserSchema.find({ isDeleted: false }).select(
        "-password"
      );
      res.json({ data: findAllUser });
    } catch (error) {
      next(error);
    }
  }

  public async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const findOneUser = await UserSchema.findById(id).select("-password");
      res.json({ data: findOneUser });
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        countryCode,
        phoneNumber,
        firstName,
        lastName,
        fcmToken,
        Dob,
        status,
        gender,
        location,
        yearsOfExperience,
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
        profileImageRef: profileImage?.key || findUser.profileImageRef || "",
        profileImageUrl:
          profileImage?.Location || findUser.profileImageUrl || "",
        countryCode: countryCode || findUser.countryCode || "",
        phoneNumber: phoneNumber || findUser.phoneNumber || "",
        firstName: firstName || findUser.firstName || "",
        lastName: lastName || findUser.lastName || "",

        gender: gender || findUser?.gender || "",
        location: location || findUser?.location || "",
        yearsOfExperience:
          yearsOfExperience || findUser?.yearsOfExperience || "",
        languages: Array.isArray(languagesId)
          ? languagesId
          : findUser?.languages || [],
        // other tags credentials
        fcmToken: fcmToken || findUser.fcmToken || "",
        status: status || findUser.status || "",
        Dob: Dob || findUser.Dob || "",
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
      const token = await new JwtService().accessTokenGenerator(findUser?._id);
      if (!token) throw new InternalServerError("Token is not generated.");

      res.json({ data: token, user: findUser });
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
  //
  public async setPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { stringData } = req.params;
      const { email } = req.body;
      if (!email || !stringData)
        throw new BadRequest("All fields are required.");
      const findUser = await UserSchema.findOne({ email });
      if (!findUser) throw new BadRequest("Your email is not found.");
      const token = await new JwtService().emailTokenGenerator(findUser?._id);
      const updateEmailToken = await EmailToken.update(
        { userRef: findUser?._id },
        { emailTokenString: token },
        { multi: false }
      );

      if (updateEmailToken?.matchedCount === 0) {
        const saveEmailToken = await EmailToken.create({
          userRef: findUser?._id,
          emailTokenString: token,
        });
      }

      const emailContent =
        stringData === "changePassword"
          ? new EmailContent().emailResetPassword(email, token)
          : new EmailContent().emailForgetPassword(email, token);

      const SendEmail = await new EmailService().emailSend(emailContent);
      res.json({ data: "Check your Email." });
    } catch (error) {
      next(error);
    }
  }
}
export default UserController;
