import { Request, Response, NextFunction } from "express";
import { BadRequest, NotAcceptable } from "http-errors";
import { CategorySchema } from "../models";
import { categoryMessage } from "../resultMessage";
class CategoryController {
  public create(req: Request, res: Response, next: NextFunction) {
    try {
      const { categoryName } = req.body;
      if (!categoryName) throw new BadRequest(categoryMessage.error.allField);
      const saveCategory = CategorySchema.create({ title: categoryName });
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
      if (!categoryId || !categoryName)
        throw new BadRequest(categoryMessage.error.allField);
      const updateCategory = await CategorySchema.findByIdAndUpdate(
        categoryId,
        { title: categoryName },
        { new: true }
      );
      if (!updateCategory)
        throw new NotAcceptable(categoryMessage.error.notUpdated);
      res.json({ data: categoryMessage.success.categoryUpdated });
    } catch (error) {
      next(error);
    }
  }
}
export default CategoryController;
