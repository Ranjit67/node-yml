import { Request, Response, NextFunction } from "express";
class RequestController {
  public async requestList(req: Request, res: Response, next: NextFunction) {
    try {
      // const findAllRequest=await RequestSchema.find({});
      // res.json({data:findAllRequest});
    } catch (error) {
      next(error);
    }
  }
}
export default RequestController;