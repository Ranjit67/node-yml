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
import { assignArtistMessage } from "../resultMessage";
class AssignArtistController {
  public async assignArtist(req: Request, res: Response, next: NextFunction) {
    try {
      const { managerId, artistId } = req.body;

      if (!managerId || !artistId)
        throw new BadRequest(assignArtistMessage.error.allField);

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
        throw new BadRequest(assignArtistMessage.error.invalidUser);

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
          success: { message: assignArtistMessage.success.assignArtist },
        });

      const saveAssignArtist = await AssignArtistSchema.create({
        manager: managerId,
        artists: [
          {
            artist: artistId,
            timestamp: new Date(),
          },
        ],
      }); // here Error handling throw middleware.

      if (!saveAssignArtist)
        throw new InternalServerError(assignArtistMessage.error.notAssign);
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
      res.json({
        success: { message: assignArtistMessage.success.assignArtist },
      });
    } catch (error) {
      next(error);
    }
  }
  public async removeArtist(req: Request, res: Response, next: NextFunction) {
    try {
      const { managerId, artistId } = req.body;
      if (!managerId || !artistId)
        throw new BadRequest(assignArtistMessage.error.allField);
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
        throw new NotFound(assignArtistMessage.error.managerNotFound);
      if (!findAndUpdate.modifiedCount)
        throw new Conflict(assignArtistMessage.error.artistNotAssignManger);
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

      res.json({
        success: { message: assignArtistMessage.success.artistRemove },
      });
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
      if (!managerId) throw new BadRequest(assignArtistMessage.error.allField);
      const findManagerData = await AssignArtistSchema.findOne({
        manager: managerId,
      }).populate({
        path: "artists.artist",
        populate: [
          {
            path: "category",
            model: "Category",
          },
          {
            path: "subcategories",
            model: "SubCategory",
          },
          {
            path: "genres",
            model: "Genres",
          },
          {
            path: "languages",
            model: "Language",
          },
          {
            path: "events",
            model: "Event",
          },
        ],
        select: "-password -fcmToken",
      });
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
      if (!artistId) throw new BadRequest(assignArtistMessage.error.allField);
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
