import { Request, Response, NextFunction } from "express";
import {
  BadRequest,
  GatewayTimeout,
  InternalServerError,
  NotAcceptable,
  Conflict,
} from "http-errors";
import {
  UserSchema,
  EmailToken,
  SupportSchema,
  NotificationSchema,
  RequestSchema,
  VisitorSchema,
  FavoriteSchema,
  AssignArtistSchema,
  WalletSchema,
  WalletHistorySchema,
  ReviewSchema,
  BookingSchema,
  PersonalizeVideoSchema,
  PricingSchema,
  ArtistBlockDateSchema,
  ArtistMediaSchema,
} from "../models";
import {
  EmailService,
  JwtService,
  AwsS3Services,
  PasswordHasServices,
  NotificationServices,
} from "../services";
import { UserContent } from "../emailContent";
import { userMessage } from "../resultMessage";
import {
  userApproveIcon,
  userBlockIcon,
  userUnblockIcon,
} from "../notificationIcon";

class DeleteOperation {
  async artistDelete(res: Response, userData: any) {
    // artist delete start
    const removePricing = await PricingSchema.findOneAndDelete({
      artist: userData._id,
    });
    const deleteFavorites = await FavoriteSchema.findOneAndDelete({
      artist: userData._id,
    });
    const deleteVisitor = await VisitorSchema.findOneAndDelete({
      artist: userData._id,
    });
    const removeAssignArtist = await AssignArtistSchema.updateMany(
      { "artists.artist": userData._id },
      {
        $pull: {
          artists: {
            artist: userData._id,
          },
        },
      }
    );
    const deleteReview = await ReviewSchema.deleteMany({
      artist: userData._id,
    });
    const deleteBlockData = await ArtistBlockDateSchema.findOneAndDelete({
      artist: userData._id,
    });
    const bookingUpdate = await BookingSchema.updateMany(
      { artist: userData._id },
      {
        artist: null,
        artistCopy: userData,
      }
    );
    const updatePersonalizeMessage = await PersonalizeVideoSchema.updateMany(
      { artist: userData._id },
      {
        artistCopy: userData,
        artist: null,
      }
    );
    // media delete start
    const findArtistMedia = await ArtistMediaSchema.findOne({
      artist: userData._id,
    });
    if (findArtistMedia) {
      const awsS3 = new AwsS3Services();
      if (findArtistMedia?.artistVideos?.length) {
        for (let element of findArtistMedia.artistVideos) {
          await awsS3.delete(element.videoFile);
        }
      }
      if (findArtistMedia?.artistPhotos?.length) {
        for (let element of findArtistMedia.artistPhotos) {
          await awsS3.delete(element.imageFile);
        }
      }
      const deleteArtistMedia = await ArtistMediaSchema.findOneAndDelete({
        artist: userData._id,
      });
    }
    // media delete end
    const deleteUser = await UserSchema.findByIdAndDelete(userData._id);
    if (!deleteUser) throw new NotAcceptable(userMessage.error.notDelete);
    // artist delete end
    return res.json({ success: { message: userMessage.success.artistDelete } });
  }
  async userDelete(res: Response, userData: any) {
    // user delete
    const deleteWallet = await WalletSchema.findOneAndDelete({
      user: userData._id,
    });
    const deleteWalletHistory = await WalletHistorySchema.findOneAndDelete({
      user: userData._id,
    });
    const deleteReviews = await ReviewSchema.deleteMany({ user: userData._id });
    const removeFromFavorites = await FavoriteSchema.updateMany(
      { "favorites.user": userData._id },
      {
        $pull: {
          favorites: {
            user: userData._id,
          },
        },
      }
    );
    const updateBooking = await BookingSchema.updateMany(
      {
        user: userData._id,
      },
      {
        user: null,
        userCopy: userData,
      }
    );
    const updatePersonalizeVideo = await PersonalizeVideoSchema.updateMany(
      {
        user: userData._id,
      },
      {
        userCopy: userData,
        user: null,
      }
    );
    const deleteUser = await UserSchema.findByIdAndDelete(userData._id);
    if (!deleteUser) throw new NotAcceptable(userMessage.error.notDelete);
    // USER DELETE end
    return res.json({ success: { message: userMessage.success.userDelete } });
  }

