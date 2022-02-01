import { Request, Response, NextFunction } from "express";
import { BadRequest, GatewayTimeout, NotAcceptable } from "http-errors";
import { LanguageSchema, UserSchema } from "../models";
import { languageMessage } from "../resultMessage";
class LanguageController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { languageName } = req.body;
      if (!languageName) throw new BadRequest(languageMessage.error.allField);
      const languageSave = await LanguageSchema.create({
        languageName,
        timestamp: new Date(),
      });
      if (!languageSave)
        throw new GatewayTimeout(languageMessage.error.notCreated);
      res.json({
        success: {
          message: languageMessage.success.created,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const findAllLanguage = await LanguageSchema.find();
      res.json({
        success: {
          data: findAllLanguage,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  public async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const findOneLanguage = await LanguageSchema.findById(id);
      res.json({
        success: {
          data: findOneLanguage,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { languageName, language_id } = req.body;
      if (!languageName || !language_id)
        throw new BadRequest(languageMessage.error.allField);
      const updateLanguage = await LanguageSchema.findByIdAndUpdate(
        language_id,
        { languageName }
      );
      if (!updateLanguage)
        throw new GatewayTimeout(languageMessage.error.notUpdate);
      res.json({
        success: {
          message: languageMessage.success.updated,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { language_idsOrId } = req.body;
      if (!language_idsOrId?.length)
        throw new BadRequest(languageMessage.error.deleteField);
      if (Array.isArray(language_idsOrId)) {
        const deleteLanguage = await LanguageSchema.deleteMany({
          _id: { $in: language_idsOrId },
        });
        if (!deleteLanguage)
          throw new GatewayTimeout("Language is not deleted.");
        const deleteFromUser = await UserSchema.updateMany(
          { languages: { $in: language_idsOrId } },
          { $pull: { languages: { $in: language_idsOrId } } }
        );
        if (!deleteFromUser)
          throw new NotAcceptable("Language is not deleted from user.");
        res.json({
          success: {
            message: "Languages are deleted successfully.",
          },
        });
      } else {
        const deleteLanguage = await LanguageSchema.findOneAndDelete({
          _id: language_idsOrId,
        });
        if (!deleteLanguage)
          throw new GatewayTimeout("Language is not deleted.");
        const deleteFromUser = await UserSchema.updateMany(
          { languages: { $in: [language_idsOrId] } },
          { $pull: { languages: { $in: [language_idsOrId] } } }
        );
        if (!deleteFromUser)
          throw new NotAcceptable("Language is not deleted from user.");
        res.json({
          success: {
            message: "Language is deleted successfully.",
          },
        });
      }
    } catch (error) {
      next(error);
    }
  }
}
export default LanguageController;
