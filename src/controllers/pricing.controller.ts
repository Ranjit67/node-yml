import { Request, Response, NextFunction } from "express";
import { PricingSchema } from "../models";
import { BadRequest, NotAcceptable } from "http-errors";
import { pricingMessage } from "../resultMessage";

class PricingController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        artistId,
        numberOfDays,
        pricePerHour,
        maxCrowdSize,
        minCrowdSize,
        location,
      } = req.body;
      if (!artistId) throw new BadRequest(pricingMessage.error.allField);
      const updateFirst = await PricingSchema.updateOne(
        { artistRef: artistId },
        {
          $push: {
            prices: {
              numberOfDays,
              pricePerHour,
              maxCrowdSize,
              minCrowdSize,
              location,
            },
          },
        }
      );
      if (updateFirst.matchedCount)
        return res.json({ data: pricingMessage.success.newPricingAdded });
      const artistPricing = new PricingSchema({
        artistRef: artistId,
      });
      artistPricing.prices.push({
        numberOfDays,
        pricePerHour,
        maxCrowdSize,
        minCrowdSize,
        location,
        timestamp: new Date(),
      });
      const artistPriceSave = artistPricing.save();
      if (!artistPriceSave)
        throw new NotAcceptable(pricingMessage.error.notSave);
      res.json({ data: pricingMessage.success.create });
    } catch (error) {
      next(error);
    }
  }
  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { artistId } = req.params;
      const findPricing: any = await PricingSchema.findOne({
        artistRef: artistId,
      });
      if (!findPricing) return res.json({ data: [] });
      return res.json({ data: findPricing.prices });
    } catch (error) {
      next(error);
    }
  }
  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        artistId,
        pricingId,
        numberOfDays,
        pricePerHour,
        maxCrowdSize,
        minCrowdSize,
        location,
      } = req.body;
      const findPricing: any = await PricingSchema.findOne({
        artistRef: artistId,
      });
      const dataUpdate = findPricing.prices.find(
        (item: any) => item._id.toString() === pricingId.toString()
      );
      if (!dataUpdate)
        throw new BadRequest(pricingMessage.error.notFoundPricingId);
      const updatePricing = await PricingSchema.updateOne(
        {
          artistRef: artistId,
          "prices._id": pricingId,
        },
        {
          "prices.$.numberOfDays": numberOfDays ?? dataUpdate.numberOfDays,
          "prices.$.pricePerHour": pricePerHour ?? dataUpdate.pricePerHour,
          "prices.$.maxCrowdSize": maxCrowdSize ?? dataUpdate.maxCrowdSize,
          "prices.$.minCrowdSize": minCrowdSize ?? dataUpdate.minCrowdSize,
          "prices.$.location": location ?? dataUpdate.location,
        }
      );
      if (updatePricing.modifiedCount)
        return res.json({ data: pricingMessage.success.update });

      res.json({ data: pricingMessage.success.noChanges });
    } catch (error) {
      next(error);
    }
  }
  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { artistId, pricingIds } = req.body;
      // pricingIds - it is array
      if (!artistId || !pricingIds.length)
        throw new BadRequest(pricingMessage.error.allField);
      const removeOnePricing = await PricingSchema.findOneAndUpdate(
        { artistRef: artistId },
        { $pull: { prices: { _id: { $in: pricingIds } } } }
      );
      if (!removeOnePricing)
        throw new NotAcceptable(pricingMessage.error.notRemove);
      res.json({ data: pricingMessage.success.deletePrices });
    } catch (error) {
      next(error);
    }
  }
}
export default PricingController;
