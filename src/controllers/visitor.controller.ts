import { Request, Response, NextFunction } from "express";
import { BadRequest, NotAcceptable } from "http-errors";
import { VisitorSchema } from "../models";
import { visitorMessage } from "../resultMessage";

class VisitorController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { artistId, spentTime, userId } = req.body;
      if (!artistId || !spentTime || !userId)
        throw new BadRequest(visitorMessage.error.allField);
      const visitorFirstUpdate = await VisitorSchema.updateOne(
        { artist: artistId, users: { $elemMatch: { user: userId } } },
        {
          $inc: {
            "users.$.spentTime": spentTime,
            "users.$.count": 1,
          },
          "users.$.lastTimeVisit": new Date().toString(),
        }
      );
      if (visitorFirstUpdate.matchedCount)
        return res.json({
          success: { message: visitorMessage.success.visitorAdded },
        });
      const visitorSecondUpdate = await VisitorSchema.updateOne(
        { artist: artistId },
        {
          $push: {
            users: {
              user: userId,
              spentTime,
            },
          },
        }
      );
      if (visitorSecondUpdate.matchedCount)
        return res.json({
          success: { message: visitorMessage.success.visitorAdded },
        });
      if (
        visitorSecondUpdate.matchedCount &&
        !visitorSecondUpdate.modifiedCount
      )
        throw new NotAcceptable(visitorMessage.error.notUpdated);

      const saveVisitor = await VisitorSchema.create({
        artist: artistId,
        users: [
          {
            user: userId,
            spentTime,
            lastTimeVisit: new Date(),
            count: 1,
          },
        ],
      });
      if (!saveVisitor)
        throw new NotAcceptable(visitorMessage.error.notUpdated);
      res.json({ success: { message: visitorMessage.success.visitorAdded } });
    } catch (error) {
      next(error);
    }
  }
  public async getVisitorsList(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { artistId } = req.params;
      if (!artistId) throw new BadRequest(visitorMessage.error.allField);
      const visitors: any = await VisitorSchema.findOne({
        artist: artistId,
      }).populate("users.user");
      res.json({ success: { data: visitors?.users } });
    } catch (error) {
      next(error);
    }
  }
}
export default VisitorController;
