import { Request, Response, NextFunction } from "express";
import { BadRequest, InternalServerError, NotAcceptable } from "http-errors";
import { genresMessage } from "../resultMessage";
import { GenresSchema, SubCategorySchema } from "../models";
import { AwsS3Services } from "../services";
class GenresController {
  public async create(req: any, res: Response, next: NextFunction) {
    try {
      const { genresName, subCategoryId } = req.body;
      const iconPicture = req?.files?.icon;
      if (!genresName || !subCategoryId || !iconPicture)
        throw new BadRequest(genresMessage.error.allField);
      // icon upload
      const awsS3 = new AwsS3Services();
      const iconImage = await awsS3.upload(iconPicture);
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
            genresRefs: saveGenres?._id,
          },
        }
      );
      if (!updateInSubCategory)
        throw new NotAcceptable(genresMessage.error.genresNotLinked);
      res.json({ data: genresMessage.success.created });
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

      res.json({ data: findGenresUnder });
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
        const deletePreviousIcon = await awsS3.delete(findGenres?.iconFile);
        if (!deletePreviousIcon)
          throw new InternalServerError(
            genresMessage.error.iconImageDeleteFail
          );
        const iconImage = await awsS3.upload(iconPicture);
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
        return res.json({ data: genresMessage.success.updated });
      } else {
        const updateGenres = await GenresSchema.findByIdAndUpdate(genresId, {
          title: genresNewName ?? findGenres?.title,
        });
        if (!updateGenres)
          throw new NotAcceptable(genresMessage.error.notUpdated);

        return res.json({ data: genresMessage.success.updated });
      }
    } catch (error) {
      next(error);
    }
  }
  // public async delete(req: any, res: Response, next: NextFunction) {}
}
export default GenresController;
