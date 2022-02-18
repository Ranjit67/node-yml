import { Request, Response, NextFunction } from "express";
import { UserSchema } from "../models";
class FilterController {
  public async getFilterData(req: Request, res: Response, next: NextFunction) {
    try {
      const { lat, lng, range, categoriesIds, eventsIds } = req.body;
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

      const getLocationAll = await UserSchema.find({
        role: "artist",
        status: "active",
      });
      const distanceFilter: any[] =
        lat && lng && range
          ? getLocationAll
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
          : getLocationAll;
      // const categoryFilters =

      const data = distanceFilter.slice(+skip, +limit);

      res.json({
        success: {
          data,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default FilterController;
