import { Request, Response, NextFunction } from "express";
import { BadRequest, InternalServerError, NotAcceptable } from "http-errors";
import { EventSchema } from "../models";
import { AwsS3Services } from "../services";
import { eventMessage } from "../resultMessage";

class EventController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { eventName } = req.body;
      const iconPicture = req?.files?.icon;
      const imagePicture = req?.files?.image;
      if (!eventName || !iconPicture || !imagePicture)
        throw new BadRequest(eventMessage.error.allFieldsRequired);
      const awsS3 = new AwsS3Services();
      const iconImage = await awsS3.upload(iconPicture);
      if (!iconImage)
        throw new NotAcceptable(eventMessage.error.iconImageUploadFail);
      const imageImage = await awsS3.upload(imagePicture);
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
      if (!saveEvent) throw new InternalServerError("Event is not created.");
      res.json({ data: "Event is created successfully." });
    } catch (error) {
      next(error);
    }
  }
  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const findAllEvent = await EventSchema.find({});
      res.json({ data: findAllEvent });
    } catch (error) {
      next(error);
    }
  }
  public async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const findOneEvent = await EventSchema.findById(id);
      res.json({ data: findOneEvent });
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
          ? await awsS3.delete(findOneEvent?.iconFile)
          : "";
        iconImage = await awsS3.upload(iconPicture);
        if (!iconImage)
          throw new NotAcceptable(eventMessage.error.iconImageUploadFail);
      }
      if (imagePicture) {
        const awsS3 = new AwsS3Services();
        const deleteOlder = findOneEvent?.imageFile
          ? await awsS3.delete(findOneEvent?.imageFile)
          : "";
        imageImage = await awsS3.upload(imagePicture);
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
        throw new InternalServerError("Event is not updated.");
      res.json({ data: "Event is updated successfully." });
    } catch (error) {
      next(error);
    }
  }
  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { ids } = req.params;
      //   const findEvent = await EventSchema.findById(id);
      if (!ids.length) throw new BadRequest("Event is not found.");
      //   const findOneAndDeleteEvent = await EventSchema.findByIdAndDelete(id);
      //   if (!findOneAndDeleteEvent)
      //     throw new InternalServerError("Event is not deleted.");
      //   res.json({ data: "Event is deleted successfully." });
      //   res.json({ data: "Event is deleted successfully." });
      res.json({
        data: "Your logic is same but Event logic will be write when user schema ready.",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default EventController;
