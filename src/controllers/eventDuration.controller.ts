import { Request, Response, NextFunction } from "express";
import { BadRequest, InternalServerError, NotAcceptable } from "http-errors";
import { EventDurationSchema } from "../models";
import { eventDurationMessage } from "../resultMessage";

class EventDurationController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { eventDuration } = req.body;
      if (!eventDuration)
        throw new BadRequest(eventDurationMessage.error.allField);
      const createEventDuration = await EventDurationSchema.create({
        eventDuration,
        timestamp: new Date(),
      });
      if (!createEventDuration)
        throw new NotAcceptable(eventDurationMessage.error.notCreated);
      return res.json({
        success: {
          message: eventDurationMessage.success.created,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const eventDuration = await EventDurationSchema.find().select("-__v");
      if (!eventDuration) return res.json({ success: { data: [] } });
      res.json({
        success: {
          data: eventDuration,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { eventDurationId, eventDuration } = req.body;
      if (!eventDurationId) throw new BadRequest("All fields are required.");
      const updateEventDuration = await EventDurationSchema.findByIdAndUpdate(
        eventDurationId,
        {
          eventDuration,
        }
      );
      if (!updateEventDuration)
        throw new NotAcceptable(eventDurationMessage.error.notUpdated);
      res.json({
        success: {
          message: eventDurationMessage.success.updated,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { eventDurationIds } = req.body;
      if (!Array.isArray(eventDurationIds))
        throw new BadRequest(eventDurationMessage.error.allField);
      const deleteManyData = await EventDurationSchema.deleteMany({
        _id: { $in: eventDurationIds },
      });
      if (!deleteManyData.deletedCount)
        throw new NotAcceptable(eventDurationMessage.error.notDelete);
      res.json({
        success: {
          message: eventDurationMessage.success.delete,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default EventDurationController;
