import { Response } from "express";
class FavoriteErrorHandler {
  public objectId(res: Response) {
    return res.status(200).json({
      success: {
        data: [],
      },
    });
  }
}
export default FavoriteErrorHandler;
