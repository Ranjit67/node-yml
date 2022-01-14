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
        { artistRef: artistId, userRefs: { $elemMatch: { userRef: userId } } },
        {
          "userRefs.$.spentTime": spentTime,
          $inc: {
            "userRefs.$.count": 1,
          },
          "userRefs.$.lastTimeVisit": new Date().toString(),
        }
      );
      if (visitorFirstUpdate.matchedCount)
        return res.json({ data: visitorMessage.success.visitorAdded });
      const visitorSecondUpdate = await VisitorSchema.updateOne(
        { artistRef: artistId },
        {
          $push: {
            userRefs: {
              userRef: userId,
              spentTime,
            },
          },
        }
      );
      if (visitorSecondUpdate.matchedCount)
        return res.json({ data: visitorMessage.success.visitorAdded });
      if (
        visitorSecondUpdate.matchedCount &&
        !visitorSecondUpdate.modifiedCount
      )
        throw new NotAcceptable(visitorMessage.error.notUpdated);
      const visitor = new VisitorSchema({
        artistRef: artistId,
      });
      visitor.userRefs.push({
        userRef: userId,
        spentTime,
        lastTimeVisit: new Date(),
        count: 1,
      });
      const saveVisitor = await visitor.save();
      if (!saveVisitor)
        throw new NotAcceptable(visitorMessage.error.notUpdated);
      res.json({ data: visitorMessage.success.visitorAdded });
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
        artistRef: artistId,
      }).populate("userRefs.userRef");
      res.json({ data: visitors?.userRefs });
    } catch (error) {
      next(error);
    }
  }
}
export default VisitorController;
