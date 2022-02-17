import { Request, Response, NextFunction } from "express";
import { BadRequest, InternalServerError, NotAcceptable } from "http-errors";
import { subCategoryMessage } from "../resultMessage";
import {
  SubCategorySchema,
  CategorySchema,
  UserSchema,
  GenresSchema,
} from "../models";
import { AwsS3Services } from "../services";
import { isDayjs } from "dayjs";

class subCategoryController {
  public async create(req: any, res: Response, next: NextFunction) {
    try {
      const { subCategory, categoryId } = req.body;
      const iconPicture = req?.files?.icon;

      if (!subCategory || !categoryId || !iconPicture)
        throw new BadRequest(subCategoryMessage.error.allField);
      const findCategory = await CategorySchema.findById(categoryId);
      if (findCategory?.genres?.length)
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
            subcategories: subCategorySave?._id,
          },
        }
      );
      if (!updateInCategory)
        throw new InternalServerError(
          subCategoryMessage.error.subCategoryNotLinked
        );
      res.json({
        success: {
          message: subCategoryMessage.success.created,
        },
      });
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
      res.json({
        success: {
          data: findSubCategories,
        },
      });
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
        return res.json({
          success: {
            message: subCategoryMessage.success.updated,
          },
        });
      } else {
        const updateSubCategory = await SubCategorySchema.findByIdAndUpdate(
          subcategoryId,
          { title: newSubCategoryName ?? findSubCategory?.title },
          { new: true }
        );
        if (!updateSubCategory)
          throw new NotAcceptable(subCategoryMessage.error.notUpdated);
        res.json({
          success: {
            message: subCategoryMessage.success.updated,
          },
        });
      }
    } catch (error) {
      next(error);
    }
  }
  async underGenres(req: Request, res: Response, next: NextFunction) {
    try {
      const { categoriesIds } = req.body;
      if (!Array.isArray(categoriesIds))
        throw new BadRequest(subCategoryMessage.error.allField);
      // const findSubCategories = await SubCategorySchema.find({

      // })
    } catch (error) {
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: ids } = req.body;
      if (!ids) throw new BadRequest(subCategoryMessage.error.allField);
      const awsS3 = new AwsS3Services();
      const findSubCategories = await SubCategorySchema.findOne({ _id: ids });
      if (!findSubCategories)
        throw new NotAcceptable(subCategoryMessage.error.noSubCategory);
      const genresArray = findSubCategories?.genres ?? [];
      if (genresArray.length) {
        const findGenres = await GenresSchema.find({
          _id: { $in: genresArray },
        });
        for (let item of findGenres) {
          const deleteGenre = item.iconFile
            ? await awsS3.delete(item.iconFile)
            : "";
        }
        const removeSubCategoryFromCategory = await CategorySchema.updateOne(
          { subcategories: findSubCategories?._id },
          { $pull: { subcategories: findSubCategories?._id } }
        );
        const deleteGenres = await GenresSchema.deleteMany({
          _id: { $in: genresArray },
        });

        // user delete subcategory and genres
        const deleteFromUser = await UserSchema.updateMany(
          {
            genres: { $in: genresArray },
            subcategories: findSubCategories?._id,
          },
          {
            $pull: {
              genres: { $in: genresArray },
              subcategories: findSubCategories?._id,
            },
          }
        );
        if (findSubCategories?.iconFile) {
          const deleteIcon = await awsS3.delete(findSubCategories.iconFile);
        }
        const deleteSubCategory = await SubCategorySchema.findByIdAndDelete(
          ids
        );
        if (!deleteSubCategory)
          throw new NotAcceptable(subCategoryMessage.error.notDeleted);
        res.json({
          success: {
            message: subCategoryMessage.success.deleted,
          },
        });
      } else {
        // if does not have genres
        const removeSubCategoryFromUser = await UserSchema.updateMany(
          { subcategories: ids },
          { $pull: { subcategories: ids } }
        );
        const removeSubCategoryFromCategory = await CategorySchema.updateMany(
          { subcategories: ids },
          { $pull: { subcategories: ids } }
        );
        const deleteSubCategory = await SubCategorySchema.findByIdAndDelete(
          ids
        );
        if (findSubCategories?.iconFile) {
          const deleteIcon = await awsS3.delete(findSubCategories.iconFile);
        }
        if (!deleteSubCategory)
          throw new NotAcceptable(subCategoryMessage.error.notDeleted);
        res.json({
          success: {
            message: subCategoryMessage.success.deleted,
          },
        });
      }
    } catch (error) {
      next(error);
    }
  }
}

export default subCategoryController;
