import { Request, Response, NextFunction } from "express";
import { PromoCodeSchema } from "../models";
import { NotAcceptable, NotFound, BadRequest } from "http-errors";
import { promoCodeMessage } from "../resultMessage";

class PromoCodeController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        numberOfTimeUsed,
        secretString,
        percentage,
        maxCashBack,
        startingDate,
        endingDate,
      } = req.body;
      const promoCodeSave = await PromoCodeSchema.create({
        numberOfTimeUsed: numberOfTimeUsed || "",
        secretString,
        percentage: percentage,
        maxCashBack: maxCashBack || "",
        startingDate,
        endingDate,
        timestamp: new Date(),
      });
      if (!promoCodeSave)
        throw new NotAcceptable(promoCodeMessage.error.notCreated);
      res.json({ data: promoCodeMessage.success.created });
    } catch (error) {
      next(error);
    }
  }
  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const promoCode = await PromoCodeSchema.find()
        .populate("appliedUser.userRef")
        .select("-password");
      res.json({ data: promoCode });
    } catch (error) {
      next(error);
    }
  }
  public async getThroughSecretString(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { secretString } = req.params;
      const promoCode = await PromoCodeSchema.findOne({
        secretString,
      })
        .populate("appliedUser.userRef")
        .select("-password");
      if (!promoCode) throw new NotFound(promoCodeMessage.error.notFound);
      res.json({ data: promoCode });
    } catch (error) {
      next(error);
    }
  }
  public async promoCodeApply(req: Request, res: Response, next: NextFunction) {
    try {
      const { secretString, userID, amount } = req.body;
      const updatePromoCodeFirstTime = await PromoCodeSchema.updateOne(
        {
          secretString,
          "appliedUser.userRef": userID,
        },
        {
          $push: {
            "appliedUser.$.numberOfTimeUsed": {
              benefitAmount: amount,
            },
          },
        }
      );
      if (updatePromoCodeFirstTime.matchedCount)
        return res.json({ data: promoCodeMessage.success.applySuccess });

      const updatePromoCode = await PromoCodeSchema.updateOne(
        { secretString },
        {
          $push: {
            appliedUser: {
              userRef: userID,

              numberOfTimeUsed: [
                {
                  benefitAmount: amount,
                },
              ],
            },
          },
        }
      );
      if (!updatePromoCode.modifiedCount)
        throw new NotAcceptable(promoCodeMessage.error.notApply);
      res.json({ data: promoCodeMessage.success.applySuccess });
    } catch (error) {
      next(error);
    }
  }
  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        numberOfTimeUsed,
        secretString,
        percentage,
        maxCashBack,
        startingDate,
        endingDate,
        promoCodeId,
      } = req.body;
      if (!promoCodeId)
        throw new BadRequest(promoCodeMessage.error.updateError1);
      const findPromoCode: any = await PromoCodeSchema.findOne({
        secretString,
      });
      const updatePromoCode = await PromoCodeSchema.findByIdAndUpdate(
        promoCodeId,
        {
          numberOfTimeUsed: numberOfTimeUsed || findPromoCode.numberOfTimeUsed,
          secretString: secretString || findPromoCode.secretString,
          percentage: percentage || findPromoCode.percentage,
          maxCashBack: maxCashBack || findPromoCode.maxCashBack,
          startingDate: startingDate || findPromoCode.startingDate,
          endingDate: endingDate || findPromoCode.endingDate,
        }
      );
      if (!updatePromoCode)
        throw new NotAcceptable(promoCodeMessage.error.updateError2);
      res.json({ data: promoCodeMessage.success.updateSuccess });
    } catch (error) {
      next(error);
    }
  }
  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { promoCodeIds } = req.body;
      if (!promoCodeIds)
        throw new BadRequest(promoCodeMessage.error.updateError1);
      const deletePromoCodes = await PromoCodeSchema.deleteMany({
        _id: { $in: promoCodeIds },
      });
      if (!deletePromoCodes)
        throw new NotFound(promoCodeMessage.error.notFound);
      res.json({ data: promoCodeMessage.success.deleteSuccess });
    } catch (error) {
      next(error);
    }
  }
}
export default PromoCodeController;
