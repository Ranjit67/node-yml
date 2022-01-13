import { NextFunction, Request, Response } from "express";
import { NotFound } from "http-errors";
import { AssignArtistErrorHandler } from "../errorHandler";

class BottomMiddleware {
  public routeNotFoundErrorHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    next(new NotFound());
  }
  public fromRouteErrorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    res.status(err.status || 500);

    if (err?.keyPattern?.["managerRef"] === 1)
      return new AssignArtistErrorHandler().allAlreadyAssign(res);
    res.json({
      error: {
        message: err.message,
      },
    });
  }
}

//
export default BottomMiddleware;
