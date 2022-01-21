import { Request, Response, NextFunction } from "express";
import { BadRequest, NotAcceptable, NotFound } from "http-errors";
import { artistMediaMessage } from "../resultMessage";
import { AwsS3Services } from "../services";
import { ArtistMediaSchema } from "../models";

class ArtistMediaController {
  public async videoCreate(req: any, res: Response, next: NextFunction) {
    try {
      const { artistId, links } = req.body;
      if (!artistId)
        throw new BadRequest(artistMediaMessage.error.artistIdRequired);

      const videoObject = req.files;
      const timestamp = new Date();

      const linkArray = links.length
        ? links.map((element: string) => ({
            youtubeUrl: element,
            timestamp,
          }))
        : [];
      if (videoObject) {
        // here may links and local video have
        let videoArray = [];

        const awsS3 = new AwsS3Services();
        for (let a of videoObject.video) {
          const videoUrl = await awsS3.upload(a);
          videoArray.push({
            videoUrl: videoUrl?.Location,
            videoFile: videoUrl?.key,
            timestamp: timestamp,
          });
        }
        const firstUpdate = await ArtistMediaSchema.updateOne(
          { artistRef: artistId },
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
            data: artistMediaMessage.success.artistMediaUpdated,
          });
        const saveData = await ArtistMediaSchema.create({
          artistRef: artistId,
          artistVideos: videoArray,
          youtubeVideos: linkArray,
        });
        if (!saveData)
          throw new NotAcceptable(artistMediaMessage.error.notCreated);
        res.json({ data: artistMediaMessage.success.artistMediaUpdated });
      } else {
        const firstUpdate = await ArtistMediaSchema.updateOne(
          { artistRef: artistId },
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
            data: artistMediaMessage.success.artistMediaUpdated,
          });

        const saveData = await ArtistMediaSchema.create({
          artistRef: artistId,
          youtubeVideos: linkArray,
        });
        if (!saveData)
          throw new NotAcceptable(artistMediaMessage.error.notCreated);
        return res.json({
          data: artistMediaMessage.success.artistMediaUpdated,
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
      const images = req.files.images;
      if (!artistId || !images.length)
        throw new BadRequest(artistMediaMessage.error.allField);
      const awsS3 = new AwsS3Services();
      const imageArray = [];
      const timestamp = new Date();
      for (let a of images) {
        const imageUrl = await awsS3.upload(a);
        imageArray.push({
          imageUrl: imageUrl?.Location,
          imageFile: imageUrl?.key,
          timestamp: timestamp,
        });
      }
      const firstUpdate = await ArtistMediaSchema.updateOne(
        { artistRef: artistId },
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
          data: artistMediaMessage.success.artistPhotoUpdated,
        });
      const saveData = await ArtistMediaSchema.create({
        artistRef: artistId,
        artistPhotos: imageArray,
      });
      if (!saveData)
        throw new NotAcceptable(artistMediaMessage.error.photoNotCreated);
      return res.json({
        data: artistMediaMessage.success.artistPhotoUpdated,
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
        artistRef: artistId,
      }).select("artistVideos youtubeVideos");
      if (!findData) throw new NotFound(artistMediaMessage.error.notDataFound);
      return res.json({ data: findData });
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
        artistRef: artistId,
      }).select("artistPhotos");
      if (!findData) throw new NotFound(artistMediaMessage.error.notDataFound);
      return res.json({ data: findData });
    } catch (error) {
      next(error);
    }
  }
  //
  public async videoDelete(req: Request, res: Response, next: NextFunction) {
    try {
      const { artistId, videoIds } = req.body;
      if (!artistId || !videoIds.length)
        throw new BadRequest(artistMediaMessage.error.allField);
      const findVideos = await ArtistMediaSchema.findOne({
        artistRef: artistId,
      }).select("artistVideos");
      const getVideoItems: any = findVideos?.artistVideos?.filter(
        (element: any) =>
          videoIds.find((id: any) => id === element._id.toString())
      );
      const awsS3 = new AwsS3Services();
      for (let a of getVideoItems) {
        const deleteVideo = await awsS3.delete(a.videoFile);
      }
      const update = await ArtistMediaSchema.updateOne(
        { artistRef: artistId },
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

      return res.json({ data: artistMediaMessage.success.videoDeleted });
    } catch (error) {
      next(error);
    }
  }
  public async photoDelete(req: Request, res: Response, next: NextFunction) {
    try {
      const { imageDataIds, artistId } = req.body;
      if (!artistId || !imageDataIds.length)
        throw new BadRequest(artistMediaMessage.error.allField);
      const findPhotos = await ArtistMediaSchema.findOne({
        artistRef: artistId,
      }).select("artistPhotos");
      const getPhotoItems: any = findPhotos?.artistPhotos?.filter(
        (element: any) =>
          imageDataIds.find((id: any) => id === element._id.toString())
      );
      const awsS3 = new AwsS3Services();
      for (let a of getPhotoItems) {
        const deletePhoto = await awsS3.delete(a.imageFile);
      }
      const update = await ArtistMediaSchema.updateOne(
        { artistRef: artistId },
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
      return res.json({ data: artistMediaMessage.success.photoDeleted });
    } catch (error) {
      next(error);
    }
  }
}
export default ArtistMediaController;
