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
        { artistRef: artistId, "favorites.userRef": userId },
        {
          $pull: {
            favorites: {
              userRef: userId,
            },
          },
        }
      );
      if (firstUpdate.matchedCount)
        return res.json({ data: favoriteMessage.success.removeFavorite });
      const secondUpdate = await FavoriteSchema.updateOne(
        { artistRef: artistId },
        {
          $push: {
            favorites: {
              userRef: userId,
            },
          },
        }
      );
      if (secondUpdate.matchedCount)
        return res.json({ data: favoriteMessage.success.addFavorite });
      const findArtist: any = await UserSchema.findOne({ _id: artistId });

      if (findArtist.role !== "artist")
        throw new NotFound(favoriteMessage.error.notArtist);
      const favorite = new FavoriteSchema({
        artistRef: artistId,
      });
      favorite.favorites.push({
        userRef: userId,
        timestamp: new Date(),
      });
      const saveFavorite = await favorite.save();
      if (!saveFavorite)
        throw new NotAcceptable(favoriteMessage.error.addFavorite);
      res.json({ data: favoriteMessage.success.addFavorite });
    } catch (error) {
      next(error);
    }
  }
  public async viewUserList(req: Request, res: Response, next: NextFunction) {
    try {
      const { artistId } = req.params;
      const findFavoriteArtist: any = await FavoriteSchema.findOne({
        artistRef: artistId,
      }).populate({
        path: "favorites.userRef",
        select: "-password",
      });
      res.json({ data: findFavoriteArtist.favorites });
    } catch (error) {
      next(error);
    }
  }
  public async viewArtistList(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const findArtistsUserMakeFavorite = await FavoriteSchema.find({
        "favorites.userRef": userId,
      }).populate({
        path: "artistRef",
        match: { status: { $eq: "active" } },
        select: "-password",
      });
      const removeNullField = findArtistsUserMakeFavorite.filter(
        (item: any) => item.artistRef !== null
      );
      res.json({ data: removeNullField });
    } catch (error) {
      next(error);
    }
  }
}
export default FavoriteController;
