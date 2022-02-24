import { Request, Response, NextFunction } from "express";
import { BadRequest, InternalServerError, NotAcceptable } from "http-errors";
import { genresMessage } from "../resultMessage";
import { GenresSchema, SubCategorySchema, UserSchema } from "../models";
import { AwsS3Services } from "../services";
class GenresController {
  private dir = "genres";
  public async create(req: any, res: Response, next: NextFunction) {
    try {
      const { genresName, subCategoryId } = req.body;
      const iconPicture = req?.files?.icon;
      if (!genresName || !subCategoryId || !iconPicture)
        throw new BadRequest(genresMessage.error.allField);
      // icon upload
      const awsS3 = new AwsS3Services();
      const iconImage = await awsS3.upload(iconPicture, "genres");
      if (!iconImage)
        throw new InternalServerError(genresMessage.error.iconImageUploadFail);
      const saveGenres = await GenresSchema.create({
        title: genresName,
        iconUrl: iconImage?.Location,
        iconFile: iconImage?.key,
        parentId: subCategoryId,
      });
      if (!saveGenres) throw new NotAcceptable(genresMessage.error.notCreated);
      const updateInSubCategory = await SubCategorySchema.findByIdAndUpdate(
        subCategoryId,
        {
          $push: {
            genres: saveGenres?._id,
          },
        }
      );
      if (!updateInSubCategory)
        throw new NotAcceptable(genresMessage.error.genresNotLinked);
      res.json({
        success: {
          message: genresMessage.success.created,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  public async genresUnderSubCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { subCategoryIds } = req.body;
      if (!subCategoryIds.length)
        throw new BadRequest(genresMessage.error.allField);
      const findGenresUnder = await GenresSchema.find({
        parentId: { $in: subCategoryIds },
      });

      res.json({
        success: {
          data: findGenresUnder,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  public async update(req: any, res: Response, next: NextFunction) {
    try {
      const { genresId, genresNewName } = req.body;
      if (!genresId) throw new BadRequest(genresMessage.error.allField);
      const iconPicture = req?.files?.icon;
      const findGenres = await GenresSchema.findById(genresId);
      if (!findGenres) throw new NotAcceptable(genresMessage.error.genresError);
      if (iconPicture) {
        const awsS3 = new AwsS3Services();
        const deletePreviousIcon = await awsS3.delete(
          findGenres?.iconFile,
          "genres"
        );
        if (!deletePreviousIcon)
          throw new InternalServerError(
            genresMessage.error.iconImageDeleteFail
          );
        const iconImage = await awsS3.upload(iconPicture, "genres");
        const updateGenres = await GenresSchema.findByIdAndUpdate(
          genresId,
          {
            title: genresNewName ?? findGenres?.title,
            iconUrl: iconImage?.Location,
            iconFile: iconImage?.key,
          },
          { new: true }
        );
        if (!updateGenres)
          throw new NotAcceptable(genresMessage.error.notUpdated);
        return res.json({
          success: {
            message: genresMessage.success.updated,
          },
        });
      } else {
        const updateGenres = await GenresSchema.findByIdAndUpdate(genresId, {
          title: genresNewName ?? findGenres?.title,
        });
        if (!updateGenres)
          throw new NotAcceptable(genresMessage.error.notUpdated);

        return res.json({
          success: {
            message: genresMessage.success.updated,
          },
        });
      }
    } catch (error) {
      next(error);
    }
  }
  async getAllGenresUnderSubCategories(
    req: any,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { subcategoriesIDs } = req.body;
      if (!Array.isArray(subcategoriesIDs))
        throw new BadRequest(genresMessage.error.allField);
      const findGenres = await GenresSchema.find({
        parentId: { $in: subcategoriesIDs },
      });
      if (!findGenres.length)
        return res.json({
          success: {
            data: [],
          },
        });
      return res.json({
        success: {
          data: findGenres,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  public async delete(req: any, res: Response, next: NextFunction) {
    try {
      const { ids } = req.body;
      if (!ids?.length) throw new BadRequest(genresMessage.error.allField);
      const findGenres = await GenresSchema.find({ _id: { $in: ids } });
      if (!findGenres?.length)
        throw new NotAcceptable(genresMessage.error.noGenresFound);
      const aws3 = new AwsS3Services();
      for (let item of findGenres) {
        const deletePreviousIcon = item?.iconFile
          ? await aws3.delete(item?.iconFile, "genres")
          : "";
      }
      const removeSubcategory = await SubCategorySchema.updateMany(
        { genres: { $in: ids } },
        { $pull: { genres: { $in: ids } } }
      );
      const removeFromUser = await UserSchema.updateMany(
        { genres: { $in: ids } },
        { $pull: { genres: { $in: ids } } }
      );
      const deleteGenres = await GenresSchema.deleteMany({ _id: { $in: ids } });
      if (!deleteGenres)
        throw new NotAcceptable(genresMessage.error.notDeleted);
      res.json({
        success: {
          message: genresMessage.success.deleted,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
export default GenresController;
