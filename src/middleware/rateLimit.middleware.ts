import { Request, Response, NextFunction } from "express";
import rateLimit from "express-rate-limit";

class RateLimitMiddleware {
  public forgerPassword(req: any, res: Response, next: NextFunction) {
    try {
      const apiLimiter = rateLimit({
        windowMs: 4 * 60 * 1000, // 4 minutes
        max: 1, // Limit each IP to 1 requests per `window` (here, per 15 minutes)
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
      });
      console.log(apiLimiter);
    } catch (error) {
      return next(error);
    }
  }
  public register(req: any, res: Response, next: NextFunction) {}
  public login(req: any, res: Response, next: NextFunction) {}
}

export default RateLimitMiddleware;
