import { Request, Response, NextFunction } from "express";
import { BadRequest, InternalServerError, NotAcceptable } from "http-errors";
import { VersionSchema } from "../models";
import { versionMessage } from "../resultMessage";
class VersionController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, description, version, isDismissible } = req.body;
      if (!title || !description || !version)
        throw new BadRequest(versionMessage.error.allField);

      const updateOne = await VersionSchema.updateOne(
        {},
        {
          title,
          description,
          version,
          isDismissible,
          timestamp: new Date(),
        }
      );
      if (updateOne.matchedCount === 1)
        return res.json({
          success: {
            message: versionMessage.success.created,
          },
        });
      const createOne = await VersionSchema.create({
        title,
        description,
        version,
        isDismissible,
        timestamp: new Date(),
      });
      if (!createOne) throw new NotAcceptable(versionMessage.error.notCreated);
      return res.json({
        success: {
          message: versionMessage.success.created,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  public async getSingle(req: Request, res: Response, next: NextFunction) {
    try {
      const findVersion = await VersionSchema.findOne({});
      res.json({
        success: { data: findVersion },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default VersionController;
