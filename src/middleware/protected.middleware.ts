import { Request, Response, NextFunction } from "express";
import { Unauthorized } from "http-errors";
import jwt from "jsonwebtoken";
import { accessTokenString } from "../config";

class ProtectedMiddleware {
  public protected(req: any, res: Response, next: NextFunction) {
    if (!req.headers["authorization"]) return next(new Unauthorized());
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, accessTokenString, (err: any, payload: any): any => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return next(new Unauthorized());
        } else {
          return next(new Unauthorized("You need to logIn"));
        }
      }

      req.payload = payload;
      next();
    });
  }
}
export default ProtectedMiddleware;
