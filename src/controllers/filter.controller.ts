import { Request, Response, NextFunction } from "express";
import { UserSchema } from "../models";
class FilterController {
  public async getFilterData(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

export default FilterController;
