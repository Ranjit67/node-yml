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
        { artistRef: artistId },
        {
          $push: { blockedDates: { $each: structDates } },
        }
      );
      const removeOlderDates = await ArtistBlockDateSchema.updateOne(
        { artistRef: artistId },
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
          data: artistBlockDateMessage.success.blockDateInput,
        });
      const firstTimeSave = await ArtistBlockDateSchema.create({
        artistRef: artistId,
        blockedDates: structDates,
      });
      if (!firstTimeSave)
        throw new NotAcceptable(artistBlockDateMessage.error.notUpdated);
      return res.json({ data: artistBlockDateMessage.success.blockDateInput });
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
        artistRef: artistId,
      }).select("blockedDates");
      if (!artistBlockDate) res.json({ data: [] });
      const structDates = artistBlockDate.blockedDates.map((element: any) => ({
        timestamp: element.timestamp,
        date: new Date(element.date),
      }));
      return res.json({ data: structDates });
    } catch (error) {
      next(error);
    }
  }
}

export default ArtistBlockDateController;
