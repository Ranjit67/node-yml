import { Request, Response, NextFunction } from "express";
import { PricingSchema, UserSchema } from "../models";
import { BadRequest, NotAcceptable } from "http-errors";
import { pricingMessage } from "../resultMessage";

class PriceUpdateUser {
  async updateMinPriceUser(artistId: string) {
    try {
      const findPriceArtist = await PricingSchema.findOne({
        artist: artistId,
      });

      findPriceArtist?.prices.sort((a, b) => a?.pricePerHour - b?.pricePerHour);
      const updateUserMinPrice = await UserSchema.findByIdAndUpdate(artistId, {
        minPrice: findPriceArtist?.prices?.[0].pricePerHour,
        maxPrice:
          findPriceArtist?.prices?.[findPriceArtist?.prices?.length - 1]
            .pricePerHour,
        pricing: findPriceArtist?._id,
      });
      if (!updateUserMinPrice)
        throw new NotAcceptable(pricingMessage.error.pricingNotUpdated);
    } catch (error) {
      throw error;
    }
  }
}

class PricingController extends PriceUpdateUser {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        artistId,
        numberOfDays,
        pricePerHour,
        maxCrowdSize,
        minCrowdSize,
        lat,
        lng,
        address,
        country,
        otherDay,
        otherCrowdSize,
        // otherLocation,
      } = req.body;
      if (
        !artistId ||
        !numberOfDays ||
        !pricePerHour ||
        !maxCrowdSize ||
        !minCrowdSize ||
        !lat ||
        !lng ||
        !address ||
        !country
      )
        throw new BadRequest(pricingMessage.error.allField);
      const checkData = await PricingSchema.findOne({
        artist: artistId,
        prices: {
          $elemMatch: {
            numberOfDays: +numberOfDays,
            pricePerHour: +pricePerHour,
            maxCrowdSize: +maxCrowdSize,
            minCrowdSize: +minCrowdSize,
            location: {
              lat: +lat,
              lng: +lng,
              address: address,
              country: country,
            },
          },
        },
      });
      if (checkData) throw new NotAcceptable(pricingMessage.error.samePaired);
      const updateFirst = await PricingSchema.updateOne(
        { artist: artistId },
        {
          $push: {
            prices: {
              numberOfDays: +numberOfDays,
              pricePerHour: +pricePerHour,
              maxCrowdSize: +maxCrowdSize,
              minCrowdSize: +minCrowdSize,
              location: {
                lat: +lat,
                lng: +lng,
                address: address,
                country: country,
              },
              timestamp: new Date(),
              // latLng,
              otherDay,
              otherCrowdSize,
              // otherLocation,
            },
          },
        }
      );
      if (updateFirst.matchedCount) {
        await super.updateMinPriceUser(artistId);
        return res.json({
          success: { message: pricingMessage.success.newPricingAdded },
        });
      }

      const artistPriceSave = await PricingSchema.create({
        artist: artistId,
        prices: [
          {
            numberOfDays: +numberOfDays,
            pricePerHour: +pricePerHour,
            maxCrowdSize: +maxCrowdSize,
            minCrowdSize: +minCrowdSize,
            location: {
              lat: +lat,
              lng: +lng,
              address: address,
              country: country,
            },
            timestamp: new Date(),
            // latLng,
            otherDay,
            otherCrowdSize,
            // otherLocation,
          },
        ],
      });

      if (!artistPriceSave)
        throw new NotAcceptable(pricingMessage.error.notSave);
      await super.updateMinPriceUser(artistId);

      res.json({ success: { message: pricingMessage.success.create } });
    } catch (error) {
      next(error);
    }
  }
  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { artistId } = req.params;
      const findPricing: any = await PricingSchema.findOne({
        artist: artistId,
      });
      if (!findPricing) return res.json({ success: { data: [] } });
      return res.json({ success: { data: findPricing.prices } });
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
        lat,
        lng,
        address,
        country,
        // location,
        // latLng,
        otherDay,
        otherCrowdSize,
        // otherLocation,
      } = req.body;
      const findPricing: any = await PricingSchema.findOne({
        artist: artistId,
      });
      const dataUpdate = findPricing.prices.find(
        (item: any) => item._id.toString() === pricingId.toString()
      );
      if (!dataUpdate)
        throw new BadRequest(pricingMessage.error.notFoundPricingId);
      const updatePricing = await PricingSchema.updateOne(
        {
          artist: artistId,
          "prices._id": pricingId,
        },
        {
          "prices.$.numberOfDays": numberOfDays ?? dataUpdate.numberOfDays,
          "prices.$.pricePerHour": pricePerHour ?? dataUpdate.pricePerHour,
          "prices.$.maxCrowdSize": maxCrowdSize ?? dataUpdate.maxCrowdSize,
          "prices.$.minCrowdSize": minCrowdSize ?? dataUpdate.minCrowdSize,

          "prices.$.location.lat": +lat ?? dataUpdate?.location?.lat,
          "prices.$.location.lan": +lng ?? dataUpdate?.location?.lng,
          "prices.$.location.address": address ?? dataUpdate?.location?.address,
          "prices.$.location.country": country ?? dataUpdate?.location?.country,

          "prices.$.otherDay": otherDay ?? dataUpdate.otherDay,
          "prices.$.otherCrowdSize":
            otherCrowdSize ?? dataUpdate.otherCrowdSize,
        }
      );
      if (updatePricing.modifiedCount)
        return res.json({
          success: { message: pricingMessage.success.update },
        });

      res.json({ success: { message: pricingMessage.success.noChanges } });
    } catch (error) {
      next(error);
    }
  }
  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { artistId, pricingIds } = req.body;
      // pricingIds - it is array

      if (!artistId || !pricingIds?.length)
        throw new BadRequest(pricingMessage.error.allField);
      const removeOnePricing = await PricingSchema.findOneAndUpdate(
        { artist: artistId },
        { $pull: { prices: { _id: { $in: pricingIds } } } }
      );
      if (!removeOnePricing)
        throw new NotAcceptable(pricingMessage.error.notRemove);
      res.json({ success: { message: pricingMessage.success.deletePrices } });
    } catch (error) {
      next(error);
    }
  }
  public async fake(req: Request, res: Response, next: NextFunction) {
    try {
      const { artistId } = req.body;
      const findAllPrice = await PricingSchema.find();
      const getAllArtistId = findAllPrice.map((item: any) => item.artist);
    } catch (error) {
      next(error);
    }
  }
}
export default PricingController;