  async managerDelete(res: Response, userData: any) {
    const removeFromFavorites = await FavoriteSchema.updateMany(
      { "favorites.user": userData._id },
      {
        $pull: {
          favorites: {
            user: userData._id,
          },
        },
      }
    );
    const removeAssignArtist = await AssignArtistSchema.findOneAndDelete({
      manager: userData._id,
    });
    const deleteUser = await UserSchema.findByIdAndDelete(userData._id);
    if (!deleteUser) throw new NotAcceptable(userMessage.error.notDelete);
    return res.json({
      success: { message: userMessage.success.managerDelete },
    });
  }
}
class UserController extends DeleteOperation {
  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const findUserData = await UserSchema.findById(id);
      if (!findUserData)
        throw new NotAcceptable(userMessage.error.userNotFound);
      const deleteSupport = await SupportSchema.deleteMany({
        user: findUserData._id,
      });
      const deleteNotification = await NotificationSchema.deleteMany({
        user: findUserData._id,
      });
      const notificationUpdate = await NotificationSchema.updateMany(
        {
          "notification.receiveFrom": findUserData._id,
        },
        {
          $pull: {
            notification: {
              receiveFrom: { $eq: findUserData._id },
            },
          },
        }
      );
      const removeFromRequest = await RequestSchema.deleteMany({
        $or: [
          { senderUser: findUserData._id },
          { receiverUser: findUserData._id },
        ],
      });
      if (findUserData.role !== "artist") {
        const removeFromVisitors = await VisitorSchema.updateMany(
          { "users.user": findUserData._id },
          {
            $pull: {
              users: {
                user: findUserData._id,
              },
            },
          }
        );
      }
      if (findUserData.role === "artist") {
        return super.artistDelete(res, findUserData);
      } else if (findUserData.role === "manager") {
        return super.managerDelete(res, findUserData);
      } else if (findUserData.role === "user") {
        return super.userDelete(res, findUserData);
      }
    } catch (error) {
      next(error);
    }
  }

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
        lat,
        lng,
        address,
        country,
        yearsOfExperience,
        languagesId,
        Dob,
        baseUrl,
      } = req.body;
      const check = await UserSchema.findOne({ email });
      if (
        ["admin", "user", "artist", "manager"].indexOf(role.toLowerCase()) ===
        -1
      )
        throw new BadRequest(userMessage.error.invalidRole);
      if (check) {
        const currentTime = new Date().getTime();
        const checkTime = currentTime - new Date(check?.timestamp).getTime();

        if (checkTime <= 60000 * 15)
          throw new NotAcceptable(userMessage.error.currentlyRegistered);
      }

      const updateOneEmail = await UserSchema.updateOne(
        { email, password: { $exists: false } },
        {
          countryCode,
          phoneNumber,
          firstName,
          lastName,
          role: role.toLowerCase(),
          gender,
          location: {
            lat: +lat,
            lng: +lng,
            address,
            country,
          },
          yearsOfExperience,
          languages: languagesId,
          Dob,
          timestamp: new Date(),
        }
      );
      if (updateOneEmail.matchedCount === 1) {
        const token = await new JwtService().emailTokenGenerator(check?._id);
        const emailTokenUpdate = await EmailToken.updateOne(
          { userRef: check?._id },
          { emailTokenString: token }
        );

        if (!emailTokenUpdate)
          throw new InternalServerError(userMessage.error.emailToken);
        const emailContent = new UserContent().emailOnSelfVerification(
          baseUrl,
          token
        );

        const SendEmail = await new EmailService().LinkEmailSend(
          email,
          emailContent.subject,
          emailContent.text,
          emailContent.link
        );
        return res.json({
          success: {
            message: userMessage.success.mailVerification,
          },
        });
      }

      if (check) throw new Conflict(userMessage.error.duplicateEmail);

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
          role: role.toLowerCase(),
          gender,
          location: {
            lat: +lat,
            lng: +lng,
            address,
            country,
          },
          yearsOfExperience,
          languages: languagesId,
          Dob,
          timestamp: new Date(),
        });
        const userSave = await user.save();
        if (!userSave)
          throw new InternalServerError(userMessage.error.notCreated);

        const token = await new JwtService().emailTokenGenerator(userSave?._id);
        const saveEmailToken = await EmailToken.create({
          userRef: userSave?._id,
          emailTokenString: token,
          timestamp: new Date(),
        });
        if (!saveEmailToken)
          throw new InternalServerError(userMessage.error.emailToken);
        const emailContent = new UserContent().emailOnSelfVerification(
          baseUrl,
          token
        );

        const SendEmail = await new EmailService().LinkEmailSend(
          userSave?.email,
          emailContent.subject,
          emailContent.text,
          emailContent.link
        );
        res.json({
          success: {
            message: userMessage.success.mailVerification,

            data: "",
          },
        });
        // have an profile picture
      } else {
        const user = new UserSchema({
          email,
          countryCode,
          phoneNumber,
          firstName,
          lastName,
          role: role.toLowerCase(),
          gender,
          location: {
            lat: +lat,
            lng: +lng,
            address,
            country,
          },
          yearsOfExperience,
          languages: languagesId,
          Dob,
          timestamp: new Date(),
        });
        const userSave = await user.save();
        if (!userSave)
          throw new InternalServerError(userMessage.error.notCreated);

        const token = await new JwtService().emailTokenGenerator(userSave?._id);
        const saveEmailToken = await EmailToken.create({
          userRef: userSave?._id,
          emailTokenString: token,
          timestamp: new Date(),
        });
        if (!saveEmailToken)
          throw new InternalServerError(userMessage.error.emailToken);
        const emailContent = new UserContent().emailOnSelfVerification(
          baseUrl,
          token
        );
        const SendEmail = await new EmailService().LinkEmailSend(
          userSave?.email,
          emailContent.subject,
          emailContent.text,
          emailContent.link
        );
        res.json({
          success: {
            message: userMessage.success.mailVerification,
          },
        });
      }
    } catch (error) {
      next(error);
    }
  }

  public async getAll(req: any, res: Response, next: NextFunction) {
    try {
      const findAllUser = await UserSchema.find({ isDeleted: false })
        .populate("category")
        .populate("subcategories")
        .populate("genres")
        .populate("languages")
        .populate("events")
        .populate("services")
        .populate("pricing")
        .populate({
          path: "artistMedia",
          select: "artistVideos artistPhotos youtubeVideos",
        })
        .select("-password -__v -fcmToken -profileImageRef");
      res.json({
        success: {
          data: findAllUser,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  public async activeArtist(req: any, res: Response, next: NextFunction) {
    try {
      const findAllUser = await UserSchema.find({ isDeleted: false })
        .populate("category")
        .populate("subcategories")
        .populate("genres")
        .populate("languages")
        .populate("events")
        .populate("services")
        .populate({
          path: "artistMedia",
          select: "artistVideos artistPhotos youtubeVideos",
        })
        .select("-password -__v -fcmToken -profileImageRef");
      res.json({
        success: {
          data: findAllUser,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  public async getSelf(req: any, res: Response, next: NextFunction) {
    try {
      const { aud } = req.payload;
      const findOneUser = await UserSchema.findById(aud[0])
        .populate({
          path: "subcategories",
          model: "SubCategory",
        })
        .populate("category")
        .populate("genres")
        .select("-password")
        .select("-__v");

      res.json({ success: { data: findOneUser } });
    } catch (error) {
      next(error);
    }
  }

  public async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const findOneUser = await UserSchema.findById(id)
        .populate({
          path: "subcategories",
          model: "SubCategory",
        })
        .populate("category")
        .populate("genres")
        .populate("languages")
        .populate("events")
        .populate("services")
        .select("-password -__v");

      res.json({
        success: {
          data: findOneUser,
        },
      });
    } catch (error: any) {
      if (error.path === "_id") {
        error.message = userMessage.error.invalidUserId;
      }
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
        lat,
        lng,
        address,
        country,
        yearsOfExperience,
        languages,
        inTopSearches,
        inTopTrending,
        events,
        services,
        bio,
        artistMedia,
      } = req.body;
      const { id } = req.params;

      if (!id) throw new BadRequest(userMessage.error.allFieldsRequired);
      const findUser = await UserSchema.findById(id);
      if (!findUser) throw new BadRequest(userMessage.error.invalidUserId);
      const profilePicture = req?.files?.profilePicture;
      let profileImage;
      if (profilePicture) {
        const awsS3 = new AwsS3Services();
        profileImage = await awsS3.upload(profilePicture);
        if (!profileImage)
          throw new InternalServerError(userMessage.error.profileImage);
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
        location: {
          lat: lat ?? findUser?.location?.lat,
          lng: lng ?? findUser?.location?.lng,
          address: address ?? findUser?.location?.address,
          country: country ?? findUser?.location?.country,
        },
        yearsOfExperience:
          yearsOfExperience || findUser?.yearsOfExperience || "",
        languages: Array.isArray(languages)
          ? languages
          : findUser?.languages || [],
        events: Array.isArray(events) ? events : findUser?.events || [],
        services: Array.isArray(services) ? services : findUser?.services || [],
        // other tags credentials
        fcmToken: fcmToken || findUser.fcmToken || "",
        status: status || findUser.status || "",
        Dob: Dob || findUser.Dob || "",
        inTopSearches: inTopSearches ?? findUser.inTopSearches,
        inTopTrending: inTopTrending ?? findUser.inTopTrending,
        bio: bio ?? findUser.bio,
        artistMedia: artistMedia ?? findUser.artistMedia,
      });
      if (!updateUser) throw new GatewayTimeout(userMessage.error.notUpdate);
      res.json({
        success: {
          message: userMessage.success.update,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  // signIn process
  public async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const findUser = await UserSchema.findOne({ email, isDeleted: false });
      if (!findUser) throw new BadRequest(userMessage.error.userNotFound);
      if (!findUser.password)
        throw new Conflict(userMessage.error.passwordNotSet);
      const isMatch = await new PasswordHasServices().compare(
        password,
        findUser.password
      );
      if (!isMatch) throw new BadRequest(userMessage.error.wrongPassword);
      const token = await new JwtService().accessTokenGenerator(findUser?._id);
      if (!token)
        throw new InternalServerError(userMessage.error.tokenGenerate);

      res.json({
        success: {
          data: token,
          user: findUser,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  // super admin block user
  public async blockUnblockUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.body;
      const findUser: any = await UserSchema.findById(id);
      if (findUser.role === "artist" && findUser.status === "pending") {
        const createArtistBlockDate = await ArtistBlockDateSchema.create({
          artist: findUser._id,
        });
      }
      const updateUser = await UserSchema.updateOne(
        { _id: id },
        {
          status:
            findUser.status === "active"
              ? "blocked"
              : findUser.status === "blocked"
              ? "active"
              : findUser.status === "pending"
              ? "active"
              : findUser.status,
        }
      );
      if (updateUser.modifiedCount === 0)
        throw new NotAcceptable(userMessage.error.notUpdatedBlockOrUnblock);
      // if (findUser.status === "active" || findUser.status === "blocked") {
      // notification start
      const userContent = new UserContent();
      const findAdmin: any = await UserSchema.findOne({ role: "admin" });
      const title =
        findUser.status === "active"
          ? userContent.superAdminBlockUser(findUser).subject
          : findUser.status === "blocked"
          ? userContent.superAdminUnblockUser(findUser).subject
          : userContent.afterApproveRequest(findUser).subject;
      const description =
        findUser.status === "active"
          ? userContent.superAdminBlockUser(findUser).text
          : findUser.status === "blocked"
          ? userContent.superAdminUnblockUser(findUser).text
          : userContent.afterApproveRequest(findUser).text;
      const icon =
        findUser.status === "active"
          ? userBlockIcon
          : findUser.status === "blocked"
          ? userUnblockIcon
          : userApproveIcon;
      await new NotificationServices().notificationGenerate(
        id,
        findAdmin._id.toString(),
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

      // notification end
      // }

      return res.json({
        success: {
          message:
            findUser.status === "active"
              ? userMessage.success.userBlocked
              : findUser.status === "blocked"
              ? userMessage.success.userUnblocked
              : userMessage.success.userPendingToActive,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  //
  public async setPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { stringData } = req.params;
      const { email, newPassword, oldPassword, baseUrl } = req.body;
      if (!email || !stringData)
        throw new BadRequest(userMessage.error.allFieldsRequired);
      const findUser = await UserSchema.findOne({ email });
      if (!findUser) throw new BadRequest(userMessage.error.userNotFound);
      if (stringData === "changePassword") {
        if (!email || !newPassword || !oldPassword)
          throw new BadRequest(userMessage.error.allFieldsRequired);
        const isMatch = await new PasswordHasServices().compare(
          oldPassword,
          findUser.password
        );
        if (!isMatch) throw new BadRequest(userMessage.error.oldPassword);
        const hashedPassword = await new PasswordHasServices().hash(
          newPassword
        );

        const updateUser = await UserSchema.findOneAndUpdate(
          { email },
          { password: hashedPassword }
        );
        if (!updateUser)
          throw new GatewayTimeout(userMessage.error.passwordNotMatch);
        res.json({
          success: {
            message: userMessage.success.passwordSet,
          },
        });
      } else {
        if (!findUser?.password)
          throw new NotAcceptable(userMessage.error.forgetPasswordNot);
        const findUserToken: any = await EmailToken.findOne({
          userRef: findUser?._id,
        });
        if (findUserToken) {
          const currentTime = new Date().getTime();
          const timeInterval =
            currentTime - new Date(findUserToken?.timestamp).getTime();
          if (timeInterval <= 60000 * 15)
            throw new NotAcceptable(
              userMessage.error.forgetPasswordLinkTimeHave
            );
        }
        const token = await new JwtService().emailTokenGenerator(findUser?._id);
        const updateEmailToken = await EmailToken.updateOne(
          { userRef: findUser?._id },
          { emailTokenString: token, timestamp: new Date() },
          { multi: false }
        );

        if (updateEmailToken?.matchedCount === 0) {
          const saveEmailToken = await EmailToken.create({
            userRef: findUser?._id,
            emailTokenString: token,
            timestamp: new Date(),
          });
        }

        const emailContent = new UserContent().emailForgetPassword(
          baseUrl,
          token
        );

        const SendEmail = await new EmailService().LinkEmailSend(
          email,
          emailContent.subject,
          emailContent.text,
          emailContent.link
        );
        res.json({
          success: {
            message: userMessage.success.forgetPasswordLinkMail,
          },
        });
      }
    } catch (error) {
      next(error);
    }
  }

  // category update in profile
  public async categoryUpdate(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, categoryId, subcategories, genres } = req.body;
      const findUser: any = await UserSchema.findById(userId);
      const updateProfile = await UserSchema.findByIdAndUpdate(userId, {
        category: categoryId ? categoryId : findUser.category,
        subcategories: subcategories.length
          ? subcategories
          : findUser.subcategories,
        genres: genres.length ? genres : findUser.genres,
      });
      if (!updateProfile) throw new GatewayTimeout(userMessage.error.notUpdate);
      res.json({
        success: {
          message: userMessage.success.update,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async topSearchArtist(req: Request, res: Response, next: NextFunction) {
    try {
      const { limit, country } = req.params;

      const findVisitors: any = await VisitorSchema.find({}).populate({
        path: "artist",
        select: "-password  -fcmToken -__v",
        match: { "location.country": country },
        populate: [
          {
            path: "category",
            model: "Category",
          },
          {
            path: "subcategories",
            model: "SubCategory",
          },
          {
            path: "genres",
            model: "Genres",
          },
          {
            path: "languages",
            model: "Language",
          },
          {
            path: "events",
            model: "Event",
          },
          {
            path: "services",
            model: "Service",
          },
        ],
      });
      if (!findVisitors.length)
        return res.json({
          success: {
            data: [],
          },
        });
      const sortData = [
        ...findVisitors.filter((element: any) => element?.artist !== null),
      ].sort((a: any, b: any): any => a.users.length - b.users.length);
      const ids = sortData.map((item: any) => item.artist._id);
      const findArtist: any = await UserSchema.find({
        _id: { $nin: ids },
        role: "artist",
        "location.country": country,
        status: "active",
      })
        .populate("category")
        .populate("languages")
        .populate("subcategories")
        .populate("genres")
        .select("-password  -fcmToken -__v");
      const dataArray = [
        ...[...sortData].map((item) => item?.artist)?.reverse(),
        ...findArtist,
      ]?.slice(0, +limit);
      res.json({
        success: {
          data: dataArray,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async topSearchArtist2(req: Request, res: Response, next: NextFunction) {
    try {
      const { limit } = req.params;

      const findVisitors: any = await VisitorSchema.find({}).populate({
        path: "artist",
        select: "-password  -fcmToken -__v",
        populate: [
          {
            path: "category",
            model: "Category",
          },
          {
            path: "subcategories",
            model: "SubCategory",
          },
          {
            path: "genres",
            model: "Genres",
          },
          {
            path: "languages",
            model: "Language",
          },
          {
            path: "events",
            model: "Event",
          },
        ],
      });
      if (!findVisitors.length)
        return res.json({
          success: {
            data: [],
          },
        });
      const sortData = [
        ...findVisitors.filter((element: any) => element?.artist !== null),
      ].sort((a: any, b: any): any => a.users.length - b.users.length);
      const ids = sortData.map((item: any) => item.artist._id);
      const findArtist: any = await UserSchema.find({
        _id: { $nin: ids },
        role: "artist",
        // "location.country": country,
        status: "active",
      })
        .populate("category")
        .populate("languages")
        .populate("subcategories")
        .populate("genres")
        .select("-password  -fcmToken -__v");
      const dataArray = [
        ...[...sortData].map((item) => item?.artist)?.reverse(),
        ...findArtist,
      ]?.slice(0, +limit);
      res.json({
        success: {
          data: dataArray,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  // fake data update
  public async fakeDataUpdate(req: Request, res: Response, next: NextFunction) {
    try {
      const updateArtistLocation = await UserSchema.find({
        role: "artist",
        status: "active",
      });
      const getIds = updateArtistLocation.map((item: any) => ({
        artist: item._id,
      }));
      const createMany = await ArtistBlockDateSchema.insertMany(getIds);

      res.json({ data: "success" });
    } catch (error) {
      next(error);
    }
  }
}
export default UserController;
