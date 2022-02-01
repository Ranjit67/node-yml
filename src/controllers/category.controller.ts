import { Request, Response, NextFunction } from "express";
import { BadRequest, NotAcceptable, NotFound } from "http-errors";
import {
  CategorySchema,
  GenresSchema,
  SubCategorySchema,
  UserSchema,
} from "../models";
import { categoryMessage } from "../resultMessage";
import { AwsS3Services } from "../services";
class CategoryController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { categoryName } = req.body;
      const iconPicture = req?.files?.icon;
      const imagePicture = req?.files?.image;
      if (!categoryName || !iconPicture || !imagePicture)
        throw new BadRequest(categoryMessage.error.allField);
      const awsS3 = new AwsS3Services();
      const iconImage = await awsS3.upload(iconPicture);
      const image = await awsS3.upload(imagePicture);
      if (!iconImage)
        throw new NotAcceptable(categoryMessage.error.iconImageUploadFail);
      const saveCategory = await CategorySchema.create({
        title: categoryName,
        iconUrl: iconImage?.Location,
        iconFile: iconImage?.key,
        imageFile: image.key,
        imageUrl: image.Location,
      });
      if (!saveCategory)
        throw new NotAcceptable(categoryMessage.error.notCreated);
      res.json({
        success: {
          message: categoryMessage.success.categoryCreates,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  public async getAllCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const categoryList = await CategorySchema.find().populate({
        path: "subcategories",
        populate: {
          path: "genres",
          model: "Genres",
        },
      });

      res.json({
        success: {
          data: categoryList,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  public async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { categoryId } = req.params;
      if (!categoryId) throw new BadRequest(categoryMessage.error.allField);
      const category = await CategorySchema.findById(categoryId).populate({
        path: "subcategories",
        populate: {
          path: "genres",
          model: "Genres",
        },
      });
      if (!category)
        throw new NotAcceptable(categoryMessage.error.dataNotFound);
      res.json({
        success: {
          data: category,
        },
      });
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
        res.json({
          success: {
            message: categoryMessage.success.categoryUpdated,
          },
        });
      } else {
        const updateCategory = await CategorySchema.findByIdAndUpdate(
          categoryId,
          { title: categoryName },
          { new: true }
        );
        if (!updateCategory)
          throw new NotAcceptable(categoryMessage.error.notUpdated);
        res.json({
          success: {
            message: categoryMessage.success.categoryUpdated,
          },
        });
      }
    } catch (error) {
      next(error);
    }
  }
  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.body;
      if (!id) throw new BadRequest(categoryMessage.error.allField);
      const findCategory = await CategorySchema.findById(id);
      if (!findCategory)
        throw new NotFound(categoryMessage.error.noDataFoundForDelete);
      const awsS3 = new AwsS3Services();
      if (findCategory?.subcategories.length) {
        // have subcategories
        const findSubcategories =
          (await SubCategorySchema.find({ parentId: id })) ?? [];
        const genresUnArrange = findSubcategories.map(
          (subcategory) => subcategory?.genres ?? []
        );
        const genresArray = genresUnArrange.flat();
        const genreData =
          (await GenresSchema.find({ _id: { $in: genresArray } })) ?? [];

        // genre delete
        for (let element of genreData) {
          const deleteGenreIcon = element?.iconFile
            ? await awsS3.delete(element?.iconFile)
            : "";
        }
        const deleteGenre = await GenresSchema.deleteMany({
          _id: { $in: genresArray },
        });
        // subcategory delete
        for (let element of findSubcategories) {
          const deleteGenreIcon = element?.iconFile
            ? await awsS3.delete(element?.iconFile)
            : "";
        }
        const deleteSubCategory = await SubCategorySchema.deleteMany({
          parentId: id,
        });
        // category delete
        const deleteIcon = findCategory?.iconFile
          ? await awsS3.delete(findCategory?.iconFile)
          : "";
        const deleteImage = findCategory?.imageFile
          ? await awsS3.delete(findCategory?.imageFile)
          : "";

        const cleanUser = await UserSchema.updateMany(
          { category: findCategory._id },
          {
            category: null,
            subcategories: [],
            genres: [],
          }
        );

        // not complete
      } else {
        // not have any subcategory
        const deleteIcon = findCategory?.iconFile
          ? await awsS3.delete(findCategory?.iconFile)
          : "";
        const deleteImage = findCategory?.imageFile
          ? await awsS3.delete(findCategory?.imageFile)
          : "";

        const cleanUser = await UserSchema.updateMany(
          { category: findCategory._id },
          {
            category: null,
            subcategories: [],
            genres: [],
          }
        );
      }
      res.json({
        success: {
          message: categoryMessage.success.categoryDeleted,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
export default CategoryController;
