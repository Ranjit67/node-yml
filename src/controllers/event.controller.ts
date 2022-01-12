import { Request, Response, NextFunction } from "express";
import { BadRequest, InternalServerError } from "http-errors";
import { EventSchema } from "../models";

class EventController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { eventName } = req.body;
      if (!eventName) throw new BadRequest("Event name is required.");
      const saveEvent = await EventSchema.create({ eventName });
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

      const findOneAndUpdateEvent = await EventSchema.findByIdAndUpdate(
        eventId,
        { eventName }
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
