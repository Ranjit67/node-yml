import { Request, Response, NextFunction } from "express";
import { BadRequest, NotAcceptable, NotFound } from "http-errors";
import { artistMediaMessage } from "../resultMessage";
import { AwsS3Services } from "../services";
import { ArtistMediaSchema, UserSchema } from "../models";

class ArtistMediaController {
  private dir = "artistMedia";
  public async videoCreate(req: any, res: Response, next: NextFunction) {
    try {
      const { artistId, links } = req.body;
      if (!artistId)
        throw new BadRequest(artistMediaMessage.error.artistIdRequired);

      const videoObject = Array.isArray(req?.files?.video)
        ? req?.files?.video
        : req?.files?.video
        ? [req.files.video]
        : [];
      const timestamp = new Date();

      const linkArray = Array.isArray(links)
        ? links.map((element: string) => ({
            youtubeUrl: element,
            timestamp,
          }))
        : links
        ? [
            {
              youtubeUrl: links,
              timestamp,
            },
          ]
        : [];
      if (videoObject) {
        // here may links and local video have
        let videoArray = [];

        const awsS3 = new AwsS3Services();
        for (let a of videoObject) {
          const videoUrl = await awsS3.upload(a, "artistMedia");
          videoArray.push({
            videoUrl: videoUrl?.Location,
            videoFile: videoUrl?.key,
            timestamp: timestamp,
          });
        }
        const firstUpdate = await ArtistMediaSchema.updateOne(
          { artist: artistId },
          {
            $push: {
              artistVideos: {
                $each: videoArray,
              },
              youtubeVideos: {
                $each: linkArray,
              },
            },
          }
        );
        if (firstUpdate.matchedCount === 1)
          return res.json({
            success: {
              message: artistMediaMessage.success.artistMediaUpdated,
            },
          });
        const saveData = await ArtistMediaSchema.create({
          artist: artistId,
          artistVideos: videoArray,
          youtubeVideos: linkArray,
        });
        if (!saveData)
          throw new NotAcceptable(artistMediaMessage.error.notCreated);
        // user update
        const userUpdate = await UserSchema.findByIdAndUpdate(artistId, {
          artistMedia: saveData._id,
        });

        // user update end
        res.json({
          success: {
            message: artistMediaMessage.success.artistMediaUpdated,
          },
        });
      } else {
        const firstUpdate = await ArtistMediaSchema.updateOne(
          { artist: artistId },
          {
            $push: {
              youtubeVideos: {
                $each: linkArray,
              },
            },
          }
        );
        if (firstUpdate.matchedCount === 1)
          return res.json({
            success: {
              message: artistMediaMessage.success.artistMediaUpdated,
            },
          });

        const saveData = await ArtistMediaSchema.create({
          artist: artistId,
          youtubeVideos: linkArray,
        });
        if (!saveData)
          throw new NotAcceptable(artistMediaMessage.error.notCreated);
        // user update
        const userUpdate = await UserSchema.findByIdAndUpdate(artistId, {
          artistMedia: saveData._id,
        });
        // user update end
        return res.json({
          success: {
            message: artistMediaMessage.success.artistMediaUpdated,
          },
        });
        // no media file
      }
    } catch (error) {
      next(error);
    }
  }
  public async photoCreate(req: any, res: Response, next: NextFunction) {
    try {
      const { artistId } = req.body;

      const images = Array.isArray(req?.files?.images)
        ? req?.files?.images
        : req?.files?.images
        ? [req.files.images]
        : [];
      if (!artistId || !images.length)
        throw new BadRequest(artistMediaMessage.error.allField);
      const awsS3 = new AwsS3Services();
      const imageArray = [];
      const timestamp = new Date();
      for (let a of images) {
        const imageUrl = await awsS3.upload(a, "artistMedia");
        imageArray.push({
          imageUrl: imageUrl?.Location,
          imageFile: imageUrl?.key,
          timestamp: timestamp,
        });
      }
      const firstUpdate = await ArtistMediaSchema.updateOne(
        { artist: artistId },
        {
          $push: {
            artistPhotos: {
              $each: imageArray,
            },
          },
        }
      );
      if (firstUpdate.matchedCount === 1)
        return res.json({
          success: {
            message: artistMediaMessage.success.artistPhotoUpdated,
          },
        });
      const saveData = await ArtistMediaSchema.create({
        artist: artistId,
        artistPhotos: imageArray,
      });
      if (!saveData)
        throw new NotAcceptable(artistMediaMessage.error.photoNotCreated);
      // user update
      const userUpdate = await UserSchema.findByIdAndUpdate(artistId, {
        artistMedia: saveData._id,
      });
      // user update end
      return res.json({
        success: {
          message: artistMediaMessage.success.artistPhotoUpdated,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  //
  public async getArtistVideo(req: Request, res: Response, next: NextFunction) {
    try {
      const { artistId } = req.params;
      if (!artistId)
        throw new BadRequest(artistMediaMessage.error.artistIdRequired);
      const findData = await ArtistMediaSchema.findOne({
        artist: artistId,
      }).select("artistVideos youtubeVideos -_id");
      if (!findData)
        return res.json({
          success: {
            data: {
              artistVideos: [],
              youtubeVideos: [],
            },
          },
        });
      return res.json({ success: { data: findData } });
    } catch (error) {
      next(error);
    }
  }
  public async getArtistPhoto(req: Request, res: Response, next: NextFunction) {
    try {
      const { artistId } = req.params;
      if (!artistId)
        throw new BadRequest(artistMediaMessage.error.artistIdRequired);
      const findData = await ArtistMediaSchema.findOne({
        artist: artistId,
      }).select("artistPhotos -_id");
      if (!findData?.artistPhotos) return res.json({ success: { data: [] } });
      return res.json({
        success: { data: findData.artistPhotos },
      });
    } catch (error) {
      next(error);
    }
  }
  //
  public async videoDelete(req: Request, res: Response, next: NextFunction) {
    try {
      const { artistId, videoIds } = req.body;
      if (!artistId || !videoIds?.length)
        throw new BadRequest(artistMediaMessage.error.allField);
      const findVideos = await ArtistMediaSchema.findOne({
        artist: artistId,
      }).select("artistVideos");
      const getVideoItems: any =
        findVideos?.artistVideos?.filter((element: any) =>
          videoIds.find((id: any) => id === element._id.toString())
        ) || [];

      const awsS3 = new AwsS3Services();
      for (let a of getVideoItems) {
        const deleteVideo = await awsS3.delete(a.videoFile, "artistMedia");
      }
      const update = await ArtistMediaSchema.updateOne(
        { artist: artistId },
        {
          $pull: {
            artistVideos: {
              _id: {
                $in: videoIds,
              },
            },
            youtubeVideos: {
              _id: {
                $in: videoIds,
              },
            },
          },
        }
      );
      if (update.matchedCount !== 1)
        throw new NotFound(artistMediaMessage.error.notDataFound);

      return res.json({
        success: { message: artistMediaMessage.success.videoDeleted },
      });
    } catch (error: any) {
      if (error.path === "_id")
        return res.status(400).json({
          error: {
            message: artistMediaMessage.error.videoNotFound,
          },
        });
      next(error);
    }
  }
  public async photoDelete(req: Request, res: Response, next: NextFunction) {
    try {
      const { imageDataIds, artistId } = req.body;
      if (!artistId || !Array.isArray(imageDataIds))
        throw new BadRequest(artistMediaMessage.error.allField);
      const findPhotos = await ArtistMediaSchema.findOne({
        artist: artistId,
      }).select("artistPhotos");
      const getPhotoItems: any = findPhotos?.artistPhotos?.filter(
        (element: any) =>
          imageDataIds.find((id: any) => id === element._id.toString())
      );
      if (!getPhotoItems?.length)
        throw new NotFound(artistMediaMessage.error.noDataFoundForDelete);
      const awsS3 = new AwsS3Services();
      for (let a of getPhotoItems) {
        const deletePhoto = await awsS3.delete(a.imageFile, "artistMedia");
      }
      const update = await ArtistMediaSchema.updateOne(
        { artist: artistId },
        {
          $pull: {
            artistPhotos: {
              _id: {
                $in: imageDataIds,
              },
            },
          },
        }
      );
      if (update.matchedCount !== 1)
        throw new NotFound(artistMediaMessage.error.notDataFound);
      return res.json({
        success: { message: artistMediaMessage.success.photoDeleted },
      });
    } catch (error) {
      next(error);
    }
  }
}
export default ArtistMediaController;
