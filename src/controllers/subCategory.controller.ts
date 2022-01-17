import { Request, Response, NextFunction } from "express";
import { BadRequest, InternalServerError, NotAcceptable } from "http-errors";
import { subCategoryMessage } from "../resultMessage";
import { SubCategorySchema, CategorySchema } from "../models";
import { AwsS3Services } from "../services";

class subCategoryController {
  public async create(req: any, res: Response, next: NextFunction) {
    try {
      const { subCategory, categoryId } = req.body;
      const iconPicture = req?.files?.icon;

      if (!subCategory || !categoryId || !iconPicture)
        throw new BadRequest(subCategoryMessage.error.allField);
      const findCategory = await CategorySchema.findById(categoryId);
      if (findCategory?.genresRefs?.length)
        throw new NotAcceptable(subCategoryMessage.error.haveGenresInCategory);
      // icon upload
      const awsS3 = new AwsS3Services();
      const iconImage = await awsS3.upload(iconPicture);
      if (!iconImage)
        throw new InternalServerError(
          subCategoryMessage.error.iconImageUploadFail
        );
      const subCategorySave: any = await SubCategorySchema.create({
        title: subCategory,
        parentId: categoryId,
        iconUrl: iconImage?.Location,
        iconFile: iconImage?.key,
      });
      if (!subCategorySave)
        throw new InternalServerError(subCategoryMessage.error.notCreated);
      const updateInCategory = await CategorySchema.findOneAndUpdate(
        { _id: categoryId },
        {
          $push: {
            subCategoryRefs: subCategorySave?._id,
          },
        }
      );
      if (!updateInCategory)
        throw new InternalServerError(
          subCategoryMessage.error.subCategoryNotLinked
        );
      res.json({ data: subCategoryMessage.success.created });
    } catch (error) {
      next(error);
    }
  }
  public async categoryUnderSubCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { categoryId } = req.params;
      if (!categoryId) throw new BadRequest(subCategoryMessage.error.allField);
      const findSubCategories = await SubCategorySchema.find({
        parentId: categoryId,
      });
      res.json({ data: findSubCategories });
    } catch (error) {
      next(error);
    }
  }
  public async update(req: any, res: Response, next: NextFunction) {
    try {
      const { subcategoryId, newSubCategoryName } = req.body;
      if (!subcategoryId)
        throw new BadRequest(subCategoryMessage.error.allField);
      const iconPicture = req?.files?.icon;
      const findSubCategory: any = await SubCategorySchema.findById(
        subcategoryId
      );
      if (iconPicture) {
        const awsS3 = new AwsS3Services();
        const deletePreviousIcon = await awsS3.delete(
          findSubCategory?.iconFile
        );
        if (!deletePreviousIcon)
          throw new InternalServerError(
            subCategoryMessage.error.iconImageDeleteFail
          );
        const iconImage = await awsS3.upload(iconPicture);

        const updateSubCategory = await SubCategorySchema.findByIdAndUpdate(
          subcategoryId,
          {
            title: newSubCategoryName ?? findSubCategory?.title,
            iconUrl: iconImage?.Location,
            iconFile: iconImage?.key,
          },
          { new: true }
        );

        if (!updateSubCategory)
          throw new NotAcceptable(subCategoryMessage.error.notUpdated);
        return res.json({ data: subCategoryMessage.success.updated });
      } else {
        const updateSubCategory = await SubCategorySchema.findByIdAndUpdate(
          subcategoryId,
          { title: newSubCategoryName ?? findSubCategory?.title },
          { new: true }
        );
        if (!updateSubCategory)
          throw new NotAcceptable(subCategoryMessage.error.notUpdated);
        res.json({ data: subCategoryMessage.success.updated });
      }
    } catch (error) {
      next(error);
    }
  }
}

export default subCategoryController;
