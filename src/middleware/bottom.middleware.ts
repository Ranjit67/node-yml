import { NextFunction, Request, Response, Router } from "express";
import { NotFound } from "http-errors";

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
    res.json({
      error: {
        message: err.message,
      },
    });
  }
}
export default BottomMiddleware;
