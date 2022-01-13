import { Response, Request, NextFunction } from "express";
import {
  BadRequest,
  InternalServerError,
  Conflict,
  NotFound,
} from "http-errors";
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

      if (
        !findManager.find(
          (item) =>
            item.role === "artist" &&
            item._id.toString() === artistId.toString()
        ) ||
        !findManager.find(
          (item) =>
            item.role === "manager" &&
            item._id.toString() === managerId.toString()
        )
      )
        throw new BadRequest("Invalid user id.");

      const updateAssignArtist = await AssignArtistSchema.findOneAndUpdate(
        {
          managerRef: managerId,
          "artistRefs.artistRef": { $ne: artistId },
        },
        {
          $addToSet: {
            artistRefs: {
              artistRef: artistId,
            },
          },
        }
      );
      if (updateAssignArtist)
        return res.json({ data: "Artist is assigned successfully." });

      const assignArtist = new AssignArtistSchema({
        managerRef: managerId,
      });
      assignArtist.artistRefs.push({
        artistRef: artistId,
        timestamp: new Date(),
      }); // here Error handling throw middleware.
      const saveAssignArtist = await assignArtist.save();
      if (!saveAssignArtist)
        throw new InternalServerError("Artist is not assigned.");
      res.json({ data: "Artist is assigned successfully." });
    } catch (error) {
      next(error);
    }
  }
  public async removeArtist(req: Request, res: Response, next: NextFunction) {
    try {
      const { managerId, artistId } = req.body;
      if (!managerId || !artistId)
        throw new BadRequest("All fields are required.");
      const findAndUpdate = await AssignArtistSchema.updateOne(
        { managerRef: managerId },
        {
          $pull: {
            artistRefs: {
              artistRef: artistId,
            },
          },
        }
      );
      if (!findAndUpdate.matchedCount)
        throw new NotFound("Manager is not found.");
      if (!findAndUpdate.modifiedCount)
        throw new Conflict("Artist is not assign to this Manager .");

      res.json({ data: "Artist is remove from manager" });
    } catch (error) {
      next(error);
    }
  }
  public async managerUnderArtist(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { managerId } = req.params;
      if (!managerId) throw new BadRequest("All fields are required.");
      const findManagerData = await AssignArtistSchema.findOne({
        managerRef: managerId,
      }).populate("artistRefs.artistRef");
      res.json({ data: findManagerData?.artistRefs });
    } catch (error) {
      next(error);
    }
  }
  public async getManagerByArtist(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { artistId } = req.params;
      if (!artistId) throw new BadRequest("All fields are required.");
      const findManagerData = await AssignArtistSchema.findOne({
        "artistRefs.artistRef": artistId,
      }).populate("managerRef");
      res.json({ data: findManagerData?.managerRef });
    } catch (error) {
      next(error);
    }
  }
}
export default AssignArtistController;
