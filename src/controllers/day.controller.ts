import { Request, Response, NextFunction } from "express";
import { BadRequest, InternalServerError, NotAcceptable } from "http-errors";
import { DaySchema } from "../models";
import { dayMessage } from "../resultMessage";
class DayController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { num } = req.body;
      if (num < 1) throw new BadRequest(dayMessage.error.num);
      const findData: any = await DaySchema.findOne();
      if (!findData) {
        const day = new DaySchema({
          days: [num],
        });
        const saveDay = await day.save();
        if (!saveDay) throw new NotAcceptable(dayMessage.error.notSave);

        return res.json({ data: dayMessage.success.save });
      } else {
        if (findData.days.find((day: any) => day === num))
          throw new BadRequest(dayMessage.error.duplicateName);
        const updateData = await DaySchema.findOneAndUpdate(
          {},
          {
            $push: {
              days: num,
            },
          }
        );
        if (!updateData) throw new NotAcceptable(dayMessage.error.notSave);
        return res.json({ data: dayMessage.success.save });
      }
    } catch (error) {
      next(error);
    }
  }
  public async getAllDay(req: Request, res: Response, next: NextFunction) {
    try {
      const day = await DaySchema.findOne().select("-__v");
      if (!day) return res.json({ data: [] });
      res.json({ data: day.days });
    } catch (error) {
      next(error);
    }
  }
  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { oldNum, newNum } = req.body;
      if (newNum < 1) throw new BadRequest(dayMessage.error.num);
      const updateData = await DaySchema.findOneAndUpdate(
        { days: oldNum },
        {
          "days.$": newNum,
        }
      );
      if (!updateData) throw new NotAcceptable(dayMessage.error.notUpdated);
      return res.json({ data: dayMessage.success.updated });
    } catch (error) {
      next(error);
    }
  }
  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { numArray } = req.body;
      if (!numArray.length) throw new BadRequest(dayMessage.error.numArray);
      const deleteDay = await DaySchema.findOneAndUpdate(
        {},
        {
          $pull: {
            days: {
              $in: numArray,
            },
          },
        }
      );
      if (!deleteDay) throw new NotAcceptable(dayMessage.error.notDelete);
      return res.json({ data: dayMessage.success.delete });
    } catch (error) {
      next(error);
    }
  }
}
export default DayController;
