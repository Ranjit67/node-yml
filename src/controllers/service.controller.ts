import { Request, Response, NextFunction } from "express";
import { BadRequest, InternalServerError } from "http-errors";
import { ServiceSchema } from "../models";

class ServiceController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { serviceName } = req.body;
      if (!serviceName) throw new BadRequest("Service name is required.");
      const saveService = await ServiceSchema.create({ serviceName });
      if (!saveService)
        throw new InternalServerError("Service is not created.");
      res.json({ data: "Service is created successfully." });
    } catch (error) {
      next(error);
    }
  }
  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const findAllService = await ServiceSchema.find({});
      res.json({ data: findAllService });
    } catch (error) {
      next(error);
    }
  }
  public async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const findOneService = await ServiceSchema.findById(id);
      res.json({ data: findOneService });
    } catch (error) {
      next(error);
    }
  }
  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { serviceId, serviceName } = req.body;
      const findOneAndUpdateService = await ServiceSchema.findByIdAndUpdate(
        serviceId,
        { serviceName }
      );
      if (!findOneAndUpdateService)
        throw new InternalServerError("Service is not updated.");
      res.json({ data: "Service is updated successfully." });
    } catch (error) {
      next(error);
    }
  }
  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { ids } = req.body;
      if (!ids.length) throw new BadRequest("Service is not found.");
      // const findOneAndDeleteService=await ServiceSchema.findByIdAndDelete(ids)
      // if(!findOneAndDeleteService) throw new InternalServerError("Service is not deleted.")
      // res.json({data:"Service is deleted successfully."})
      res.json({
        data: "Your logic is same but Event logic will be write when user schema ready.",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default ServiceController;
