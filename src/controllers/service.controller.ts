import { Request, Response, NextFunction } from "express";
import { BadRequest, InternalServerError, NotAcceptable } from "http-errors";
import { ServiceSchema } from "../models";
import { AwsS3Services } from "../services";
import { serviceMessage } from "../resultMessage";

class ServiceController {
  private dir = "service";
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { serviceName } = req.body;
      const iconPicture = req?.files?.icon;
      const imagePicture = req?.files?.image;
      if (!serviceName || !iconPicture || !imagePicture)
        throw new BadRequest(serviceMessage.error.allFieldsRequired);
      const awsS3 = new AwsS3Services();
      const iconImage = await awsS3.upload(iconPicture, "service");
      if (!iconImage)
        throw new NotAcceptable(serviceMessage.error.iconImageUploadFail);

      const imageImage = await awsS3.upload(imagePicture, "service");
      if (!imageImage)
        throw new NotAcceptable(serviceMessage.error.imageImageUploadFail);

      const saveService = await ServiceSchema.create({
        serviceName,
        iconUrl: iconImage.Location,
        iconFile: iconImage.Key,
        imageUrl: imageImage.Location,
        imageFile: imageImage.Key,
        timestamp: new Date().toString(),
      });
      if (!saveService)
        throw new InternalServerError(serviceMessage.error.notCreated);
      res.json({
        success: {
          message: serviceMessage.success.created,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const findAllService = await ServiceSchema.find({});
      res.json({
        success: { data: findAllService },
      });
    } catch (error) {
      next(error);
    }
  }
  public async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const findOneService = await ServiceSchema.findById(id);
      res.json({ success: { data: findOneService } });
    } catch (error) {
      next(error);
    }
  }
  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { serviceId, serviceName } = req.body;
      const iconPicture = req?.files?.icon;
      const imagePicture = req?.files?.image;

      let iconImage: any;
      let imageImage: any;

      if (!serviceId)
        throw new BadRequest(serviceMessage.error.allFieldsRequired);
      const findOneService = await ServiceSchema.findById(serviceId);
      if (iconPicture) {
        const awsS3 = new AwsS3Services();
        const deleteOlder = findOneService?.iconFile
          ? await awsS3.delete(findOneService?.iconFile, "service")
          : "";
        iconImage = await awsS3.upload(iconPicture, "service");
        if (!iconImage)
          throw new NotAcceptable(serviceMessage.error.iconImageUploadFail);
      }
      if (imagePicture) {
        const awsS3 = new AwsS3Services();
        const deleteOlder = findOneService?.imageFile
          ? await awsS3.delete(findOneService?.imageFile, "service")
          : "";
        imageImage = await awsS3.upload(imagePicture, "service");
        if (!imageImage)
          throw new NotAcceptable(serviceMessage.error.iconImageUploadFail);
      }
      const findOneAndUpdateService = await ServiceSchema.findByIdAndUpdate(
        serviceId,
        {
          serviceName: serviceName ?? findOneService?.serviceName,
          iconUrl: iconImage?.Location ?? findOneService?.iconUrl,
          iconFile: iconImage?.Key ?? findOneService?.iconFile,
          imageUrl: imageImage?.Location ?? findOneService?.imageUrl,
          imageFile: imageImage?.Key ?? findOneService?.imageFile,
        }
      );
      if (!findOneAndUpdateService)
        throw new InternalServerError(serviceMessage.error.notUpdated);
      res.json({
        success: {
          message: serviceMessage.success.updated,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { ids } = req.body;
      if (!ids?.length)
        throw new BadRequest(serviceMessage.error.allFieldsRequired);
      const findAllService = await ServiceSchema.find({ _id: { $in: ids } });
      if (!findAllService?.length)
        throw new BadRequest(serviceMessage.error.noData);
      const awsS3 = new AwsS3Services();
      for (let data of findAllService) {
        const deleteOlder = data?.iconFile
          ? await awsS3.delete(data?.iconFile, "service")
          : "";
        const deleteOlder2 = data?.imageFile
          ? await awsS3.delete(data?.imageFile, "service")
          : "";
      }

      const deleteService = await ServiceSchema.deleteMany({
        _id: { $in: ids },
      });
      if (!deleteService)
        throw new InternalServerError(serviceMessage.error.notDelete);

      res.json({
        success: {
          message: serviceMessage.success.delete,
        },
      });
    } catch (error: any) {
      if (error.path === "_id") {
        error.message = serviceMessage.error.noData;
      }
      next(error);
    }
  }
}

export default ServiceController;
