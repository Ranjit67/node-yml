import { Response, Request, NextFunction } from "express";
import { BadRequest, InternalServerError, Conflict } from "http-errors";
import { AssignArtistSchema, UserSchema } from "../models";
class AssignArtistController {
  public async assignArtist(req: Request, res: Response, next: NextFunction) {
    try {
      const { managerId, artistId } = req.body;
      if (!managerId || !artistId)
        throw new BadRequest("All fields are required.");
      const findManager = await UserSchema.find({
        _id: { $in: [artistId, managerId] },
      });

      res.json({ data: findManager });
    } catch (error) {
      next(error);
    }
  }
}
export default AssignArtistController;
