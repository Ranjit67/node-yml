import { Request, Response, NextFunction } from "express";
import rateLimit from "express-rate-limit";

class RateLimitMiddleware {
  public forgerPassword(req: any, res: Response, next: NextFunction) {
    return rateLimit({
      windowMs: 4 * 60 * 1000, // 4 minutes
      max: 1, // Limit each IP to 1 requests per `window` (here, per 15 minutes)
      standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
      legacyHeaders: false, // Disable the `X-RateLimit-*` headers
      // message: "too many request",
      // handler: (request, response, nexte, options) =>if(options.message) throw next(options.message),
      // response.status(options.statusCode).send(options.message),
    });
  }
  public register(req: any, res: Response, next: NextFunction) {}
  public login(req: any, res: Response, next: NextFunction) {}
}

export default RateLimitMiddleware;
