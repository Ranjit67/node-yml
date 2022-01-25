import { NextFunction, Request, Response } from "express";
import { NotFound } from "http-errors";
import {
  AssignArtistErrorHandler,
  ServiceErrorHandler,
  EventErrorHandler,
  UserErrorHandler,
} from "../errorHandler";

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

    if (err?.keyPattern?.["manager"] === 1)
      return new AssignArtistErrorHandler().allAlreadyAssign(res);
    if (err?.keyPattern?.["serviceName"] === 1)
      return new ServiceErrorHandler().allAlreadyExists(res);
    if (err?.keyPattern?.["eventName"] === 1)
      return new EventErrorHandler().alreadyExistsName(res);
    if (err?.keyPattern?.["email"] === 1)
      return new UserErrorHandler().emailAlreadyExists(res);
    if (err?.keyPattern?.["phoneNumber"] === 1)
      return new UserErrorHandler().phoneAlreadyExists(res);
    res.json({
      error: {
        message: err.message,
      },
    });
  }
}

//
export default BottomMiddleware;
