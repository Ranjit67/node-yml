import { Request, Response, NextFunction } from "express";
import { BadRequest, NotAcceptable } from "http-errors";
// import { walletMessage } from "../resultMessage";
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
        userRef: userId,
      }).select("-__v");
      if (!findWalletHistory) return res.json({ data: [] });
      return res.json({ data: findWalletHistory.transactionHistory });
    } catch (error) {
      next(error);
    }
  }
}

export default WalletHistory;
