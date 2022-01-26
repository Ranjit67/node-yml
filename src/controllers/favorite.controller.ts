import { Request, Response, NextFunction } from "express";
import {
  BadRequest,
  InternalServerError,
  Conflict,
  NotFound,
  NotAcceptable,
} from "http-errors";
import { FavoriteSchema, UserSchema } from "../models";
import { favoriteMessage } from "../resultMessage";

class FavoriteController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, artistId } = req.body;
      if (!userId || !artistId)
        throw new BadRequest(favoriteMessage.error.allField);
      const firstUpdate = await FavoriteSchema.updateOne(
        { artist: artistId, "favorites.user": userId },
        {
          $pull: {
            favorites: {
              user: userId,
            },
          },
        }
      );
      if (firstUpdate.matchedCount)
        return res.json({
          success: {
            message: favoriteMessage.success.removeFavorite,
          },
        });
      const secondUpdate = await FavoriteSchema.updateOne(
        { artist: artistId },
        {
          $push: {
            favorites: {
              user: userId,
            },
          },
        }
      );
      if (secondUpdate.matchedCount)
        return res.json({
          success: { message: favoriteMessage.success.addFavorite },
        });
      const findArtist: any = await UserSchema.findOne({ _id: artistId });

      if (findArtist.role !== "artist")
        throw new NotFound(favoriteMessage.error.notArtist);
      const favorite = new FavoriteSchema({
        artist: artistId,
      });
      favorite.favorites.push({
        user: userId,
        timestamp: new Date(),
      });
      const saveFavorite = await favorite.save();
      if (!saveFavorite)
        throw new NotAcceptable(favoriteMessage.error.addFavorite);
      res.json({ success: { message: favoriteMessage.success.addFavorite } });
    } catch (error) {
      next(error);
    }
  }
  public async viewUserList(req: Request, res: Response, next: NextFunction) {
    try {
      const { artistId } = req.params;
      if (!artistId) throw new BadRequest(favoriteMessage.error.allField);
      const findFavoriteArtist: any = await FavoriteSchema.findOne({
        artist: artistId,
      }).populate({
        path: "favorites.user",
        select: "-password",
      });
      res.json({
        success: {
          data: findFavoriteArtist.favorites,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  public async viewArtistList(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      if (!userId) throw new BadRequest(favoriteMessage.error.allField);
      const findArtistsUserMakeFavorite = await FavoriteSchema.find({
        "favorites.user": userId,
      }).populate({
        path: "artist",
        match: { status: { $eq: "active" } },
        select: "-password",
      });
      const removeNullField = findArtistsUserMakeFavorite.filter(
        (item: any) => item.artist !== null
      );
      res.json({ success: { data: removeNullField } });
    } catch (error) {
      next(error);
    }
  }
}
export default FavoriteController;
