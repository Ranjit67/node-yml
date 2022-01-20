import { Request, Response, NextFunction } from "express";
import { BadRequest, NotAcceptable } from "http-errors";
import { artistMediaMessage } from "../resultMessage";
import { AwsS3Services } from "../services";
import { ArtistMediaSchema } from "../models";

class ArtistMediaController {
  public async create(req: any, res: Response, next: NextFunction) {
    try {
      const { artistId, links } = req.body;

      const linksUrl = links ? JSON.parse(links) : [];

      const videoObject = req.files;
      const timestamp = new Date();

      const linkArray = linksUrl.length
        ? linksUrl.map((element: string) => ({
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
            timeStamp: timestamp,
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
}
export default ArtistMediaController;
