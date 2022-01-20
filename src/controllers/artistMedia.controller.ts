import { Request, Response, NextFunction } from "express";
import { BadRequest, GatewayTimeout } from "http-errors";
import { artistMediaMessage } from "../resultMessage";
import { AwsS3Services } from "../services";

class ArtistMediaController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { artistId } = req.body;
      res.json({ data: "Past Event created successfully." });
    } catch (error) {
      next(error);
    }
  }
}
export default ArtistMediaController;
