import { Request, Response, NextFunction } from "express";
import { UserSchema, PricingSchema } from "../models";
class FilterController {
  public async getFilterData(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        lat,
        lng,
        range,
        categoriesIds,
        eventsIds,
        servicesIds,
        languagesIds,
        countriesNames,
        price, // it is a object (min, max)
        ratings,
      } = req.body;
      const { limit, skip } = req.params;
      const deg2rad = (deg: any): any => {
        return deg * (Math.PI / 180);
      };
      const getDistanceFromLatLonInKm = (
        currentLan: number,
        currentLng: number,
        haveLan: number,
        haveLng: number
      ): any => {
        var R = 6371; // Radius of the earth in km
        var dLat: any = deg2rad(haveLan - currentLan); // deg2rad below
        var dLon: any = deg2rad(haveLng - currentLng);
        var a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(deg2rad(currentLan)) *
            Math.cos(deg2rad(haveLan)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d;
      };

      const categoryFilters = await UserSchema.find({
        role: "artist",
        status: "active",
        category: categoriesIds?.length
          ? { $in: categoriesIds }
          : { $exists: true },
        events: eventsIds?.length ? { $in: eventsIds } : { $exists: true },
        services: servicesIds?.length
          ? {
              $in: servicesIds,
            }
          : { $exists: true },
        languages: languagesIds?.length
          ? {
              $in: languagesIds,
            }
          : { $exists: true },
        "location.country": countriesNames?.length
          ? {
              $in: countriesNames,
            }
          : {
              $exists: true,
            },
      });
      const distanceFilter: any[] =
        lat && lng && range
          ? categoryFilters
              .map((item: any) => {
                return {
                  ...item?._doc,
                  distance: getDistanceFromLatLonInKm(
                    lat,
                    lng,
                    item?._doc?.location.lat,
                    item?._doc?.location.lng
                  ),
                };
              })
              .filter((item) => item.distance < range)
          : categoryFilters;
      // price logic start
      const getIds = price ? distanceFilter.map((idGet) => idGet._id) : [];
      const findPriceMinMax = getIds?.length
        ? await PricingSchema.find({
            artist: { $in: getIds },
            $and: [
              { "prices.pricePerHour": { $gte: +price.min } },
              { "prices.pricePerHour": { $lte: +price.max } },
            ],
          })
        : distanceFilter;

      const priceFinalResult =
        findPriceMinMax?.length === distanceFilter?.length
          ? findPriceMinMax
          : distanceFilter.filter((outer) =>
              findPriceMinMax.find(
                (inner) => inner?.artist.toString() === outer._id.toString()
              )
            );

      // price logic end

      // rating start
      const ratingData = ratings?.length
        ? priceFinalResult?.filter(
            (outer) => ratings.indexOf(outer?.ratings) === 1
          )
        : priceFinalResult;

      // rating end
      const limitRange =
        limit && skip ? ratingData.slice(+skip, +limit) : ratingData;
      // pricing

      res.json({
        success: {
          data: limitRange,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  public async getFilterData2(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        lat,
        lng,
        range,
        categoriesIds,
        eventsIds,
        servicesIds,
        languagesIds,
        countriesNames,
        price, // it is a object (min, max)
        ratings,
      } = req.body;
      const { limit, skip } = req.params;
      const deg2rad = (deg: any): any => {
        return deg * (Math.PI / 180);
      };
      const getDistanceFromLatLonInKm = (
        currentLan: number,
        currentLng: number,
        haveLan: number,
        haveLng: number
      ): any => {
        var R = 6371; // Radius of the earth in km
        var dLat: any = deg2rad(haveLan - currentLan); // deg2rad below
        var dLon: any = deg2rad(haveLng - currentLng);
        var a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(deg2rad(currentLan)) *
            Math.cos(deg2rad(haveLan)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d;
      };
      const userData = await UserSchema.aggregate([
        { $match: { status: "active", role: "artist" } },
      ]);

      // rating end
      const limitRange: any[] = userData;
      // pricing

      res.json({
        success: {
          data: limitRange,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default FilterController;
