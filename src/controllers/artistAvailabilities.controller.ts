import { Request, Response, NextFunction } from "express";
import { BadRequest, NotAcceptable, NotFound } from "http-errors";

class ArtistAvailabilitiesController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      res.json({ data: "create" });
    } catch (error) {
      next(error);
    }
  }
}
export default ArtistAvailabilitiesController;
