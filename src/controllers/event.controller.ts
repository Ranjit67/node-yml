import { Request, Response, NextFunction } from "express";
import { BadRequest, InternalServerError, NotAcceptable } from "http-errors";
import { EventSchema } from "../models";
import { AwsS3Services } from "../services";
import { eventMessage } from "../resultMessage";

class EventController {
  private dir = "event";
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { eventName } = req.body;
      const iconPicture = req?.files?.icon;
      const imagePicture = req?.files?.image;
      if (!eventName || !iconPicture || !imagePicture)
        throw new BadRequest(eventMessage.error.allFieldsRequired);
      const awsS3 = new AwsS3Services();
      const iconImage = await awsS3.upload(iconPicture, "event");
      if (!iconImage)
        throw new NotAcceptable(eventMessage.error.iconImageUploadFail);
      const imageImage = await awsS3.upload(imagePicture, "event");
      if (!imageImage)
        throw new NotAcceptable(eventMessage.error.imageImageUploadFail);
      //

      const saveEvent = await EventSchema.create({
        eventName,
        iconUrl: iconImage.Location,
        iconFile: iconImage.Key,
        imageUrl: imageImage.Location,
        imageFile: imageImage.Key,
        timestamp: new Date(),
      });
      if (!saveEvent)
        throw new InternalServerError(eventMessage.error.notCreated);
      res.json({
        success: {
          message: eventMessage.success.created,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const findAllEvent = await EventSchema.find({});
      res.json({
        success: {
          data: findAllEvent,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  public async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const findOneEvent = await EventSchema.findById(id);
      res.json({
        success: {
          data: findOneEvent,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { eventId, eventName } = req.body;
      const iconPicture = req?.files?.icon;
      const imagePicture = req?.files?.image;
      let iconImage: any;
      let imageImage: any;
      const findOneEvent: any = await EventSchema.findById(eventId);
      if (iconPicture) {
        const awsS3 = new AwsS3Services();
        const deleteOlder = findOneEvent?.iconFile
          ? await awsS3.delete(findOneEvent?.iconFile, "event")
          : "";
        iconImage = await awsS3.upload(iconPicture, "event");
        if (!iconImage)
          throw new NotAcceptable(eventMessage.error.iconImageUploadFail);
      }
      if (imagePicture) {
        const awsS3 = new AwsS3Services();
        const deleteOlder = findOneEvent?.imageFile
          ? await awsS3.delete(findOneEvent?.imageFile, "event")
          : "";
        imageImage = await awsS3.upload(imagePicture, "event");
        if (!imageImage)
          throw new NotAcceptable(eventMessage.error.iconImageUploadFail);
      }
      const findOneAndUpdateEvent = await EventSchema.findByIdAndUpdate(
        eventId,
        {
          eventName: eventName ?? findOneEvent.eventName,
          iconUrl: iconImage?.Location ?? findOneEvent.iconUrl,
          iconFile: iconImage?.Key ?? findOneEvent.iconFile,
          imageUrl: imageImage?.Location ?? findOneEvent.imageUrl,
          imageFile: imageImage?.Key ?? findOneEvent.imageFile,
        }
      );
      if (!findOneAndUpdateEvent)
        throw new InternalServerError(eventMessage.error.notUpdated);
      res.json({
        success: {
          message: eventMessage.success.updated,
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
        throw new BadRequest(eventMessage.error.allFieldsRequired);
      const findEvent = await EventSchema.find({ _id: { $in: ids } });
      if (!findEvent?.length) throw new BadRequest(eventMessage.error.notFound);
      const awsS3 = new AwsS3Services();
      for (let item of findEvent) {
        const deleteOlder = item?.iconFile
          ? await awsS3.delete(item.iconFile, "event")
          : "";
        const deleteOlder2 = item?.imageFile
          ? await awsS3.delete(item.imageFile, "event")
          : "";
      }
      const deleteEvent = await EventSchema.deleteMany({ _id: { $in: ids } });
      if (!deleteEvent)
        throw new InternalServerError(eventMessage.error.notDeleted);
      res.json({
        success: {
          message: eventMessage.success.deleted,
        },
      });
    } catch (error: any) {
      if (error.path === "_id") {
        error.message = eventMessage.error.notFound;
      }

      next(error);
    }
  }
}

export default EventController;
