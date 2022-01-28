import { Response, Request, NextFunction } from "express";
import {
  BadRequest,
  InternalServerError,
  Conflict,
  NotFound,
} from "http-errors";
import { AssignArtistSchema, UserSchema, RequestSchema } from "../models";
import { NotificationServices } from "../services";
import { AssignArtistContent } from "../emailContent";
import { assignArtistToManager } from "../notificationIcon";
class AssignArtistController {
  public async assignArtist(req: Request, res: Response, next: NextFunction) {
    try {
      const { managerId, artistId } = req.body;

      if (!managerId || !artistId)
        throw new BadRequest("All fields are required.");

      const findManager = await UserSchema.find({
        _id: { $in: [artistId, managerId] },
      });
      const findArtistData = findManager.find(
        (item) =>
          item.role === "artist" && item._id.toString() === artistId.toString()
      );
      const findManagerData = findManager.find(
        (item) =>
          item.role === "manager" &&
          item._id.toString() === managerId.toString()
      );
      // notification
      const assignArtistContent = new AssignArtistContent();
      const title =
        assignArtistContent.managerRequestAcceptedByArtist(
          findManagerData
        ).subject;

      const description =
        assignArtistContent.managerRequestAcceptedByArtist(
          findManagerData
        ).text;

      // notification credentials end
      if (!findArtistData || !findManagerData)
        throw new BadRequest("Invalid user id.");

      const updateAssignArtist = await AssignArtistSchema.findOneAndUpdate(
        {
          manager: managerId,
          "artists.artist": { $ne: artistId },
        },
        {
          $addToSet: {
            artists: {
              artist: artistId,
            },
          },
        }
      );
      // notification start

      await new NotificationServices().notificationGenerate(
        managerId,
        artistId,
        title,
        description,
        assignArtistToManager,
        {
          subject: title,
          text: description,
        },
        {
          title,
          body: description,
          sound: "default",
        }
      );
      // notification end
      if (updateAssignArtist)
        return res.json({
          success: { message: "Artist is assigned successfully." },
        });

      const assignArtist = new AssignArtistSchema({
        manager: managerId,
      });
      assignArtist.artists.push({
        artist: artistId,
        timestamp: new Date(),
      }); // here Error handling throw middleware.
      const saveAssignArtist = await assignArtist.save();
      if (!saveAssignArtist)
        throw new InternalServerError("Artist is not assigned.");
      // notification start  only send to manager

      await new NotificationServices().notificationGenerate(
        managerId,
        artistId,
        title,
        description,
        assignArtistToManager,
        {
          subject: title,
          text: description,
        },
        {
          title,
          body: description,
          sound: "default",
        }
      );

      // notification end
      res.json({ success: { message: "Artist is assigned successfully." } });
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
        { manager: managerId },
        {
          $pull: {
            artists: {
              artist: artistId,
            },
          },
        }
      );
      if (!findAndUpdate.matchedCount)
        throw new NotFound("Manager is not found.");
      if (!findAndUpdate.modifiedCount)
        throw new Conflict("Artist is not assign to this Manager .");
      const findManger = await UserSchema.findOne({ _id: managerId });
      const assignArtistContent = new AssignArtistContent();
      const title =
        assignArtistContent.artistAssignRemoveManagerSide(findManger).subject;

      const description =
        assignArtistContent.artistAssignRemoveManagerSide(findManger).text;
      await new NotificationServices().notificationGenerate(
        managerId,
        artistId,
        title,
        description,
        assignArtistToManager,
        {
          subject: title,
          text: description,
        },
        {
          title,
          body: description,
          sound: "default",
        }
      );

      res.json({ success: { message: "Artist is remove from manager" } });
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
        manager: managerId,
      }).populate("artists.artist");
      res.json({ success: { data: findManagerData?.artists } });
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
      const findManagerData = await AssignArtistSchema.find({
        "artists.artist": artistId,
      })
        .populate("manager")
        .select("manager -_id");
      res.json({ success: { data: findManagerData } });
    } catch (error) {
      next(error);
    }
  }
}
export default AssignArtistController;
