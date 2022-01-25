import { Request, Response, NextFunction } from "express";
import { BadRequest, NotFound } from "http-errors";
import { walletHistoryMessage } from "../resultMessage";
import { WalletHistorySchema } from "../models";

class WalletHistory {
  public async getWalletHistory(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userId } = req.params;
      const findWalletHistory = await WalletHistorySchema.findOne({
        user: userId,
      }).select("-__v");
      if (!findWalletHistory) return res.json({ data: [] });
      return res.json({
        success: { data: findWalletHistory.transactionHistory },
      });
    } catch (error) {
      next(error);
    }
  }
  public async transactionDetails(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userId, transactionHistoryId } = req.body;
      if (!userId || !transactionHistoryId)
        throw new BadRequest(walletHistoryMessage.error.allField);
      const findWalletHistory = await WalletHistorySchema.findOne({
        user: userId,
      }).select({
        transactionHistory: { $elemMatch: { _id: transactionHistoryId } },
      });
      if (!findWalletHistory)
        throw new NotFound(walletHistoryMessage.error.transactionNotFound);
      return res.json({
        success: { data: findWalletHistory.transactionHistory },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default WalletHistory;
