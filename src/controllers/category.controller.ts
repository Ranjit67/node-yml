import { Request, Response, NextFunction } from "express";
import { BadRequest, NotAcceptable, NotFound } from "http-errors";
import { CategorySchema } from "../models";
import { categoryMessage } from "../resultMessage";
import { AwsS3Services } from "../services";
class CategoryController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { categoryName } = req.body;
      const iconPicture = req?.files?.icon;
      if (!categoryName || !iconPicture)
        throw new BadRequest(categoryMessage.error.allField);
      const awsS3 = new AwsS3Services();
      const iconImage = await awsS3.upload(iconPicture);
      if (!iconImage)
        throw new NotAcceptable(categoryMessage.error.iconImageUploadFail);
      const saveCategory = await CategorySchema.create({
        title: categoryName,
        iconUrl: iconImage?.Location,
        iconFile: iconImage?.key,
      });
      if (!saveCategory)
        throw new NotAcceptable(categoryMessage.error.notCreated);
      res.json({ data: categoryMessage.success.categoryCreates });
    } catch (error) {
      next(error);
    }
  }
  public async getAllCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const categoryList = await CategorySchema.find().populate({
        path: "subCategoryRefs",
        populate: {
          path: "genresRefs",
          model: "Genres",
        },
      });
      res.json({ data: categoryList });
    } catch (error) {
      next(error);
    }
  }
  public async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { categoryId } = req.params;
      if (!categoryId) throw new BadRequest(categoryMessage.error.allField);
      const category = await CategorySchema.findById(categoryId).populate({
        path: "subCategoryRefs",
        populate: {
          path: "genresRefs",
          model: "Genres",
        },
      });
      if (!category)
        throw new NotAcceptable(categoryMessage.error.dataNotFound);
      res.json({ data: category });
    } catch (error) {
      next(error);
    }
  }
  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { categoryId, categoryName } = req.body;
      if (!categoryId) throw new BadRequest(categoryMessage.error.allField);
      const iconPicture = req?.files?.icon;
      const findCategory = await CategorySchema.findById(categoryId);
      if (!findCategory) throw new NotFound(categoryMessage.error.dataNotFound);
      if (iconPicture) {
        const awsS3 = new AwsS3Services();
        const deleteOlder = await awsS3.delete(findCategory?.iconFile);
        const iconImage = await awsS3.upload(iconPicture);
        if (!iconImage)
          throw new NotAcceptable(categoryMessage.error.iconImageUploadFail);
        const updateCategory = await CategorySchema.findByIdAndUpdate(
          categoryId,
          {
            title: categoryName ?? findCategory.title,
            iconUrl: iconImage?.Location,
            iconFile: iconImage?.key,
          },
          { new: true }
        );
        if (!updateCategory)
          throw new NotAcceptable(categoryMessage.error.notUpdated);
        res.json({ data: categoryMessage.success.categoryUpdated });
      } else {
        const updateCategory = await CategorySchema.findByIdAndUpdate(
          categoryId,
          { title: categoryName },
          { new: true }
        );
        if (!updateCategory)
          throw new NotAcceptable(categoryMessage.error.notUpdated);
        res.json({ data: categoryMessage.success.categoryUpdated });
      }
    } catch (error) {
      next(error);
    }
  }
}
export default CategoryController;
