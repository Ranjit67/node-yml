import { Request, Response, NextFunction } from "express";
import { BadRequest, InternalServerError, NotAcceptable } from "http-errors";
import { crowdMessage } from "../resultMessage";
import { CrowdSchema } from "../models";
class CrowdController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { min, max } = req.body;
      if (min === undefined || max === undefined)
        throw new BadRequest(crowdMessage.error.bothValue);
      if (typeof min !== "number" || typeof max !== "number")
        throw new BadRequest(crowdMessage.error.bothNumber);
      if (min >= max) throw new BadRequest(crowdMessage.error.numberGrater);
      const crowd = await CrowdSchema.create({
        min,
        max,
        timestamp: new Date(),
      });
      if (!crowd) throw new BadRequest(crowdMessage.error.notSave);
      res.json({
        success: {
          message: crowdMessage.success.save,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { min, max, crowdId } = req.body;
      if (min === undefined || max === undefined || crowdId === undefined)
        throw new BadRequest(crowdMessage.error.allField);
      if (typeof min !== "number" || typeof max !== "number")
        throw new BadRequest(crowdMessage.error.bothNumber);
      if (min >= max) throw new BadRequest(crowdMessage.error.numberGrater);
      const updateData = await CrowdSchema.findOneAndUpdate(
        { _id: crowdId },
        {
          min,
          max,
        }
      );
      if (!updateData) throw new NotAcceptable(crowdMessage.error.notUpdated);
      res.json({
        success: {
          message: crowdMessage.success.updated,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  public async getAllCrowd(req: Request, res: Response, next: NextFunction) {
    try {
      const crowd = await CrowdSchema.find().select("-__v");
      res.json({
        success: {
          data: crowd,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { crowdIds } = req.body;
      const deleteCrowds = await CrowdSchema.deleteMany({
        _id: { $in: crowdIds },
      });
      if (!deleteCrowds) throw new NotAcceptable(crowdMessage.error.notDelete);
      res.json({
        success: {
          message: crowdMessage.success.delete,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
export default CrowdController;
