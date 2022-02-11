import { Response, Request, NextFunction } from "express";
import {
  BadRequest,
  InternalServerError,
  Conflict,
  NotAcceptable,
  NotFound,
} from "http-errors";
import { ArtistBlockDateSchema } from "../models";
import { artistBlockDateMessage } from "../resultMessage";

class ArtistBlockDateController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { artistId, datesArray } = req.body;
      if (!artistId || !datesArray.length)
        throw new BadRequest(artistBlockDateMessage.error.allField);
      const currentTime = new Date();
      const structDates = datesArray.map((date: Date) => ({
        date: new Date(date).getTime(),
        timestamp: currentTime,
      }));

      const firstUpdate = await ArtistBlockDateSchema.updateOne(
        { artist: artistId },
        {
          $push: { blockedDates: { $each: structDates } },
        }
      );
      const removeOlderDates = await ArtistBlockDateSchema.updateOne(
        { artist: artistId },
        {
          $pull: {
            blockedDates: {
              date: { $lt: new Date().getTime() },
            },
          },
        }
      );
      if (firstUpdate.matchedCount === 1)
        return res.json({
          success: { message: artistBlockDateMessage.success.blockDateInput },
        });
      const firstTimeSave = await ArtistBlockDateSchema.create({
        artist: artistId,
        blockedDates: structDates,
      });
      if (!firstTimeSave)
        throw new NotAcceptable(artistBlockDateMessage.error.notUpdated);
      return res.json({
        success: { message: artistBlockDateMessage.success.blockDateInput },
      });
    } catch (error) {
      next(error);
    }
  }
  public async getBlockDateByArtist(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { artistId } = req.params;
      if (!artistId)
        throw new BadRequest(artistBlockDateMessage.error.allField);
      const artistBlockDate: any = await ArtistBlockDateSchema.findOne({
        artist: artistId,
      }).select("blockedDates");
      if (!artistBlockDate) res.json({ success: { data: [] } });
      const structDates = artistBlockDate.blockedDates.map((element: any) => ({
        _id: element._id,
        timestamp: element.timestamp,
        date: new Date(element.date),
      }));
      return res.json({ success: { data: structDates } });
    } catch (error) {
      next(error);
    }
  }
  async deleteBlockDateByArtist(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { blockDateIds } = req.body;
      if (!blockDateIds.length)
        throw new BadRequest(artistBlockDateMessage.error.allField);
      const deleteBlockDate = await ArtistBlockDateSchema.updateOne(
        { "blockedDates._id": { $in: blockDateIds } },
        {
          $pull: {
            blockedDates: {
              _id: { $in: blockDateIds },
            },
          },
        }
      );
      if (!deleteBlockDate.matchedCount)
        throw new NotAcceptable(artistBlockDateMessage.error.notDeleted);
      return res.json({
        success: {
          message: artistBlockDateMessage.success.deleteBlockDate,
        },
      });
    } catch (error: any) {
      if (error?.path === "_id")
        return res.status(406).json({
          error: {
            message: artistBlockDateMessage.error.notDeleted,
          },
        });
      next(error);
    }
  }
}

export default ArtistBlockDateController;
