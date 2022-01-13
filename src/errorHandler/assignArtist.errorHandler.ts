import { Response } from "express";
class AssignArtistErrorHandler {
  public allAlreadyAssign(res: Response) {
    return res.status(409).json({
      error: { message: "Artist is already assigned to this Manager." },
    });
  }
}
export default AssignArtistErrorHandler;
