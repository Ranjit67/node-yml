import { Request, Response, NextFunction } from "express";
import { BadRequest, NotAcceptable } from "http-errors";
import { walletMessage } from "../resultMessage";
import { WalletSchema, WalletHistorySchema } from "../models";

class WalletController {
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, balance, spent } = req.body;
      if (!userId) throw new BadRequest(walletMessage.error.allField);
      const walletSave = await WalletSchema.create({
        user: userId,
        balance: balance ?? 0,
        spent: spent ?? 0,
      });
      if (!walletSave) throw new NotAcceptable(walletMessage.error.notCreated);
      const walletHistory = new WalletHistorySchema({
        user: userId,
      });
      walletHistory.transactionHistory.push({
        type: "Credit",
        amount: balance ?? 0,
        title: "Add money",
        description: "Add money in wallet.",
        timestamp: new Date(),
      });
      const walletHistorySave = await walletHistory.save();
      if (!walletHistorySave)
        throw new NotAcceptable(walletMessage.error.notAddedHistory);

      res.json({
        success: {
          message: walletMessage.success.created,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  public async getWallet(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const findWallet = await WalletSchema.findOne({ user: userId }).select(
        "-__v"
      );
      if (!findWallet)
        return res.json({ success: { data: { balance: 0, spent: 0 } } });
      return res.json({ success: { data: findWallet } });
    } catch (error) {
      next(error);
    }
  }
}

export default WalletController;
